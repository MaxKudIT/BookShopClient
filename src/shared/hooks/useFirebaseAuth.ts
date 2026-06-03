import { useState, useCallback } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  type User,
  signInWithPopup,
  linkWithPopup,
  getAdditionalUserInfo
} from 'firebase/auth';
import { auth, githubProvider, googleProvider } from './configs/firebase-config';
import type { RegFormType } from '../../features/Registration/Registration';
import type { LoginFormType } from '../../features/Authorization/Authorization';


export type AppUser = User & { login: string }

export type OAuthSignInResult = {
  user: User;
  isNewUser: boolean;
}


export const useFirebaseAuth = () => {

  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [gitHubLoading, setGitHubLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [gitHubError, setGitHubError] = useState<string | null>(null);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const [user, setUser] = useState<AppUser | User | null>(null);


  const register = useCallback(async (reg: RegFormType): Promise<AppUser> => {
    setRegisterLoading(true);
    setRegisterError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        reg.email,
        reg.pass
      );

      const firebaseUser = userCredential.user;
      await updateProfile(firebaseUser, { displayName: reg.login });

      const userData = { ...firebaseUser, login: reg.login };
      setUser(userData);
      return userData;
    } catch (err: any) {
      const errorMessage = getErrorMessage(err.code, 'register');
      setRegisterError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setRegisterLoading(false);
    }
  }, []);

  const login = useCallback(async (log: LoginFormType) => {
    if (user) {
      console.log('Вы уже вошли!');
      return;
    }

    setLoginLoading(true);
    setLoginError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        log.email,
        log.pass
      );
      const firebaseUser = userCredential.user;
      setUser(firebaseUser);
      return firebaseUser;
    } catch (err: any) {
      const errorMessage = getErrorMessage(err.code, 'login');
      setLoginError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoginLoading(false);
    }
  }, []);



  const googleSignIn = useCallback(async () => {

    if (user) {
      console.log('Вы уже вошли!');
      return;
    }

    setGoogleLoading(true);
    setGoogleError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
      return {
        user,
        isNewUser: getAdditionalUserInfo(result)?.isNewUser ?? false
      };
    } catch (err: any) {
      const errorMessage = getErrorMessage(err.code, 'google');
      setGoogleError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  }, []);




  const gitHubSignIn = useCallback(async () => {

    if (user) {
      console.log('Вы уже вошли!');
      return;
    }

    setGitHubLoading(true);
    setGitHubError(null);

    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      if (!user.displayName) {
        console.log('GitHub не вернул displayName, создаем из других данных');

        if (user.email) {
          const nameFromEmail = user.email.split('@')[0];
          await updateProfile(user, {
            displayName: nameFromEmail
          });
          console.log('Установлен displayName из email:', nameFromEmail);
        }
      }

      setUser(user);
      return {
        user,
        isNewUser: getAdditionalUserInfo(result)?.isNewUser ?? false
      };
    } catch (err: any) {
      const errorMessage = getErrorMessage(err.code, 'gitHub');
      setGitHubError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setGitHubLoading(false);
    }
  }, []);

  const linkGoogleProvider = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Сначала войдите в аккаунт');
    }

    setGoogleLoading(true);
    setGoogleError(null);

    try {
      const result = await linkWithPopup(currentUser, googleProvider);
      setUser(result.user);
      return result.user;
    } catch (err: any) {
      const errorMessage = getErrorMessage(err.code, 'google');
      setGoogleError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  }, []);

  const linkGitHubProvider = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Сначала войдите в аккаунт');
    }

    setGitHubLoading(true);
    setGitHubError(null);

    try {
      const result = await linkWithPopup(currentUser, githubProvider);
      const linkedUser = result.user;

      if (!linkedUser.displayName && linkedUser.email) {
        await updateProfile(linkedUser, {
          displayName: linkedUser.email.split('@')[0]
        });
      }

      setUser(linkedUser);
      return linkedUser;
    } catch (err: any) {
      const errorMessage = getErrorMessage(err.code, 'gitHub');
      setGitHubError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setGitHubLoading(false);
    }
  }, []);




  const logout = useCallback(async () => {
    setLogoutLoading(true);
    setLogoutError(null);

    try {
      await signOut(auth);
      setUser(null);
    } catch (err: any) {
      setLogoutError('Ошибка при выходе');
      throw err;
    } finally {
      setLogoutLoading(false);
    }
  }, []);


  const clearErrors = useCallback(() => {
    setRegisterError(null);
    setLoginError(null);
    setGoogleError(null);
    setGitHubError(null);
    setLogoutError(null);
  }, []);

  return {
    user,

    register,
    registerLoading,
    registerError,


    login,
    loginLoading,
    loginError,


    googleSignIn,
    googleLoading,
    googleError,


    logout,
    logoutLoading,
    logoutError,

    gitHubSignIn,
    gitHubLoading,
    gitHubError,

    linkGoogleProvider,
    linkGitHubProvider,

    clearErrors
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

type GoogleErrors = {
  'auth/popup-closed-by-user': string,
  'auth/popup-blocked': string,
  'auth/cancelled-popup-request': string,
  'auth/account-exists-with-different-credential': string,
  'auth/credential-already-in-use': string,
  'auth/email-already-in-use': string,
  'auth/provider-already-linked': string,
  'auth/auth-domain-config-required': string,
  'auth/operation-not-allowed': string,
  'auth/operation-not-supported-in-this-environment': string,
  'auth/unauthorized-domain': string,
  'auth/user-disabled': string,
  'auth/user-not-found': string,
  'auth/wrong-password': string,
  'auth/invalid-credential': string,
  'auth/network-request-failed': string,
  'auth/internal-error': string,
  'default': string
}


type GithubErrors = {


  'auth/popup-closed-by-user': string,
  'auth/popup-blocked': string,
  'auth/cancelled-popup-request': string,


  'auth/account-exists-with-different-credential': string,
  'auth/credential-already-in-use': string,
  'auth/email-already-in-use': string,
  'auth/provider-already-linked': string,


  'auth/operation-not-allowed': string,
  'auth/unauthorized-domain': string,
  'auth/operation-not-supported-in-this-environment': string,
  'auth/auth-domain-config-required': string,


  'auth/user-disabled': string,
  'auth/user-not-found': string,
  'auth/user-mismatch': string,


  'auth/network-request-failed': string,
  'auth/internal-error': string,
  'auth/timeout': string,


  'auth/github-auth-failed': string,
  'auth/invalid-oauth-client-id': string,
  'auth/invalid-oauth-provider': string,
  'auth/missing-oauth-client-secret': string,

  'default': string
}


type FirebaseAuthErrorCode = keyof RegisterErrors | keyof LoginErrors | keyof GoogleErrors | keyof GithubErrors




const getErrorMessage = (errorCode: FirebaseAuthErrorCode, action: 'register' | 'login' | 'google' | 'gitHub') => {
  const errorMessages: { register: RegisterErrors, login: LoginErrors, google: GoogleErrors, gitHub: GithubErrors } = {
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
    },
    google: {
      'auth/popup-closed-by-user': 'Окно входа было закрыто',
      'auth/popup-blocked': 'Браузер заблокировал всплывающее окно',
      'auth/cancelled-popup-request': 'Запрос отменен',
      'auth/account-exists-with-different-credential': 'Аккаунт уже существует с другим способом входа',
      'auth/credential-already-in-use': 'Этот Google уже привязан к другому аккаунту',
      'auth/email-already-in-use': 'Этот email уже используется другим аккаунтом',
      'auth/provider-already-linked': 'Google уже привязан к текущему аккаунту',
      'auth/auth-domain-config-required': 'Ошибка конфигурации домена',
      'auth/operation-not-allowed': 'Вход через Google отключен в Firebase Console',
      'auth/operation-not-supported-in-this-environment': 'Операция не поддерживается',
      'auth/unauthorized-domain': 'Домен не авторизован (добавьте в Firebase Console)',
      'auth/user-disabled': 'Аккаунт отключен',
      'auth/user-not-found': 'Пользователь не найден',
      'auth/wrong-password': 'Неверный пароль',
      'auth/invalid-credential': 'Неверные учетные данные',
      'auth/network-request-failed': 'Ошибка сети. Проверьте подключение',
      'auth/internal-error': 'Внутренняя ошибка сервера',
      'default': 'Ошибка при входе через Google'
    },
    gitHub: {

      'auth/popup-closed-by-user': 'Окно входа было закрыто',
      'auth/popup-blocked': 'Браузер заблокировал всплывающее окно. Разрешите всплывающие окна',
      'auth/cancelled-popup-request': 'Запрос отменен',


      'auth/account-exists-with-different-credential': 'Аккаунт с таким email уже существует, но с другим способом входа',
      'auth/credential-already-in-use': 'Эти учетные данные GitHub уже привязаны к другому аккаунту',
      'auth/email-already-in-use': 'Этот email уже используется другим аккаунтом',
      'auth/provider-already-linked': 'GitHub уже привязан к текущему аккаунту',


      'auth/operation-not-allowed': 'Вход через GitHub отключен в Firebase Console',
      'auth/unauthorized-domain': 'Домен не авторизован. Добавьте его в Firebase Console → Authentication → Settings → Authorized domains',
      'auth/operation-not-supported-in-this-environment': 'Операция не поддерживается в этой среде',
      'auth/auth-domain-config-required': 'Ошибка конфигурации домена аутентификации',


      'auth/user-disabled': 'Аккаунт отключен',
      'auth/user-not-found': 'Пользователь не найден',
      'auth/user-mismatch': 'Учетные данные не соответствуют текущему пользователю',


      'auth/network-request-failed': 'Ошибка сети. Проверьте подключение к интернету',
      'auth/internal-error': 'Внутренняя ошибка сервера. Попробуйте позже',
      'auth/timeout': 'Превышено время ожидания. Попробуйте снова',


      'auth/github-auth-failed': 'Ошибка авторизации GitHub',
      'auth/invalid-oauth-client-id': 'Неверный Client ID GitHub. Проверьте настройки в Firebase Console',
      'auth/invalid-oauth-provider': 'Неверная конфигурация GitHub провайдера',
      'auth/missing-oauth-client-secret': 'Отсутствует Client Secret GitHub. Добавьте его в Firebase Console',

      'default': 'Ошибка при входе через GitHub'
    }
  };

  const messages = errorMessages[action] || errorMessages.login;
  if (errorCode in messages) {
    return messages[errorCode as keyof typeof messages];
  }
  return messages.default;
};
