import type { AdminBookCreate, AdminBookCreateResult } from "../../types";
import type { HttpActions } from "../httpActions";

class AdminA {
    private httpActions: HttpActions;
    private startUrl: string;

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions;
        this.startUrl = 'admin';
    }

    public createBook = async (book: AdminBookCreate): Promise<AdminBookCreateResult | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<AdminBookCreateResult>(`${this.startUrl}/books`, book, config)
            .then(res => res.data)
            .catch((err: any) => {
                return err?.response?.data?.error || err?.message || 'Unknown error';
            });

        return resData;
    };
}

export { AdminA };
