import type { BookReview, BookReviewCreate } from "../../types"
import type { HttpActions } from "../httpActions"

class BookRevsA {
    private httpActions: HttpActions
    private startUrl: string

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'book-revs'
    }

    public createBookReview = async (bookReview: BookReviewCreate): Promise<{ resultId: string } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{ id: string }>(`${this.startUrl}`, bookReview, config).
            then(res => {
                return { resultId: res.data.id }
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public getBookReviews = async (): Promise<BookReview[] | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ bookReviews: BookReview[] }>(`${this.startUrl}`, config).
            then(res => {
                return res.data.bookReviews
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }
}

export { BookRevsA }
