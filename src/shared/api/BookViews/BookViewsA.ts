import type { AxiosRequestConfig } from "axios"
import type { BookViewPreview } from "../../types"
import type { HttpActions } from "../httpActions"

class BookViewsA {
    private httpActions: HttpActions
    private startUrl: string

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'book-views'
    }

    public saveOrUpdateBookView = async (bookId: string): Promise<{ bookId: string } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{ bookId: string }>(`${this.startUrl}/${bookId}`, undefined, config).
            then(res => {
                return res.data
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public getLastBookViews = async (limit?: number): Promise<BookViewPreview[] | string> => {
        const config = await this.configWithLimit(limit);

        const resData = this.httpActions.get<{ books: BookViewPreview[] }>(`${this.startUrl}`, config).
            then(res => {
                return res.data.books
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    private configWithLimit = async (limit?: number): Promise<AxiosRequestConfig> => {
        const config = await this.httpActions.getAccessToken();

        if (limit === undefined) {
            return config
        }

        return {
            ...config,
            params: {
                ...config.params,
                limit,
            },
        }
    }
}

export { BookViewsA }
