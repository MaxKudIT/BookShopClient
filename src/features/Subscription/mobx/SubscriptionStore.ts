import { flow, makeAutoObservable } from 'mobx';
import type { Api } from '../../../shared/api/api';
import { makeInitialAxiosSolt } from '../../../shared/helpers/apiSolt/makeInitialAxiosSolt';
import type { SubscriptionPlan, UserSubscriptionStatus } from '../../../shared/types';

class SubscriptionStore {
    public plans: SubscriptionPlan[] = [];
    public status: UserSubscriptionStatus | null = null;
    public activePlan: SubscriptionPlan | null = null;
    public selectedPlanId: string | null = null;

    public getPlansState = makeInitialAxiosSolt();
    public getStatusState = makeInitialAxiosSolt();
    public buyPlanState = makeInitialAxiosSolt();

    private api: Api;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.getPlans = this.getPlans.bind(this);
        this.getStatus = this.getStatus.bind(this);
        this.buyPlan = this.buyPlan.bind(this);
    }

    private setActivePlanByStatus() {
        const planId = this.status?.Subscription?.PlanId;
        this.activePlan = planId
            ? this.plans.find((plan) => plan.Id === planId) ?? null
            : null;
    }

    public getPlans = flow(function* (this: SubscriptionStore) {
        this.getPlansState = { loading: true, error: null };

        try {
            const result = yield this.api.subscriptionPlans.getPlans();

            if (typeof result === 'string') {
                this.getPlansState = { loading: false, error: result || 'Failed to get subscription plans' };
            } else {
                this.plans = [...result].sort((first, second) => first.DurationDays - second.DurationDays);
                this.setActivePlanByStatus();
                this.getPlansState = { loading: false, error: null };
            }
        } catch (err: any) {
            this.getPlansState = { loading: false, error: err?.message || 'Failed to get subscription plans' };
        }
    });

    public getStatus = flow(function* (this: SubscriptionStore) {
        this.getStatusState = { loading: true, error: null };

        try {
            const result = yield this.api.userSubscriptions.getSubscriptionStatus();

            if (typeof result === 'string') {
                this.status = null;
                this.activePlan = null;
                this.getStatusState = { loading: false, error: result || 'Failed to get subscription status' };
                return;
            }

            this.status = result;
            this.setActivePlanByStatus();

            const planId = result.Subscription?.PlanId;
            if (result.IsActive && planId && !this.activePlan) {
                const plan = yield this.api.subscriptionPlans.getPlanById(planId);

                if (typeof plan === 'string') {
                    this.getStatusState = { loading: false, error: plan || 'Failed to get active plan' };
                    return;
                }

                this.activePlan = plan;
            }

            this.getStatusState = { loading: false, error: null };
        } catch (err: any) {
            this.status = null;
            this.activePlan = null;
            this.getStatusState = { loading: false, error: err?.message || 'Failed to get subscription status' };
        }
    });

    public buyPlan = flow(function* (this: SubscriptionStore, planId: string) {
        this.selectedPlanId = planId;
        this.buyPlanState = { loading: true, error: null };

        try {
            // TODO: здесь позже вызвать сервис оплаты. После успешной оплаты оставляем создание подписки.
            const result = yield this.api.userSubscriptions.createSubscription(planId);

            if (typeof result === 'string') {
                this.buyPlanState = { loading: false, error: result || 'Failed to buy subscription' };
                return false;
            }

            yield this.getStatus();
            this.buyPlanState = { loading: false, error: null };
            return true;
        } catch (err: any) {
            this.buyPlanState = { loading: false, error: err?.message || 'Failed to buy subscription' };
            return false;
        } finally {
            this.selectedPlanId = null;
        }
    });
}

export { SubscriptionStore };
