import type { UserStats } from "../../types"
import type { HttpActions } from "../httpActions"

class StatsA {
    private httpActions: HttpActions
    private startUrl: string

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'stats'
    }

    public getUserStats = async (): Promise<UserStats | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ stats: UserStats }>(`${this.startUrl}`, config).
            then(res => {
                return res.data.stats
            }).
            catch((err: any) => {
                return err?.response?.data?.error;
            })
        return resData
    }
}

export { StatsA }
