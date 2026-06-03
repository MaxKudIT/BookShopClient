import type { UserSubscription, UserSubscriptionStatus } from "../../types"
import type { HttpActions } from "../httpActions"

class UserSubA {
    private httpActions: HttpActions
    private startUrl: string

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'user-subscriptions'
    }

    public getAllSubscriptions = async (): Promise<UserSubscription[] | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ subscriptions: UserSubscription[] }>(`${this.startUrl}`, config).
            then(res => {
                return res.data.subscriptions
            }).
            catch((err: any) => {
                return err?.response?.data?.error;
            })
        return resData
    }

    public getSubscriptionStatus = async (): Promise<UserSubscriptionStatus | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ status: UserSubscriptionStatus }>(`${this.startUrl}/status`, config).
            then(res => {
                return res.data.status
            }).
            catch((err: any) => {
                return err?.response?.data?.error;
            })
        return resData
    }

    public createSubscription = async (planId: string): Promise<{ resultId: string } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{ id: string }>(`${this.startUrl}`, { planId }, config).
            then(res => {
                return { resultId: res.data.id }
            }).
            catch((err: any) => {
                return err?.response?.data?.error;
            })
        return resData
    }

    public getAllSubs = this.getAllSubscriptions

    public getStatusSub = this.getSubscriptionStatus

}

export { UserSubA }
