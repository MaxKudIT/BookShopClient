import { useState, useCallback } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  type User
} from 'firebase/auth';
import { doc, setDoc, getDoc, type DocumentData } from 'firebase/firestore';
import { auth, db } from './configs/firebase-config';
import type { RegFormType } from '../../features/Registration/Registration';
import type { LoginFormType } from '../../features/Authorization/Authorization';


export type AppUser = User & { login: string }


export const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AppUser | User | null>(null);





  const register = useCallback(async (reg: RegFormType): Promise<AppUser> => {
    try {
    
      setLoading(true);
      setError(null);



   
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        reg.email,
        reg.pass
      );
      

      const firebaseUser = userCredential.user;


      await updateProfile(firebaseUser, {
        displayName: reg.login
      });

      const userData = {
        ...firebaseUser,
        login: reg.login
      };
    
      setUser(userData);
      return userData;

    } catch (err: any) {
      const errorMessage = getErrorMessage(err.code, 'register');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

 


  


  const login = useCallback(async (log: LoginFormType) => {
    try {
      setLoading(true);
      setError(null);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        log.email,
        log.pass
      );

      const firebaseUser = userCredential.user;

    console.log(firebaseUser)

      setUser(firebaseUser);
      return firebaseUser;

    } catch (err: any) {
      console.log(err)
      const errorMessage = getErrorMessage(err.code, 'login');
      console.log(errorMessage)
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);







  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError('Ошибка при выходе');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);




  


  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    
    user,
    loading,
    error,
    
    register,
    login,
    logout,

    clearError
  };
};



type RegisterErrors = {
      'auth/email-already-in-use': string,
      'auth/invalid-email': 'Неверный формат email',
      'auth/weak-password': string,
      'auth/operation-not-allowed': string,
      'default': string
}


type LoginErrors = {
      'auth/invalid-credential': string,
     'auth/user-not-found': string,
      'auth/wrong-password': string,
      'auth/invalid-email': string,
      'auth/user-disabled': string,
      'auth/too-many-requests': string,
      'default': string
}

type FirebaseAuthErrorCode = keyof RegisterErrors | keyof LoginErrors




const getErrorMessage = (errorCode: FirebaseAuthErrorCode, action: 'register' | 'login') => {
  const errorMessages: {register: RegisterErrors, login: LoginErrors} = {
    register: {
      'auth/email-already-in-use': 'Этот email уже используется',
      'auth/invalid-email': 'Неверный формат email',
      'auth/weak-password': 'Пароль должен содержать минимум 6 символов',
      'auth/operation-not-allowed': 'Регистрация отключена администратором',
      'default': 'Ошибка при регистрации'
    },
    login: {
      'auth/invalid-credential': 'Введены некорректные данные',
      'auth/user-not-found': 'Пользователь не найден',
      'auth/wrong-password': 'Неверный пароль',
      'auth/invalid-email': 'Неверный формат email',
      'auth/user-disabled': 'Аккаунт отключен',
      'auth/too-many-requests': 'Слишком много попыток. Попробуйте позже',
      'default': 'Ошибка при входе'
    }
  };

  const messages = errorMessages[action] || errorMessages.login;
   if (errorCode in messages) {
    return messages[errorCode as keyof typeof messages];
  }
 return messages.default;
};