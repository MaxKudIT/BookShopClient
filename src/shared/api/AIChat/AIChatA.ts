import type { AIAskResponse, AIChatCreate, AIChatCurrent, AIMessage, AIMessageCreate } from "../../types"
import type { HttpActions } from "../httpActions"

class AIChatA {
    private httpActions: HttpActions
    private startUrl: string

    constructor(httpActions: HttpActions) {
        this.httpActions = httpActions
        this.startUrl = 'ai-chats'
    }

    public createChat = async (chat: AIChatCreate): Promise<{ resultId: string } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{ id: string }>(`${this.startUrl}`, chat, config).
            then(res => {
                return { resultId: res.data.id }
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public currentChat = async (): Promise<AIChatCurrent | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<AIChatCurrent>(`${this.startUrl}/current`, config).
            then(res => {
                return res.data
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public createMessage = async (chatId: string, message: AIMessageCreate): Promise<{ resultId: string } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<{ id: string }>(`${this.startUrl}/${chatId}/messages`, message, config).
            then(res => {
                return { resultId: res.data.id }
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public getMessages = async (chatId: string): Promise<AIMessage[] | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.get<{ messages: AIMessage[] }>(`${this.startUrl}/${chatId}/messages`, config).
            then(res => {
                return res.data.messages
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public deleteMessages = async (chatId: string): Promise<{ status: string } | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.deleteWithoutParams<{ status: string }>(`${this.startUrl}/${chatId}/messages`, config).
            then(res => {
                return res.data
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }

    public ask = async (chatId: string, question: string): Promise<AIAskResponse | string> => {
        const config = await this.httpActions.getAccessToken();

        const resData = this.httpActions.post<AIAskResponse>(`${this.startUrl}/${chatId}/ask`, { question }, config).
            then(res => {
                return res.data
            }).
            catch((err: any) => {
                return err?.response?.data?.error || 'Unknown error';
            })
        return resData
    }
}

export { AIChatA }
