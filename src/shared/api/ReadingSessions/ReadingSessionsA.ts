import type { AxiosRequestConfig } from "axios"
import type { ReadingBookPreview, ReadingSession, ReadingSessionCreate } from "../../types"
import type { HttpActions } from "../httpActions"

class ReadingSessionsA {
    private httpActions: HttpActions
    private startUrl: string

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'reading-sessions'
    }

    public createReadingSession = async (readingSession: ReadingSessionCreate): Promise<{ resultId: string } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{ id: string }>(`${this.startUrl}`, readingSession, config).
            then(res => {
                return { resultId: res.data.id }
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public getReadingSessions = async (): Promise<ReadingSession[] | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ readingSessions: ReadingSession[] }>(`${this.startUrl}`, config).
            then(res => {
                return res.data.readingSessions
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public closeReadingSession = async (sessionId: string): Promise<ReadingSession | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.patch<{ readingSession: ReadingSession }>(`${this.startUrl}/${sessionId}`, {}, config).
            then(res => {
                return res.data.readingSession
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public getLastReadingBooks = async (limit?: number): Promise<ReadingBookPreview[] | string> => {
        const config = await this.configWithLimit(limit);

        const resData = this.httpActions.get<{ books: ReadingBookPreview[] }>(`${this.startUrl}/last-books`, config).
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

export { ReadingSessionsA }
