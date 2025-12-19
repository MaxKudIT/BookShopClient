import {createContext,  useContext, useState, type ReactNode} from 'react';
import type { FC } from 'react';





type FormType = 'login' | 'registration'


export const AuthContext = createContext<{
   isCurrentForm: FormType,
   setCurrentForm: (current: FormType) => void
}
>({
   isCurrentForm: 'login',
   setCurrentForm: () => {}
})




export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {

    const [isCurrentForm, setCurrentForm] = useState<FormType>('login')
  


    return (
        <AuthContext.Provider value={{isCurrentForm, setCurrentForm}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);