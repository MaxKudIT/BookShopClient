import type { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import { getAuth } from "firebase/auth"
import { api } from "./api";

class HttpActions {


    public get = async <T>(url: string, config: AxiosRequestConfig): AxiosPromise<T> => {
        return api.get(url, config)
    }


    public getAccessToken = async (): Promise<AxiosRequestConfig> => {
         const auth = getAuth();
         const token = await auth.currentUser?.getIdToken();
         
         const configAddToken: AxiosRequestConfig = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
         }
         return configAddToken;
         
    }
}

export {HttpActions}