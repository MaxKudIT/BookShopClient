import type { BookPreviewT, BookSearchParams } from "../../types";
import type { HttpActions } from "../httpActions";

class BooksA {
    private httpActions: HttpActions;
    private startUrl: string;

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions;
        this.startUrl = 'books';
    }

    public getMyBooks = async (): Promise<BookPreviewT[] | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ Books: BookPreviewT[] }>(`${this.startUrl}/my`, config).
            then(res => {
                return res.data.Books;
            }).
            catch((err: any) => {
                return err?.response?.data?.error || err?.message || 'Unknown error';
            });

        return resData;
    }

    public getNotMyBooks = async (): Promise<BookPreviewT[] | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ Books: BookPreviewT[] }>(`${this.startUrl}/notmy`, config).
            then(res => {
                return res.data.Books;
            }).
            catch((err: any) => {
                return err?.response?.data?.error || err?.message || 'Unknown error';
            });

        return resData;
    }

    public getAllBooks = async (): Promise<BookPreviewT[] | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ Books: BookPreviewT[] }>(`${this.startUrl}/all`, config).
            then(res => {
                return res.data.Books;
            }).
            catch((err: any) => {
                return err?.response?.data?.error || err?.message || 'Unknown error';
            });

        return resData;
    }

    public searchBooks = async (params: BookSearchParams): Promise<BookPreviewT[] | string> => {
        const config = await this.httpActions.getAccessToken();
        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
        );

        const resData = this.httpActions.get<{ Books: BookPreviewT[] }>(`${this.startUrl}/search`, {
            ...config,
            params: cleanParams
        }).
            then(res => {
                return res.data.Books;
            }).
            catch((err: any) => {
                return err?.response?.data?.error || err?.message || 'Unknown error';
            });

        return resData;
    }
}

export { BooksA };
