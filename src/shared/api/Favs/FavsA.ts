import type { CartItemsPreview, FavItemsPreview } from "../../types"
import type { HttpActions } from "../httpActions"


class FavsA {
    private httpActions: HttpActions
    private startUrl: string


    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'fi'
    }




    public getFavItems = async (): Promise<FavItemsPreview[] | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{favItems: FavItemsPreview[]}>(`${this.startUrl}/all`, config).
                        then(res => {
                            return res.data.favItems
                        }).
                        catch((err: any) => {
                            return err?.response?.data?.error;
                        })
        return resData
        
    }



    public isInFavsItem = async (bookId: string): Promise<{isInFavs: boolean} | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{isInCart: boolean}>(`${this.startUrl}/infavs`, {BookId: bookId}, config).
                        then(res => {
                            return res.data
                        }).
                        catch((err: any) => {
                            return err?.response?.data?.error;
                        })
        return resData
    }

    public createFavItem = async (bookId: string): Promise<{resultId: string} | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{id: string}>(`${this.startUrl}`, {BookId: bookId}, config).
                        then(res => {
                            return {resultId: res.data.id}
                        }).
                        catch((err: any) => {
                            return err?.response?.data?.error;
                        })
        return resData
    }

    public deleteFavItem = async (bookIds: string[]): Promise<string | void> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.delete(`${this.startUrl}`, bookIds, config).
                        then(res => {
                            console.log('Success deleting!')
                        }).
                        catch((err: any) => {
                            return err?.response?.data?.error;
                        })
        return resData
    }




}

export {FavsA}