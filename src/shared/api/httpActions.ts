import type { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import { getAuth } from "firebase/auth"
import { api } from "./api";

class HttpActions {


    public get = async <T>(url: string, config: AxiosRequestConfig): AxiosPromise<T> => {
        return api.get(url, config)
    }


    public post = async <T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): AxiosPromise<T> => {
        return api.post(url, data, config);
    };

    public patch = async <T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): AxiosPromise<T> => {
        return api.patch(url, data, config);
    };


    public delete = async <T>(
        url: string,
        ids: string[],
        config?: AxiosRequestConfig
    ): AxiosPromise<T> => {
        if (!ids || ids.length === 0) {
        
            return Promise.resolve({
                data: null as T,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {}
            }) as AxiosPromise<T>;
        }
        return api.delete(url, {
            ...config,
            params: {
                ...config?.params,
                id: ids
            },
            paramsSerializer: {
                indexes: null
            }
        });
    };


    public getAccessToken = async (): Promise<AxiosRequestConfig> => {
        const auth = getAuth();

        await auth.authStateReady();

        const user = auth.currentUser;
        if (!user) {

            throw new Error('User not authenticated');
        }

        const token = await auth.currentUser?.getIdToken();

        const configAddToken: AxiosRequestConfig = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return configAddToken;

    }
}

export { HttpActions }
