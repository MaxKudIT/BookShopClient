import {
  TextField,
  InputAdornment,
  Button,
  textFieldClasses,
  IconButton,
} from '@mui/material';


import cn from 'classnames';
import { MdClear, MdOutlineEmail, MdLockOutline, MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import styles from './Authorization.module.scss'
import { buttonStyles, textFieldStyles } from './muiStyles';
import { useState } from 'react';
import { useAuth } from '../../store/AuthStore';
import { validateEmail, validatePassword } from '../../shared/helpers/validateForm';


export type LoginFormType = {
  email: string
  pass: string
}




const Authorization = () =>
{


    const {setCurrentForm, isCurrentForm} = useAuth()

    const [input, setInput] = useState<LoginFormType>({ email: '', pass: '' })
    
      const [passIsVisible, setPassVisible] = useState<boolean>(false)


      const [errors, setErrors] = useState({
        email: '',
        pass: '',
      });
    
    
    
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
                <p style={{fontSize: 20, color: 'white'}}>Вход</p>
                <p style={{color: '#b8b7b7ff', fontSize: 15, opacity: '0.8'}}>Войдите в свой аккаунт</p>
            </div>

       <div className={styles.text_field_block}>

          <TextField
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
                        <MdLockOutline/>
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
                      {passIsVisible ? <MdOutlineVisibilityOff color='white'/> : <MdOutlineVisibility color='white'/>}
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
                style={errors.email || errors.pass || !input.email || !input.pass ? {pointerEvents: 'none', opacity: 0.6 } : {pointerEvents: 'auto', opacity: 1}}
            >
                Войти
            </Button>

            <div className={styles.href_block}>
            <p>Нет аккаунта?</p>
            <span onClick={() => {
            setInput({email: '', pass: ''})
            setErrors({pass: '', email: ''})
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