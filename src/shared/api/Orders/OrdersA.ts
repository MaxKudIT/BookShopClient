import type { OrderCreate } from "../../types"
import type { HttpActions } from "../httpActions"

class OrdersA {
    private httpActions: HttpActions
    private startUrl: string

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'orders'
    }

    public createOrder = async (order: OrderCreate): Promise<{ resultId: string } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{ id: string }>(`${this.startUrl}`, order, config).
            then(res => {
                return { resultId: res.data.id }
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }
}

export { OrdersA }
