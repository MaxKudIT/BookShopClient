import { useCallback, useState } from "react"
import { api } from "../api/api"

type UsePostResult<Req, Res> = {
  error: string | null;
  loading: boolean;
  post: (body: Req, options?: { param?: string, idToken?: string }) => Promise<Res>;
};

export const usePost = <Req, Res>(path: string): UsePostResult<Req, Res> => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const post = useCallback(async (body: Req, options?: { idToken?: string }): Promise<Res> => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post<Res>(path, body, {
        headers: {
          ...api.defaults.headers.common,
          ...(options?.idToken && {
            'Authorization': `Bearer ${options.idToken}`
          }),
        }
      });
      const result = response.data;


      return result;

    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || 'Сервер не активен, немного подождите...';
      setError(errorMessage);
      throw err;

    } finally {
      setLoading(false);
    }
  }, [path]);

  return {
    error,
    loading,
    post,
  };
};


type UseGetResult<Res> = {
  error: string | null;
  loading: boolean;
  get: (options?: { param?: string, idToken?: string }) => Promise<Res>;
};

export const useGet = <Res>(path: string): UseGetResult<Res> => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const get = useCallback(async (options?: { param?: string, idToken?: string }): Promise<Res> => {
    try {
      setLoading(true);
      setError(null);




      const pathResult = options?.param ? path + '/' + options.param : path
      const response = await api.get<Res>(pathResult, {
        headers: {
          ...api.defaults.headers.common,
          ...(options?.idToken && {
            'Authorization': `Bearer ${options.idToken}`
          }),
        }
      });
      const result = response.data;


      return result;

    } catch (err: any) {

      const errorMessage = err?.response?.data?.error || 'Сервер не активен, немного подождите...';
      setError(errorMessage);
      throw err;

    } finally {
      setLoading(false);
    }
  }, [path]);

  return {
    error,
    loading,
    get,
  };
};


type UseDeleteResult<Res> = {
  error: string | null;
  loading: boolean;
  deleteI: (options?: { param?: string, idToken?: string }) => Promise<Res>;
};


export const useDelete = <Res>(path: string): UseDeleteResult<Res> => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteI = useCallback(async (options?: { param?: string, idToken?: string }): Promise<Res> => {
    try {
      setLoading(true);
      setError(null);




      const pathResult = options?.param ? path + '/' + options.param : path
      const response = await api.delete<Res>(pathResult, {
        headers: {
          ...api.defaults.headers.common,
          ...(options?.idToken && {
            'Authorization': `Bearer ${options.idToken}`
          }),
        }
      });
      const result = response.data;


      return result;

    } catch (err: any) {

      const errorMessage = err?.response?.data?.error || 'Сервер не активен, немного подождите...';
      setError(errorMessage);
      throw err;

    } finally {
      setLoading(false);
    }
  }, [path]);

  return {
    error,
    loading,
    deleteI,
  };
};