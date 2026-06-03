import type { FinishReadingDTO, ReadingState, StartReadingDTO, UpdateReadingProgressDTO } from "../../types"
import type { HttpActions } from "../httpActions"

class ReadingA {
    private httpActions: HttpActions
    private startUrl: string

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'reading'
    }

    public startReading = async (bookId: string): Promise<ReadingState | string> => {
        const config = await this.httpActions.getAccessToken();
        const data: StartReadingDTO = { bookId };

        const resData = this.httpActions.post<{ reading: ReadingState }>(`${this.startUrl}/start`, data, config).
            then(res => {
                return res.data.reading
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public updateProgress = async (bookId: string, currentPage: number): Promise<ReadingState | string> => {
        const config = await this.httpActions.getAccessToken();
        const data: UpdateReadingProgressDTO = { bookId, currentPage };

        const resData = this.httpActions.patch<{ reading: ReadingState }>(`${this.startUrl}/progress`, data, config).
            then(res => {
                return res.data.reading
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public finishReading = async (sessionId: string, currentPage: number): Promise<ReadingState | string> => {
        const config = await this.httpActions.getAccessToken();
        const data: FinishReadingDTO = { sessionId, currentPage };

        const resData = this.httpActions.post<{ reading: ReadingState }>(`${this.startUrl}/finish`, data, config).
            then(res => {
                return res.data.reading
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }
}

export { ReadingA }
