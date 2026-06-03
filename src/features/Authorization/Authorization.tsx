import {
  TextField,
  InputAdornment,
  Button,
  textFieldClasses,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
  Box,
  Snackbar,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import { FcGoogle } from "react-icons/fc";

import cn from 'classnames';
import { MdClear, MdOutlineEmail, MdLockOutline, MdOutlineVisibilityOff, MdOutlineVisibility, MdOutlineNavigateNext, MdNavigateNext } from "react-icons/md";
import styles from './Authorization.module.scss'
import { buttonStyles, textFieldStyles } from './muiStyles';
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/context/AuthContext';
import { validateEmail, validatePassword } from '../../shared/helpers/validateForm';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../shared/hooks/useFirebaseAuth';
import { GrFormNext } from 'react-icons/gr';
import { FaGithub } from 'react-icons/fa6';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { usePost } from '../../shared/hooks/queries';
import type { User } from 'firebase/auth';


export type LoginFormType = {
  email: string
  pass: string
}




const Authorization = () => {

  const { login, loginLoading, loginError, clearErrors, googleSignIn, googleError, gitHubSignIn, gitHubError } = useFirebaseAuth();
  const { post: createUser } = usePost<{ FirebaseId: string }, { id: string }>('/users/create');
  const { post: createCart } = usePost<{ title: string }, { id: string }>('/cart')
  const { post: createFav } = usePost<{ title: string }, { id: string }>('/fav')


  const [submitError, setSubmitError] = useState<string>('');


  //окно ошибки
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loginError || submitError || googleError || gitHubError) {
      setOpen(true);
    }
  }, [loginError, submitError, googleError, gitHubError]);


  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      setOpen(false);
      clearErrors?.();
      setSubmitError?.('');
    }
  };


  const navigate = useNavigate()

  const { setCurrentForm, isCurrentForm } = useAuth()

  const [input, setInput] = useState<LoginFormType>({ email: '', pass: '' })

  const [passIsVisible, setPassVisible] = useState<boolean>(false)


  const [errors, setErrors] = useState({
    email: '',
    pass: '',
  });



  const isFormValid = () => {
    return (
      input.email.length > 0 &&
      input.pass.length > 0 &&
      !errors.email &&
      !errors.pass
    );
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid() || loginLoading) {
      return;
    }

    try {

      const user = await login(input);


      if (user) {
        navigate('/', { replace: true })
      }

      setInput({ email: '', pass: '' });
      setErrors({ email: '', pass: '' });




    } catch (err: any) {

      console.error('Ошибка аутентификации:', err);
      setSubmitError(err.message || 'Произошла ошибка при аутентификации');
    }
  };

  const createOAuthUserResources = async (firebaseUser: User) => {
    const token = await firebaseUser.getIdToken();

    await createUser({ FirebaseId: firebaseUser.uid });
    await createCart(
      { title: `Cart ${firebaseUser.uid}` },
      { idToken: token }
    );
    await createFav(
      { title: `Fav ${firebaseUser.uid}` },
      { idToken: token }
    );
  };

  const handleGoogleLogin = async () => {
    try {
      const oauthResult = await googleSignIn();

      if (oauthResult?.isNewUser) {
        await createOAuthUserResources(oauthResult.user);
      }

      navigate('/', { replace: true });

      setInput({ email: '', pass: '' });
      setErrors({ email: '', pass: '' });
    }
    catch (e: any) {
      console.error(e)
      setSubmitError(e.message || 'Не удалось войти через Google')
    }


  }

  const handleGitHubLogin = async () => {
    try {
      const oauthResult = await gitHubSignIn();

      if (oauthResult?.isNewUser) {
        await createOAuthUserResources(oauthResult.user);
      }

      navigate('/', { replace: true });

      setInput({ email: '', pass: '' });
      setErrors({ email: '', pass: '' });
    }
    catch (e: any) {
      console.error(e)
      setSubmitError(e.message || 'Не удалось войти через GitHub')
    }


  }


  const onChangeEmail = (e: any) => {
    const value = e.target.value;
    setInput(prev => ({ ...prev, email: value }));
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));

  }

  const onChangePassword = (e: any) => {
    const value = e.target.value;
    setInput(prev => ({ ...prev, pass: value }));
    setErrors(prev => ({ ...prev, pass: validatePassword(value) }));
  }



  return (
    <div className={cn(
      styles.authorization_container,
      isCurrentForm === 'registration' && styles.unactive
    )}>


      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 30,
        width: '100%',
        height: 40,
        background: '#262A3380',
        borderRadius: 16
      }}>
        <button style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} className={styles.toggle_button_active}>
          Авторизация
        </button>
        <button onClick={() => {
          setInput({ email: '', pass: '' })
          setErrors({ pass: '', email: '' })
          clearErrors()
          setCurrentForm('registration')

          setSubmitError('');
        }} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} className={styles.toggle_button_unactive}>
          Регистрация
        </button>
      </div>
      <div style={{ width: '100%', rowGap: 6, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 24, fontFamily: 'Montserrat', color: '#F3F4F6FF', fontWeight: 700 }}>С возвращением!</p>
        <p style={{ fontSize: 13, color: '#BDC1CAFF', fontWeight: 400 }}>Введите свои данные, чтобы продолжить чтение</p>
      </div>




      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 2 }}
      >
        <Alert
          severity="error"
          sx={{
            background: 'rgba(155, 32, 16, 0.3)',
            borderRadius: 3,
            color: '#F3F4F6FF',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(155, 32, 16, 0.5)'
          }}
          onClose={() => {
            setOpen(false);
            clearErrors?.();
            setSubmitError?.('');
          }}
        >
          {loginError || submitError || googleError || gitHubError}
        </Alert>
      </Snackbar>



      <div className={styles.text_field_block}>

        <TextField

          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"

          onChange={onChangeEmail}
          value={input.email}
          sx={textFieldStyles}
          label="Почта"
          helperText={errors.email}
          error={!!errors.email}

          fullWidth
          margin="normal"

          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MdOutlineEmail />
                </InputAdornment>
              ),

            },
          }}
        />



        <TextField


          autoComplete="current-password"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"

          onChange={onChangePassword}

          sx={textFieldStyles}
          value={input.pass}

          label="Пароль"
          type={passIsVisible ? 'text' : 'password'}
          fullWidth
          margin="normal"
          helperText={errors.pass}
          error={!!errors.pass}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MdLockOutline />
                </InputAdornment>
              ),
              endAdornment: input.pass.length > 0 && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setPassVisible(prev => !prev)}
                    edge="end"
                    size="small"
                    aria-label={passIsVisible ? "Скрыть пароль" : "Показать пароль"}

                  >
                    {passIsVisible ? <MdOutlineVisibilityOff color='#BDC1CAFF' /> : <MdOutlineVisibility color='#BDC1CAFF' />}
                  </IconButton>
                </InputAdornment>
              )

            },
          }}
        />

      </div>


      <Button
        sx={buttonStyles}
        variant="contained"
        onClick={handleSubmit}
        style={errors.email || errors.pass || !input.email || !input.pass ? { pointerEvents: 'none', opacity: 0.6 } : { pointerEvents: 'auto', opacity: 1 }}
      >
        {loginLoading ? <CircularProgress
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1,
            color: 'rgb(21, 23, 29)',
    
          }}

        /> : (
          <>
            <p style={{fontFamily: 'Inter'}}>Войти в аккаунт</p>
            <GrFormNext style={{ fontSize: 18 }} />
          </>

        )}
      </Button>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginBottom: 3
      }}>
        <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgb(107, 111, 117)' }} />
        <Chip
          label="ИЛИ ВОЙТИ ЧЕРЕЗ"

          sx={{
            color: 'rgb(107, 111, 117)',
            borderColor: 'rgb(107, 111, 117)',
            backgroundColor: 'transparent',
            fontSize: 11,

          }}
        />
        <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgb(107, 111, 117)' }} />
      </Box>

      <div style={{ width: '100%', height: 35, display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
        <button onClick={handleGoogleLogin} className={styles.button_oauth}>
          <FcGoogle />
          <p style={{ fontFamily: 'Lato' }}>Google</p>
        </button>

        <button onClick={handleGitHubLogin} className={styles.button_oauth}>
          <FaGithub />
          <p style={{ fontFamily: 'Lato' }}>GitHub</p>
        </button>
      </div>
      <div style={{
        background: '#6f7ec90d',
        border: '1px solid #5c6cbe1a',
        borderRadius: 10,
        width: '100%',
        display: 'flex',
        columnGap: 10,
        alignItems: 'center',
        padding: 10,

      }}>

        <IoMdInformationCircleOutline style={{ color: '#6379E9FF', fontSize: 18, flexShrink: 0 }} />
        <p style={{
          color: '#BDC1CAFF',
          fontSize: 12,
          
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          lineHeight: 1.5
        }}>Регистрируйтесь сейчас и успейте получить в подарок 3 фантастические книги!</p>
      </div>







      <div>

      </div>
    </div>

  )
}

export default Authorization;
