import type { ErrorResponse } from "react-router-dom";
import type { BookInfoT } from "../../types";
import type { HttpActions } from "../httpActions";
import Book from '../../components/BookPreview/BookPreview';

class BookInfoA {
    private httpActions: HttpActions
    private startUrl: string


    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'books'
    }


    public getBookById = async (bookId: string): Promise<BookInfoT | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{book: BookInfoT}>(`${this.startUrl}/${bookId}`, config).
                        then(res => {
                            return res.data.book
                        }).
                        catch((err: any) => {
                            return err?.response?.data?.error;
                        })
        return resData
    }


}

export {BookInfoA}