import type { OrderItem, OrderItemCreate } from "../../types"
import type { HttpActions } from "../httpActions"

class OrderItemsA {
    private httpActions: HttpActions
    private startUrl: string

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'orders'
    }

    public createOrderItem = async (orderId: string, orderItem: OrderItemCreate): Promise<{ status: string } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{ status: string }>(`${this.startUrl}/${orderId}/items`, orderItem, config).
            then(res => {
                return res.data
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public getOrderItems = async (orderId: string): Promise<OrderItem[] | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ orderItems: OrderItem[] }>(`${this.startUrl}/${orderId}/items`, config).
            then(res => {
                return res.data.orderItems
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }
}

export { OrderItemsA }
