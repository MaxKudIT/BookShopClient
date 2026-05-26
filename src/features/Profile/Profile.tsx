import { useEffect, useRef, useState, type ChangeEvent, type FC } from 'react';
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

type ProfileProps = {
    open: boolean;
    onClose: () => void;
    user?: {
        login: string;
        email: string;
    };
};

const fallbackProfile: ProfileForm = {
    login: 'Monten22',
    email: 'kudinovmaks143@gmail.com',
    avatarUrl: '',
};

const createInitialProfile = (user?: ProfileProps['user']): ProfileForm => ({
    login: user?.login || fallbackProfile.login,
    email: user?.email || fallbackProfile.email,
    avatarUrl: fallbackProfile.avatarUrl,
});

const saveProfileMock = async (profile: ProfileForm) => {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return profile;
};

const dialogPaperSx = {
    background: 'linear-gradient(180deg, rgb(22, 27, 36) 0%, #0e1122 100%)',
    borderRadius: '18px',
    color: '#ebe9f0',

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

const avatarButtonSx = {
    bgcolor: '#6379e9',
    bottom: -4,
    color: '#fff',
    position: 'absolute',
    right: -4,
    '&:hover': {
        bgcolor: '#5a6ed6',
    },
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
};

const dialogBackdropSx = {
    backgroundColor: 'rgba(8, 11, 18, 0.62)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
};
const Profile: FC<ProfileProps> = ({ open, onClose, user }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [savedProfile, setSavedProfile] = useState<ProfileForm>(() => createInitialProfile(user));
    const [form, setForm] = useState<ProfileForm>(() => createInitialProfile(user));
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (open) {
            setForm(savedProfile);
            setMessage('');
        }
    }, [open]);

    const handleClose = () => {
        if (!isSaving) {
            onClose();
        }
    };

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setForm((prev) => ({
            ...prev,
            avatarUrl: URL.createObjectURL(file),
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');

        try {
            const nextProfile = await saveProfileMock(form);

            setSavedProfile(nextProfile);
            setForm(nextProfile);
            setMessage('Профиль обновлен');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog
        
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            disableScrollLock
            PaperProps={{ sx: dialogPaperSx} }
            BackdropProps={{sx: dialogBackdropSx}}
            
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Typography component="h2" sx={titleSx}>
                    Настройка профиля
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3} sx={{ pt: 1 }}>
                    <Box sx={{ alignItems: 'center', display: 'flex', gap: 2.5 }}>
                        <Box sx={{ position: 'relative' }}>
                            <Avatar src={form.avatarUrl} alt={form.login} sx={avatarSx}>
                                {form.login[0]?.toUpperCase()}
                            </Avatar>

                            <IconButton
                                aria-label="Добавить аватарку"
                                onClick={() => fileInputRef.current?.click()}
                                sx={avatarButtonSx}
                            >
                                <FaCamera size={16} />
                            </IconButton>
                        </Box>

                        <Box>
                            <Typography sx={{ color: '#f5f3ff', fontSize: 18, fontWeight: 700 }}>
                                {form.login}
                            </Typography>
                            <Typography sx={{ color: '#c5cae0d5', fontSize: 14 }}>
                                {form.email}
                            </Typography>
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
                        InputLabelProps={{ sx: inputLabelSx }}
                        InputProps={{ disableUnderline: true }}
                        sx={textFieldSx}
                    />

                    {message && (
                        <Alert severity="success" sx={successAlertSx}>
                            {message}
                        </Alert>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={handleClose} disabled={isSaving} sx={cancelButtonSx}>
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaving || !form.login.trim() || !form.email.trim()}
                    sx={saveButtonSx}
                >
                    {isSaving ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Сохранить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Profile;
