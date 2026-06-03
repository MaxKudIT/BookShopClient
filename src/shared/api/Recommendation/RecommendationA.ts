import type { AxiosRequestConfig } from "axios"
import type { BookPreviewT, RecommendationsPageT } from "../../types"
import type { HttpActions } from "../httpActions"

class RecommendationA {
    private httpActions: HttpActions
    private startUrl: string

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'recommendations'
    }

    public getHomeRecommendations = async (limit?: number): Promise<BookPreviewT[] | string> => {
        const config = await this.configWithLimit(limit);

        const resData = this.httpActions.get<{ books: BookPreviewT[] }>(`${this.startUrl}/home`, config).
            then(res => {
                return res.data.books
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public getCartRecommendations = async (limit?: number): Promise<BookPreviewT[] | string> => {
        const config = await this.configWithLimit(limit);

        const resData = this.httpActions.get<{ books: BookPreviewT[] }>(`${this.startUrl}/cart`, config).
            then(res => {
                return res.data.books
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public getRecommendationsPage = async (limit?: number): Promise<RecommendationsPageT | string> => {
        const config = await this.configWithLimit(limit);

        const resData = this.httpActions.get<RecommendationsPageT>(`${this.startUrl}/page`, config).
            then(res => {
                return res.data
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public getRecommendationsByBook = async (bookId: string, limit?: number): Promise<BookPreviewT[] | string> => {
        const config = await this.configWithLimit(limit);

        const resData = this.httpActions.get<{ books: BookPreviewT[] }>(`${this.startUrl}/books/${bookId}`, config).
            then(res => {
                return res.data.books
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    private configWithLimit = async (limit?: number): Promise<AxiosRequestConfig> => {
        const config = await this.httpActions.getAccessToken();

        if (limit === undefined) {
            return config
        }

        return {
            ...config,
            params: {
                ...config.params,
                limit,
            },
        }
    }
}

export { RecommendationA }
