import type { PhysicalBookStockInfo } from "../../types";
import type { HttpActions } from "../httpActions";

class PhysicalBooksA {
    private httpActions: HttpActions;
    private startUrl: string;

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions;
        this.startUrl = 'physical-books';
    }

    public isPhysicalBookInStock = async (bookId: string): Promise<PhysicalBookStockInfo | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ physicalBookStockInfo: PhysicalBookStockInfo }>(
            `${this.startUrl}/book/${bookId}/in-stock`,
            config
        ).
            then(res => {
                return res.data.physicalBookStockInfo;
            }).
            catch((err: any) => {
                return err?.response?.data?.error || err?.message || 'Unknown error';
            });

        return resData;
    }
}

export { PhysicalBooksA };
