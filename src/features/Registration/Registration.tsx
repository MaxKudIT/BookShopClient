import {
  TextField,
  InputAdornment,
  Button,
  textFieldClasses,
  IconButton,
  Alert,
  CircularProgress,
  Box,
  Chip,
  Snackbar,
} from '@mui/material';
import cn from 'classnames';
import { MdClear, MdOutlineEmail, MdLockOutline, MdDriveFileRenameOutline, MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import styles from './Registration.module.scss'
import { buttonStyles, textFieldStyles } from './muiStyle';
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/context/AuthContext';
import { validateEmail, validateLogin, validatePassword } from '../../shared/helpers/validateForm';
import { useFirebaseAuth, type AppUser } from '../../shared/hooks/useFirebaseAuth';

import { auth } from '../../shared/hooks/configs/firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { useDelete, usePost } from '../../shared/hooks/queries';
import { getAuth, type User } from 'firebase/auth';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { GrFormNext } from 'react-icons/gr';
import { IoMdInformationCircleOutline } from 'react-icons/io';



export type RegFormType = {
  email: string
  login: string,
  pass: string
}

export type SagaType = {
  firebaseUser: boolean,
  dbUser: boolean,
  cart: boolean,
  fav: boolean
}

const Registration = () => {






  const navigate = useNavigate();

  const [user] = useAuthState(auth)

  const { post: createUser } = usePost<{ FirebaseId: string }, { id: string }>('/users/create');
  const { deleteI: deleteUserDB } = useDelete<any>('/users')


  const { post: createCart } = usePost<{ title: string }, { id: string }>('/cart') //создание корзины для пользователя
  const { deleteI: deleteCartDB } = useDelete<any>('/cart')

  const { post: createFav } = usePost<{ title: string }, { id: string }>('/fav')  //создание избранного (как корзины содержимого) для пользователя
  const { deleteI: deleteFavDB } = useDelete<any>('/fav')

  const { post: createAIChat } = usePost<{ title: string }, { id: string }>('/ai-chats')

  const { register, registerLoading, registerError, clearErrors, googleSignIn, googleError, gitHubSignIn, gitHubError } = useFirebaseAuth();

  useEffect(() => {
    if (user) {
      console.log('вошел', user)
    }
  }, [user])


  const [input, setInput] = useState<RegFormType>({ email: '', login: '', pass: '' })

  const [passIsVisible, setPassVisible] = useState<boolean>(false)


  const { setCurrentForm, isCurrentForm } = useAuth()

  const [errors, setErrors] = useState({
    login: '',
    email: '',
    pass: '',
  });


  const [submitError, setSubmitError] = useState<string>('');

  //окно ошибки
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (registerError || submitError || googleError || gitHubError) {
      setOpen(true);
    }
  }, [registerError, submitError, googleError, gitHubError]);

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      setOpen(false);
      clearErrors?.();
      setSubmitError?.('');
    }
  };


  const onChangeLogin = (e: any) => {
    const value = e.target.value;
    setInput(prev => ({ ...prev, login: value }));
    setErrors(prev => ({ ...prev, login: validateLogin(value) }));

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

  const isFormValid = () => {
    return (
      input.email.length > 0 &&
      input.login.length > 0 &&
      input.pass.length > 0 &&
      !errors.email &&
      !errors.login &&
      !errors.pass
    );
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid() || registerLoading) {
      return;
    }
    const completedOps: SagaType = {
      firebaseUser: false,
      dbUser: false,
      cart: false,
      fav: false
    };

    let dbUserId: string | undefined = undefined;
    let cartId: string | undefined = undefined;
    let favId: string | undefined = undefined

    let token: string | undefined = undefined;

    try {
     
      // 1. Регистрируем пользователя в Firebase
      const firebaseUser = await register(input);
      completedOps.firebaseUser = true;

      // 2. Получаем токен
    
      const auth = getAuth()
      token = await auth.currentUser?.getIdToken()

      // 3. Создаем пользователя в своей БД
      const data = await createUser({ FirebaseId: firebaseUser.uid });
      dbUserId = data.id;
      completedOps.dbUser = true;



      // 4. Создаем корзину для пользователя
      const data2 = await createCart(
        { title: `Cart ${firebaseUser.uid}` },
        { idToken: token }
      );
      cartId = data2.id;
      completedOps.cart = true;


      // 5. Создаем избранные товары (также обьект)
      const data3 = await createFav(
        { title: `Fav ${firebaseUser.uid}` },
        { idToken: token }
      );
      favId = data3.id;
      completedOps.fav = true;

      // 6. Создаем AI чат для пользователя
      await createAIChat(
        { title: 'BookShop AI' },
        { idToken: token }
      );

      // 7. Редирект на главную
      navigate('/', { replace: true });

      // 8. Очищаем форму
      setInput({ email: '', login: '', pass: '' });
      setErrors({ login: '', email: '', pass: '' });

    } catch (err: any) {
      console.log('error!!!')
      await rollbackOperations(completedOps, dbUserId, cartId, favId, token)
      console.error('Ошибка регистрации:', err);
      setSubmitError(err.message || 'Произошла ошибка при регистрации');
    }
  };

  const rollbackOperations = async (
    completedOps: SagaType,
    dbUserId: string | undefined,
    cartId: string | undefined,
    favId: string | undefined,
    token: string | undefined) => {

      console.log('tste')
    if (completedOps.fav) {
      try {

        await deleteFavDB({ idToken: token, param: favId });
        console.log('Избранное удалено');
      } catch (e) {
        console.error('Не удалось удалить избранное:', e);
      }
    }

    if (completedOps.cart) {
      try {
        await deleteCartDB({ idToken: token, param: cartId });
        console.log('Корзина удалена');
      } catch (e) {
        console.error('Не удалось удалить корзину:', e);
      }
    }

    if (completedOps.dbUser) {
      try {
        await deleteUserDB({ param: dbUserId });
        console.log('Пользователь удален из БД');
      } catch (e) {
        console.error('Не удалось удалить пользователя из БД:', e);
      }
    }

    if (completedOps.firebaseUser) {
      try {
        const auth = getAuth();
        if (auth.currentUser) {
          await auth.currentUser.delete();
          console.log('Пользователь Firebase удален');
        }
      } catch (e) {
        console.error('Не удалось удалить пользователя Firebase:', e);
      }
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
    await createAIChat(
      { title: 'BookShop AI' },
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

      setInput({ email: '', login: '', pass: '' });
      setErrors({ login: '', email: '', pass: '' });
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

      setInput({ email: '', login: '', pass: '' });
      setErrors({ email: '', login: '', pass: '' });
    }
    catch (e: any) {
      console.error(e)
      setSubmitError(e.message || 'Не удалось войти через GitHub')
    }


  }








  return (
    <div className={cn(
      styles.registration_container,
      isCurrentForm === 'login' && styles.unactive
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
        <button onClick={() => {
          setInput({ email: '', pass: '', login: '' })
          setErrors({ pass: '', login: '', email: '' })
          clearErrors()
          setCurrentForm('login')

          setSubmitError('');
        }} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} className={styles.toggle_button_unactive}>
          Авторизация
        </button>
        <button style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} className={styles.toggle_button_active}>
          Регистрация
        </button>
      </div>
      <div style={{ width: '100%', rowGap: 6, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 24, fontFamily: 'Montserrat', color: '#F3F4F6FF', fontWeight: 700 }}>Приветствуем вас!</p>
        <p style={{ fontSize: 13, color: '#BDC1CAFF', fontWeight: 400 }}>Создайте аккаунт для погружения в мир фантастических историй</p>
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
          {registerError || submitError || googleError || gitHubError}
        </Alert>
      </Snackbar>

      <div className={styles.text_field_block}>
        <TextField
          sx={textFieldStyles}
          value={input.login}
          label="Логин"
          onChange={onChangeLogin}
          fullWidth
          margin="normal"
          helperText={errors.login}
          error={!!errors.login}

          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MdDriveFileRenameOutline />
                </InputAdornment>
              ),

            },
          }}
        />
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
                    {passIsVisible ? <MdOutlineVisibilityOff color='white' /> : <MdOutlineVisibility color='white' />}
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
        {registerLoading ? <CircularProgress
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1,
            color: 'rgb(21, 23, 29)'
          }}

        /> : (
          <>
            <p style={{fontFamily: 'Inter'}}>Создать аккаунт</p>
            <GrFormNext style={{ fontSize: 18, color: 'rgb(21, 23, 29)' }} />
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
     


    </div>
  )
}

export default Registration;
