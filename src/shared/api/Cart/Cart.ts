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

        const resData = this.httpActions.get<{ cartItems: CartItemsPreview[] }>(`${this.startUrl}/all`, config).
            then(res => {
                return res.data.cartItems
            }).
            catch((err: any) => {
                return err?.response?.data?.error;
            })
        return resData

    }



    public isInCartItem = async (physicalBookId: string): Promise<{ isInCart: boolean } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{ isInCart: boolean }>(`${this.startUrl}/incart`, { physicalBookId }, config).
            then(res => {
                return res.data
            }).
            catch((err: any) => {
                return err?.response?.data?.error;
            })
        return resData
    }


     public areAllInCart = async (physicalBookIds: string[]): Promise<{ areAllInCart: boolean } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{ areAllInCart: boolean }>(`${this.startUrl}/allincart`, { physicalBookIds }, config).
            then(res => {
                return res.data
            }).
            catch((err: any) => {
                return err?.response?.data?.error;
            })
        return resData
    }


    public countCart = async (): Promise<{ count: number } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ count: number }>(`${this.startUrl}/count`, config).
            then(res => {
                return res.data
            }).
            catch((err: any) => {
                return err?.response?.data?.error;
            })
        return resData
    }


    public createCartItem = async (physicalBookId: string): Promise<{ resultId: string } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{ id: string }>(`${this.startUrl}`, { physicalBookId }, config).
            then(res => {
                return { resultId: res.data.id }
            }).
            catch((err: any) => {
                return err?.response?.data?.error;
            })
        return resData
    }

    public deleteCartItem = async (physicalBookIds: string[]): Promise<string | void> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.delete(`${this.startUrl}`, physicalBookIds, config).
            then(() => {
                console.log('Success deleting!')
            }).
            catch((err: any) => {
                return err?.response?.data?.error;
            })
        return resData
    }




}

export { CartA }
