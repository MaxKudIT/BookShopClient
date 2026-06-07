import type { PageInfoT } from "../../types";
import type { HttpActions } from "../httpActions";

class BookPageA {
    private httpActions: HttpActions
    private startUrl: string


    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'books'
    }


    public getPageById = async (bookId: string, pageNumber: string): Promise<PageInfoT | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{Page: PageInfoT}>(`${this.startUrl}/${bookId}/pages/${pageNumber}`, config).
                        then(res => {
                            return res.data.Page
                        }).
                        catch((err: any) => {
                            return err?.response?.data?.error;
                        })
        return resData
        
    }


    public getPagesCount = async (bookId: string): Promise<number | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{PagesCount: number}>(`${this.startUrl}/${bookId}/pagesCount`, config).
                        then(res => {
                            return res.data.PagesCount
                        }).
                        catch((err: any) => {
                            return err?.response?.data?.error;
                        })
        return resData
        
    }


}

export {BookPageA}
