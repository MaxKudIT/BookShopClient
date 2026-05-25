import { useRef, useState, type ChangeEvent, type FC } from 'react';
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
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { FaCamera } from 'react-icons/fa';

type ProfileForm = {
    login: string;
    email: string;
    avatarUrl: string;
};

const mockProfile: ProfileForm = {
    login: 'Monten22',
    email: 'kudinovmaks143@gmail.com',
    avatarUrl: '',
};

const mockUpdateLogin = async (login: string) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { login };
};

const mockUpdateEmail = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { email };
};

const mockUploadAvatar = async (file: File, previewUrl: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { avatarUrl: previewUrl };
};

const Profile: FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState<ProfileForm>(mockProfile);
    const [savedProfile, setSavedProfile] = useState<ProfileForm>(mockProfile);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleOpen = () => {
        setForm(savedProfile);
        setAvatarFile(null);
        setMessage('');
        setIsOpen(true);
    };

    const handleClose = () => {
        if (!isSaving) {
            setIsOpen(false);
        }
    };

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setAvatarFile(file);
        setForm((prev) => ({
            ...prev,
            avatarUrl: URL.createObjectURL(file),
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');

        try {
            const [loginResult, emailResult, avatarResult] = await Promise.all([
                mockUpdateLogin(form.login),
                mockUpdateEmail(form.email),
                avatarFile
                    ? mockUploadAvatar(avatarFile, form.avatarUrl)
                    : Promise.resolve({ avatarUrl: form.avatarUrl }),
            ]);

            const nextProfile = {
                login: loginResult.login,
                email: emailResult.email,
                avatarUrl: avatarResult.avatarUrl,
            };

            setSavedProfile(nextProfile);
            setForm(nextProfile);
            setAvatarFile(null);
            setMessage('Профиль обновлен');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>

            <Dialog
                open={true}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(180deg, rgb(22, 27, 36) 0%, #0e1122 100%)',

                        borderRadius: '18px',
                        color: '#ebe9f0',
                    },
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>

                    <Typography component="h2" sx={{ color: '#f5f3ff', fontSize: 28, fontWeight: 800 }}>
                        Настройка профиля
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={3} sx={{ pt: 1 }}>
                        <Box sx={{ alignItems: 'center', display: 'flex', gap: 2.5 }}>
                            <Box sx={{ position: 'relative' }}>
                                <Avatar
                                    src={form.avatarUrl}
                                    alt={form.login}
                                    sx={{
                                        bgcolor: 'rgba(99, 121, 233, 0.62)',
                                        border: '2px solid rgba(196, 181, 253, 0.5)',
                                        color: '#fff',
                                        fontSize: 36,
                                        fontWeight: 800,
                                        height: 96,
                                        width: 96,
                                    }}
                                >
                                    {form.login[0]?.toUpperCase()}
                                </Avatar>

                                <IconButton
                                    aria-label="Добавить аватарку"
                                    onClick={() => fileInputRef.current?.click()}
                                    sx={{
                                        bgcolor: '#6379e9',
                                        bottom: -4,
                                        color: '#fff',
                                        position: 'absolute',
                                        right: -4,
                                        '&:hover': {
                                            bgcolor: '#5a6ed6',
                                        },
                                    }}
                                >
                                    <FaCamera size={16} />
                                </IconButton>
                            </Box>

                            <Box>
                                <Typography sx={{ color: '#f5f3ff', fontSize: 18, fontWeight: 700 }}>
                                    {form.login}
                                </Typography>
                                <Typography sx={{ color: '#c5cae0d5', fontSize: 14 }}>{form.email}</Typography>
                                <Typography sx={{ color: '#6379e9d0', fontSize: 13, mt: 1 }}>
                                    JPG, PNG или WEBP
                                </Typography>
                            </Box>

                            <input
                                ref={fileInputRef}
                                hidden
                                accept="image/png,image/jpeg,image/webp"
                                type="file"
                                onChange={handleAvatarChange}
                            />
                        </Box>

                        <TextField
                            label="Логин"
                            value={form.login}
                            onChange={(event) => setForm((prev) => ({ ...prev, login: event.target.value }))}
                            fullWidth
                            variant="filled"
                            InputLabelProps={{
                                sx: {
                                    color: '#85a6ff',


                                    '&.Mui-focused': {
                                      color: '#9eb4f1',

                                    },
                                }
                            }}
                            InputProps={{ disableUnderline: true }}
                            sx={{
                                '& .MuiFilledInput-root': {
                                    bgcolor: 'transparent',
                                    border: '1px solid rgba(167, 139, 250, 0.2)',
                                    borderRadius: '12px',
                                    color: '#f5f3ff',
                                },
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    borderRadius: '12px',
                                },

                                '&.Mui-focused': {
                                     bgcolor: 'transparent',
                                    border: '2px solid rgba(167, 139, 250, 0.2)',
                                },
                            }}
                        />

                        <TextField
                            label="Почта"
                            value={form.email}
                            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                            fullWidth
                            variant="filled"
                            type="email"
                            InputLabelProps={{
                                sx: {
                                    color: '#85a6ff',
                                    '&.Mui-focused': {
                                         color: '#9eb4f1',

                                    },
                                }
                            }}
                            InputProps={{ disableUnderline: true }}
                            sx={{
                                '& .MuiFilledInput-root': {
                                    bgcolor: 'transparent',
                                    border: '1px solid rgba(167, 139, 250, 0.2)',
                                    borderRadius: '12px',
                                    color: '#f5f3ff',
                                },
                            }}
                        />

                        {message && (
                            <Alert
                                severity="success"
                                sx={{
                                    bgcolor: 'rgba(34, 197, 94, 0.12)',
                                    border: '1px solid rgba(74, 222, 128, 0.22)',
                                    color: '#bbf7d0',
                                }}
                            >
                                {message}
                            </Alert>
                        )}
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        onClick={handleClose}
                        disabled={isSaving}
                        sx={{
                            color: '#bab5fd',
                            textTransform: 'none',
                            borderRadius: '10px',
                            minWidth: 100,
                            fontWeight: 500
                        }}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={isSaving || !form.login.trim() || !form.email.trim()}
                        sx={{
                            bgcolor: '#6379e9d0',
                            borderRadius: '10px',
                            minWidth: 132,
                            textTransform: 'none',
                            fontWeight: 500,
                            '&:hover': {
                                bgcolor: '#4959aad0',
                            },
                        }}
                    >
                        {isSaving ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Сохранить'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Profile;
