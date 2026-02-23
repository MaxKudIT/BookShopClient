import type { CartItemsPreview } from "../../types"
import type { HttpActions } from "../httpActions"


class CartA {
    private httpActions: HttpActions
    private startUrl: string


    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'ci'
    }




    public getCartItems = async (): Promise<CartItemsPreview[] | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{cartItems: CartItemsPreview[]}>(`${this.startUrl}/all`, config).
                        then(res => {
                            return res.data.cartItems
                        }).
                        catch((err: any) => {
                            return err?.response?.data?.error;
                        })
        return resData
        
    }



    public isInCartItem = async (bookId: string): Promise<{isInCart: boolean} | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{isInCart: boolean}>(`${this.startUrl}/incart`, {BookId: bookId}, config).
                        then(res => {
                            return res.data
                        }).
                        catch((err: any) => {
                            return err?.response?.data?.error;
                        })
        return resData
    }

    public createCartItem = async (bookId: string): Promise<{resultId: string} | string> => {
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

    public deleteCartItem = async (bookIds: string[]): Promise<string | void> => {
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

export {CartA}