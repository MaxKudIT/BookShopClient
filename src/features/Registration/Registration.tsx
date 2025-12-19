import {
  TextField,
  InputAdornment,
  Button,
  textFieldClasses,
  IconButton,
} from '@mui/material';
import cn from 'classnames';
import { MdClear, MdOutlineEmail, MdLockOutline, MdDriveFileRenameOutline, MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import styles from './Registration.module.scss'
import { buttonStyles, textFieldStyles } from './muiStyle';
import { useState } from 'react';
import { useAuth } from '../../store/context/AuthContext';
import { validateEmail, validateLogin, validatePassword } from '../../shared/helpers/validateForm';


export type RegFormType = {
  email: string
  login: string,
  pass: string
}



const Registration = () => {


  const [input, setInput] = useState<RegFormType>({ email: '', login: '', pass: '' })

  const [passIsVisible, setPassVisible] = useState<boolean>(false)


  const {setCurrentForm, isCurrentForm} = useAuth()

  const [errors, setErrors] = useState({
    login: '',
    email: '',
    pass: '',
  });


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


  return (
    <div className={cn(
      styles.registration_container,
       isCurrentForm === 'login' && styles.unactive
    )}>
      <div className={styles.registration_wrapper_column}>
        <div className={styles.head_text_block}>
          <p style={{ fontSize: 20 }}>Регистрация</p>
          <p style={{ color: '#535252ff', fontSize: 15, opacity: '0.8' }}>Создайте новый аккаунт</p>
        </div>

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
            sx={textFieldStyles}
             value={input.email}
            label="Почта"
               
            
            onChange={onChangeEmail}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
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

            sx={textFieldStyles}
              value={input.pass}

            label="Пароль"
            onChange={onChangePassword}
            type={passIsVisible ? 'text' : 'password'}
            fullWidth
            margin="normal"
         
            error={!!errors.pass}
            helperText={errors.pass}

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
                      {passIsVisible ? <MdOutlineVisibilityOff color='gray'/> : <MdOutlineVisibility color='gray'/>}
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
          style={errors.login || errors.email || errors.pass || !input.email || !input.login || !input.pass ? {pointerEvents: 'none', opacity: 0.6 } : {pointerEvents: 'auto', opacity: 1}}
          >
            
          Зарегистрироваться
        </Button>

        <div className={styles.href_block}>
          <p>Уже есть аккаунт?</p>
          <span onClick={() => {
            setInput({email: '', pass: '', login: ''})
            setErrors({pass: '', login: '', email: ''})
            setCurrentForm('login')
          } }>Войти</span>
        </div>


        <div>

        </div>
      </div>

    </div>
  )
}

export default Registration;