 export const validateLogin = (value: string) => {
    if (!value.trim()) return 'Логин обязателен';
    if (value.length < 3) return 'Минимум 3 символа';
    if (value.length > 20) return 'Максимум 20 символов';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Только латинские буквы, цифры и _';
    return '';
  };

  export const validateEmail = (value: string) => {
    if (!value.trim()) return 'Email обязателен';
    if (!/^\S+@\S+\.\S+$/.test(value)) return 'Некорректный email';
    return '';
  };

  export const validatePassword = (value: string) => {
    if (!value.trim()) return 'Пароль обязателен';
    if (value.length < 6) return 'Минимум 6 символов';
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(value)) return 'Должны быть буквы и цифры';
    return '';
  };