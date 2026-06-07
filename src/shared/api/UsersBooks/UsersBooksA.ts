import type { HttpActions } from "../httpActions";

class UsersBooksA {
    private httpActions: HttpActions;
    private startUrl: string;

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions;
        this.startUrl = 'ub';
    }

    public buyBooks = async (bookIds: string[]): Promise<string[] | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{ 'Ids:': string[] }>(
            `${this.startUrl}/buy`,
            { BookIds: bookIds },
            config
        ).
            then(res => {
                return res.data['Ids:'];
            }).
            catch((err: any) => {
                return err?.response?.data?.error || err?.message || 'Unknown error';
            });

        return resData;
    }
}

export { UsersBooksA };
