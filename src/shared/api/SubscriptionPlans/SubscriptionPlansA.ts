import type { SubscriptionPlan } from "../../types";
import type { HttpActions } from "../httpActions";

class SubscriptionPlansA {
    private httpActions: HttpActions;
    private startUrl: string;

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions;
        this.startUrl = 'subscription-plans';
    }

    public getPlans = async (): Promise<SubscriptionPlan[] | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ subscriptionPlans: SubscriptionPlan[] }>(`${this.startUrl}`, config).
            then(res => {
                return res.data.subscriptionPlans;
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            });
        return resData;
    }

    public getPlanById = async (planId: string): Promise<SubscriptionPlan | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ subscriptionPlan: SubscriptionPlan }>(`${this.startUrl}/${planId}`, config).
            then(res => {
                return res.data.subscriptionPlan;
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            });
        return resData;
    }

    public getPlanByTitle = async (title: string): Promise<SubscriptionPlan | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ subscriptionPlan: SubscriptionPlan }>(
            `${this.startUrl}/title/${encodeURIComponent(title)}`,
            config
        ).
            then(res => {
                return res.data.subscriptionPlan;
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            });
        return resData;
    }
}

export { SubscriptionPlansA };
