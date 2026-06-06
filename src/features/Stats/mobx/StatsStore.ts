import { flow, makeAutoObservable } from 'mobx';
import type { Api } from '../../../shared/api/api';
import { makeInitialAxiosSolt } from '../../../shared/helpers/apiSolt/makeInitialAxiosSolt';
import type { UserStats } from '../../../shared/types';

class StatsStore {
    public userStats: UserStats | null = null;
    public getUserStatsState = makeInitialAxiosSolt();

    private api: Api;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.getUserStats = this.getUserStats.bind(this);
    }

    public getUserStats = flow(function* (this: StatsStore)
        : Generator<Promise<UserStats | string>, void, UserStats | string> {
        this.getUserStatsState = { loading: true, error: null };

        try {
            const result = yield this.api.stats.getUserStats();

            if (typeof result === 'string') {
                this.getUserStatsState = { loading: false, error: result || 'Failed to get user stats' };
            } else {
                this.userStats = result;
                this.getUserStatsState = { loading: false, error: null };
            }
        } catch (err: any) {
            this.getUserStatsState = { loading: false, error: err?.message || 'Failed to get user stats' };
        }
    });
}

export { StatsStore };
