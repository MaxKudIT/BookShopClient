import {
  TextField,
  InputAdornment,
  Button,
  textFieldClasses,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';


import cn from 'classnames';
import { MdClear, MdOutlineEmail, MdLockOutline, MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import styles from './Authorization.module.scss'
import { buttonStyles, textFieldStyles } from './muiStyles';
import { useState } from 'react';
import { useAuth } from '../../store/context/AuthContext';
import { validateEmail, validatePassword } from '../../shared/helpers/validateForm';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../shared/hooks/useFirebaseAuth';
import { usePost } from '../../shared/hooks/queries';


export type LoginFormType = {
  email: string
  pass: string
}




const Authorization = () => {

 const { login, loading, error, clearError } = useFirebaseAuth();


   const [submitError, setSubmitError] = useState<string>('');

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
   
    if (!isFormValid() || loading) {
      return;
    }
    
    try {
    
      const user = await login(input);      
   

      if (user) {
        navigate('/', {replace: true})
      }

      setInput({ email: '', pass: '' });
      setErrors({email: '', pass: '' });
      


      
    } catch (err: any) {
    
      console.error('Ошибка аутентификации:', err);
      setSubmitError(err.message || 'Произошла ошибка при аутентификации');
    }
  };



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
      <div className={styles.authorization_wrapper_column}>
        <div className={styles.head_text_block}>
          <p style={{ fontSize: 20, color: 'white' }}>Вход</p>
          <p style={{ color: '#b8b7b7ff', fontSize: 15, opacity: '0.8' }}>Войдите в свой аккаунт</p>
        </div>

         {(error || submitError) && (
            <Alert 
              severity="error" 
              sx={{ width: '100%', background: 'rgba(219, 58, 37, 0.3)', borderRadius: 3, marginTop: 2, color: 'white' }}
              onClose={() => { clearError(); setSubmitError(''); }}
            >
              {error || submitError}
            </Alert>
          )}



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
          {loading ? <CircularProgress
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 1,
              color: 'blue'
            }}

          /> : 'Войти'}
        </Button>

        <div className={styles.href_block}>
          <p>Нет аккаунта?</p>
          <span onClick={() => {
            setInput({ email: '', pass: '' })
            setErrors({ pass: '', email: '' })
            clearError();
            setSubmitError('')

            setCurrentForm('registration')
          }}>Зарегистрироваться</span>
        </div>






        <div>

        </div>
      </div>

    </div>
  )
}

export default Authorization;