import { useEffect, useState, type FC } from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { updateEmail, updateProfile } from 'firebase/auth';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../../shared/hooks/configs/firebase-config';
import { validateEmail, validateLogin } from '../../shared/helpers/validateForm';
import { useFirebaseAuth } from '../../shared/hooks/useFirebaseAuth';

type ProfileForm = {
    login: string;
    email: string;
    avatarUrl: string;
};

type ProfileProps = {
    open: boolean;
    onClose: () => void;
    onProfileUpdated?: (profile: ProfileForm) => void;
    user?: {
        login: string;
        email: string;
        avatarUrl?: string;
    };
};

const createInitialProfile = (user?: ProfileProps['user']): ProfileForm => ({
    login: auth.currentUser?.displayName || user?.login || auth.currentUser?.email?.split('@')[0] || '',
    email: auth.currentUser?.email || user?.email || '',
    avatarUrl: auth.currentUser?.photoURL || user?.avatarUrl || '',
});

const dialogPaperSx = {
    background: 'linear-gradient(180deg, rgb(22, 27, 36) 0%, #0e1122 100%)',
    borderRadius: '18px',
    color: '#ebe9f0'

};

const titleSx = {
    color: '#f5f3ff',
    fontSize: 28,
    fontWeight: 800,
};

const avatarSx = {
    bgcolor: 'rgba(99, 121, 233, 0.62)',
    border: '2px solid rgba(196, 181, 253, 0.5)',
    color: '#fff',
    fontSize: 36,
    fontWeight: 800,
    height: 96,
    width: 96,
};

const helperTextSx = {
    color: '#ffb4b4',
};

const inputLabelSx = {
    color: '#85a6ff',
    '&.Mui-focused': {
        color: '#9eb4f1',
    },
};

const textFieldSx = {
    '& .MuiFilledInput-root': {
        bgcolor: 'transparent',
        border: '1px solid rgba(167, 139, 250, 0.2)',
        borderRadius: '12px',
        color: '#f5f3ff',
    },
};

const successAlertSx = {
    bgcolor: 'rgba(34, 197, 94, 0.12)',
    border: '1px solid rgba(74, 222, 128, 0.22)',
    color: '#bbf7d0',
};

const errorAlertSx = {
    bgcolor: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(248, 113, 113, 0.22)',
    color: '#fecaca',
};

const cancelButtonSx = {
    borderRadius: '10px',
    color: '#bab5fd',
    fontWeight: 500,
    minWidth: 100,
    textTransform: 'none',
};

const saveButtonSx = {
    bgcolor: '#6379e9d0',
    borderRadius: '10px',
    fontWeight: 500,
    minWidth: 132,
    textTransform: 'none',
    '&:hover': {
        bgcolor: '#4959aad0',
    },
    '&.Mui-disabled': {
        bgcolor: 'rgba(99, 121, 233, 0.35)',
        color: 'rgba(255, 255, 255, 0.55)',
    },
};

const providerButtonSx = {
    borderColor: 'rgba(167, 139, 250, 0.28)',
    borderRadius: '10px',
    color: '#f5f3ff',
    justifyContent: 'flex-start',
    textTransform: 'none',
    '&:hover': {
        borderColor: 'rgba(167, 139, 250, 0.48)',
        backgroundColor: 'rgba(99, 121, 233, 0.08)',
    },
    '&.Mui-disabled': {
        color: '#c7d2fe',
        borderColor: 'rgba(167, 139, 250, 0.28)',
        opacity: 1,
    },
};

const firebaseProfileErrorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'Этот email уже используется другим аккаунтом',
    'auth/invalid-email': 'Неверный формат email',
    'auth/requires-recent-login': 'Для смены email нужно заново войти в аккаунт',
    'auth/user-token-expired': 'Сессия истекла. Войдите в аккаунт заново',
    'auth/network-request-failed': 'Ошибка сети. Проверьте подключение',
};

const getFirebaseProfileErrorMessage = (err: unknown) => {
    const code = typeof err === 'object' && err !== null && 'code' in err
        ? String((err as { code?: string }).code)
        : '';

    return firebaseProfileErrorMessages[code] || 'Не удалось обновить профиль';
};

const validateAvatarUrl = (avatarUrl: string) => {
    const trimmedAvatarUrl = avatarUrl.trim();

    if (!trimmedAvatarUrl) {
        return '';
    }

    try {
        const url = new URL(trimmedAvatarUrl);

        if (!['http:', 'https:'].includes(url.protocol)) {
            return 'Ссылка должна начинаться с http:// или https://';
        }
    } catch {
        return 'Введите корректную ссылку на изображение';
    }

    return '';
};

const dialogBackdropSx = {
    backgroundColor: 'rgba(8, 11, 18, 0.62)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
};
const Profile: FC<ProfileProps> = ({ open, onClose, onProfileUpdated, user }) => {
    const {
        googleLoading,
        gitHubLoading,
        linkGoogleProvider,
        linkGitHubProvider,
    } = useFirebaseAuth();
    const [form, setForm] = useState<ProfileForm>(() => createInitialProfile(user));
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [messageSeverity, setMessageSeverity] = useState<'success' | 'error'>('success');
    const loginError = validateLogin(form.login);
    const emailError = validateEmail(form.email);
    const avatarError = validateAvatarUrl(form.avatarUrl);
    const linkedProviderIds = auth.currentUser?.providerData.map((provider) => provider.providerId) ?? [];
    const isGoogleLinked = linkedProviderIds.includes('google.com');
    const isGitHubLinked = linkedProviderIds.includes('github.com');

    useEffect(() => {
        if (open) {
            const nextProfile = createInitialProfile(user);

            setForm(nextProfile);
            setMessage('');
            setMessageSeverity('success');
        }
    }, [open, user?.avatarUrl, user?.email, user?.login]);

    const handleClose = () => {
        if (!isSaving) {
            onClose();
        }
    };

    const handleSave = async () => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            setMessageSeverity('error');
            setMessage('Сначала войдите в аккаунт');
            return;
        }

        if (loginError || emailError || avatarError) {
            setMessageSeverity('error');
            setMessage(loginError || emailError || avatarError);
            return;
        }

        setIsSaving(true);
        setMessage('');

        try {
            const requestedProfile: ProfileForm = {
                login: form.login.trim(),
                email: form.email.trim(),
                avatarUrl: form.avatarUrl.trim(),
            };

            await updateProfile(currentUser, {
                displayName: requestedProfile.login,
                photoURL: requestedProfile.avatarUrl || null,
            });

            if (currentUser.email !== requestedProfile.email) {
                try {
                    await updateEmail(currentUser, requestedProfile.email);
                } catch (err) {
                    await currentUser.reload();

                    const syncedProfile: ProfileForm = {
                        login: currentUser.displayName || requestedProfile.login,
                        email: currentUser.email || form.email.trim(),
                        avatarUrl: currentUser.photoURL || requestedProfile.avatarUrl,
                    };

                    setForm(syncedProfile);
                    onProfileUpdated?.(syncedProfile);
                    setMessageSeverity('error');
                    setMessage(getFirebaseProfileErrorMessage(err));
                    return;
                }
            }

            await currentUser.reload();

            const nextProfile: ProfileForm = {
                login: currentUser.displayName || requestedProfile.login,
                email: currentUser.email || requestedProfile.email,
                avatarUrl: currentUser.photoURL || requestedProfile.avatarUrl,
            };

            setForm(nextProfile);
            onProfileUpdated?.(nextProfile);
            setMessageSeverity('success');
            setMessage('Профиль обновлен');
        } catch (err) {
            setMessageSeverity('error');
            setMessage(getFirebaseProfileErrorMessage(err));
        } finally {
            setIsSaving(false);
        }
    };

    const handleLinkGoogle = async () => {
        setMessage('');
        try {
            await linkGoogleProvider();
            setMessageSeverity('success');
            setMessage('Google привязан к аккаунту');
        } catch (err: any) {
            setMessageSeverity('error');
            setMessage(err.message || 'Не удалось привязать Google');
        }
    };

    const handleLinkGitHub = async () => {
        setMessage('');
        try {
            await linkGitHubProvider();
            setMessageSeverity('success');
            setMessage('GitHub привязан к аккаунту');
        } catch (err: any) {
            setMessageSeverity('error');
            setMessage(err.message || 'Не удалось привязать GitHub');
        }
    };

    return (
        <Dialog

            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            disableScrollLock
            PaperProps={{ sx: dialogPaperSx }}
            BackdropProps={{ sx: dialogBackdropSx }}

        >
            <DialogTitle sx={{ pb: 1 }}>
                <Typography component="h2" sx={titleSx}>
                    Настройка профиля
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3} sx={{ pt: 1 }}>
                    <Box sx={{ alignItems: 'center', display: 'flex', gap: 2.5 }}>
                        <Box>
                            <Avatar src={form.avatarUrl} alt={form.login} sx={avatarSx}>
                                {form.login[0]?.toUpperCase()}
                            </Avatar>
                        </Box>

                        <Box>
                            <Typography sx={{ color: '#f5f3ff', fontSize: 18, fontWeight: 700 }}>
                                {form.login}
                            </Typography>
                            <Typography sx={{ color: '#c5cae0d5', fontSize: 14 }}>
                                {form.email}
                            </Typography>
                            <Typography sx={{ color: '#6379e9d0', fontSize: 13, mt: 1 }}>
                                Вставьте ссылку на изображение ниже
                            </Typography>
                        </Box>
                    </Box>

                    <TextField
                        label="Логин"
                        value={form.login}
                        onChange={(event) => setForm((prev) => ({ ...prev, login: event.target.value }))}
                        fullWidth
                        variant="filled"
                        error={Boolean(loginError)}
                        helperText={loginError}
                        FormHelperTextProps={{ sx: helperTextSx }}
                        InputLabelProps={{ sx: inputLabelSx }}
                        InputProps={{ disableUnderline: true }}
                        sx={textFieldSx}
                    />

                    <TextField
                        label="Почта"
                        value={form.email}
                        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                        fullWidth
                        variant="filled"
                        type="email"
                        error={Boolean(emailError)}
                        helperText={emailError}
                        FormHelperTextProps={{ sx: helperTextSx }}
                        InputLabelProps={{ sx: inputLabelSx }}
                        InputProps={{ disableUnderline: true }}
                        sx={textFieldSx}
                    />

                    <TextField
                        label="Ссылка на аватарку"
                        value={form.avatarUrl}
                        onChange={(event) => setForm((prev) => ({ ...prev, avatarUrl: event.target.value }))}
                        fullWidth
                        variant="filled"
                        type="url"
                        placeholder="https://example.com/avatar.png"
                        error={Boolean(avatarError)}
                        helperText={avatarError || 'Аватарка обновится в окне сразу после ввода ссылки'}
                        FormHelperTextProps={{ sx: avatarError ? helperTextSx : { color: '#9eb4f1' } }}
                        InputLabelProps={{ sx: inputLabelSx }}
                        InputProps={{ disableUnderline: true }}
                        sx={textFieldSx}
                    />

                    <Stack spacing={1.5}>
                        <Typography sx={{ color: '#f5f3ff', fontSize: 15, fontWeight: 700 }}>
                            Способы входа
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                            <Button
                                variant="outlined"
                                startIcon={<FcGoogle />}
                                onClick={handleLinkGoogle}
                                disabled={isGoogleLinked || googleLoading}
                                sx={providerButtonSx}
                                fullWidth
                            >
                                {isGoogleLinked ? 'Google привязан' : 'Привязать Google'}
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FaGithub />}
                                onClick={handleLinkGitHub}
                                disabled={isGitHubLinked || gitHubLoading}
                                sx={providerButtonSx}
                                fullWidth
                            >
                                {isGitHubLinked ? 'GitHub привязан' : 'Привязать GitHub'}
                            </Button>
                        </Stack>
                    </Stack>

                    {message && (
                        <Alert
                            severity={messageSeverity}
                            sx={messageSeverity === 'success' ? successAlertSx : errorAlertSx}
                        >
                            {message}
                        </Alert>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, mt: 5 }}>
                <Button onClick={handleClose} disabled={isSaving} sx={cancelButtonSx}>
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaving || Boolean(loginError || emailError || avatarError)}
                    sx={saveButtonSx}
                >
                    {isSaving ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Сохранить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Profile;
