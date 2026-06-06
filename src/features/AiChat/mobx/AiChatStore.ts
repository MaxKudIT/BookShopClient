import { flow, makeAutoObservable } from 'mobx';
import type { Api } from '../../../shared/api/api';
import { makeInitialAxiosSolt } from '../../../shared/helpers/apiSolt/makeInitialAxiosSolt';
import type { AIMessage, AIMessageCreate } from '../../../shared/types';
import { auth } from '../../../shared/hooks/configs/firebase-config';

class AiChatStore {
    public currentChatId: string | null = null;
    public messages: AIMessage[] = [];

    public currentChatState = makeInitialAxiosSolt();
    public createChatState = makeInitialAxiosSolt();
    public getMessagesState = makeInitialAxiosSolt();
    public createMessageState = makeInitialAxiosSolt();
    public deleteMessagesState = makeInitialAxiosSolt();
    public askState = makeInitialAxiosSolt();

    private api: Api;
    private currentUserId: string | null = null;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.ensureChat = this.ensureChat.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.ask = this.ask.bind(this);
        this.deleteMessages = this.deleteMessages.bind(this);
        this.setCurrentChatId = this.setCurrentChatId.bind(this);
        this.syncChatOwner = this.syncChatOwner.bind(this);
    }

    private syncChatOwner() {
        const userId = auth.currentUser?.uid ?? null;

        if (this.currentUserId === userId) {
            return userId;
        }

        this.currentUserId = userId;
        this.currentChatId = null;
        this.messages = [];

        return userId;
    }

    private setCurrentChatId(chatId: string) {
        this.currentChatId = chatId;
    }

    public ensureChat = flow(function* (this: AiChatStore) {
        const userId = this.syncChatOwner();
        if (!userId) {
            this.createChatState = { loading: false, error: 'User is not authorized' };
            return null;
        }

        if (this.currentChatId) {
            return this.currentChatId;
        }

        this.currentChatState = { loading: true, error: null };

        try {
            const currentChat = yield this.api.aiChats.currentChat();

            if (typeof currentChat !== 'string') {
                this.setCurrentChatId(currentChat.id);
                this.currentChatState = { loading: false, error: null };
                this.createChatState = { loading: false, error: null };
                return currentChat.id;
            }

            this.currentChatState = { loading: false, error: currentChat };
            if (currentChat !== 'ai chat not found') {
                this.createChatState = { loading: false, error: currentChat };
                return null;
            }

            this.createChatState = { loading: true, error: null };
            const result = yield this.api.aiChats.createChat({ title: 'BookShop AI' });

            if (typeof result === 'string') {
                this.createChatState = { loading: false, error: result };
                return null;
            }

            this.setCurrentChatId(result.resultId);
            this.createChatState = { loading: false, error: null };
            this.currentChatState = { loading: false, error: null };
            return result.resultId;
        } catch (err: any) {
            const error = err?.message || 'Failed to get current chat';
            this.currentChatState = { loading: false, error };
            this.createChatState = { loading: false, error };
            return null;
        }
    });

    public getMessages = flow(function* (this: AiChatStore) {
        this.syncChatOwner();
        this.getMessagesState = { loading: true, error: null };

        try {
            const chatId = this.currentChatId || (yield this.ensureChat());
            if (!chatId || typeof chatId !== 'string') {
                this.getMessagesState = { loading: false, error: this.createChatState.error };
                return;
            }

            const result = yield this.api.aiChats.getMessages(chatId);

            if (typeof result === 'string') {
                this.getMessagesState = { loading: false, error: result };
            } else {
                this.messages = result;
                this.getMessagesState = { loading: false, error: null };
            }
        } catch (err: any) {
            this.getMessagesState = { loading: false, error: err?.message || 'Failed to get messages' };
        }
    });

    public createMessage = flow(function* (this: AiChatStore, message: AIMessageCreate) {
        this.syncChatOwner();
        this.createMessageState = { loading: true, error: null };

        try {
            const chatId = this.currentChatId || (yield this.ensureChat());
            if (!chatId || typeof chatId !== 'string') {
                this.createMessageState = { loading: false, error: this.createChatState.error };
                return null;
            }

            const result = yield this.api.aiChats.createMessage(chatId, message);

            if (typeof result === 'string') {
                this.createMessageState = { loading: false, error: result };
                return null;
            }

            const createdMessage: AIMessage = {
                Id: result.resultId,
                UserId: '',
                ChatId: chatId,
                Role: message.role,
                Content: message.content,
                CreatedAt: new Date().toISOString(),
            };

            this.messages = [...this.messages, createdMessage];
            this.createMessageState = { loading: false, error: null };
            return result.resultId;
        } catch (err: any) {
            this.createMessageState = { loading: false, error: err?.message || 'Failed to create message' };
            return null;
        }
    });

    public ask = flow(function* (this: AiChatStore, question: string) {
        this.syncChatOwner();
        const trimmedQuestion = question.trim();
        if (!trimmedQuestion) {
            return null;
        }

        this.askState = { loading: true, error: null };
        let tempUserMessageId: string | null = null;

        try {
            const chatId = this.currentChatId || (yield this.ensureChat());
            if (!chatId || typeof chatId !== 'string') {
                this.askState = { loading: false, error: this.createChatState.error };
                return null;
            }

            tempUserMessageId = `temp-${Date.now()}`;
            const createdAt = new Date().toISOString();
            const optimisticUserMessage: AIMessage = {
                Id: tempUserMessageId,
                UserId: '',
                ChatId: chatId,
                Role: 'user',
                Content: trimmedQuestion,
                CreatedAt: createdAt,
            };

            this.messages = [...this.messages, optimisticUserMessage];

            const result = yield this.api.aiChats.ask(chatId, trimmedQuestion);

            if (typeof result === 'string') {
                this.messages = this.messages.filter(message => message.Id !== tempUserMessageId);
                this.askState = { loading: false, error: result };
                return null;
            }

            const userMessage: AIMessage = {
                Id: result.userMessageId,
                UserId: '',
                ChatId: chatId,
                Role: 'user',
                Content: trimmedQuestion,
                CreatedAt: createdAt,
            };
            const assistantMessage: AIMessage = {
                Id: result.assistantMessageId,
                UserId: '',
                ChatId: chatId,
                Role: 'assistant',
                Content: result.answer,
                CreatedAt: createdAt,
            };

            this.messages = [
                ...this.messages.filter(message => message.Id !== tempUserMessageId),
                userMessage,
                assistantMessage,
            ];
            this.askState = { loading: false, error: null };
            return result;
        } catch (err: any) {
            if (tempUserMessageId) {
                this.messages = this.messages.filter(message => message.Id !== tempUserMessageId);
            }
            this.askState = { loading: false, error: err?.message || 'Failed to ask AI' };
            return null;
        }
    });

    public deleteMessages = flow(function* (this: AiChatStore) {
        this.syncChatOwner();
        this.deleteMessagesState = { loading: true, error: null };

        try {
            const chatId = this.currentChatId || (yield this.ensureChat());
            if (!chatId || typeof chatId !== 'string') {
                this.deleteMessagesState = { loading: false, error: this.createChatState.error };
                return;
            }

            const result = yield this.api.aiChats.deleteMessages(chatId);

            if (typeof result === 'string') {
                this.deleteMessagesState = { loading: false, error: result };
            } else {
                this.messages = [];
                this.deleteMessagesState = { loading: false, error: null };
            }
        } catch (err: any) {
            this.deleteMessagesState = { loading: false, error: err?.message || 'Failed to delete messages' };
        }
    });
}

export { AiChatStore };
