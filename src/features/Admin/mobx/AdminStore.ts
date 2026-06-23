import { flow, makeAutoObservable } from "mobx";
import type { Api } from "../../../shared/api/api";
import { makeInitialAxiosSolt } from "../../../shared/helpers/apiSolt/makeInitialAxiosSolt";
import type { AdminBookCreate, AdminBookCreateResult } from "../../../shared/types";

class AdminStore {
    public createdBook: AdminBookCreateResult | null = null;
    public createBookState = makeInitialAxiosSolt();

    private api: Api;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.createBook = this.createBook.bind(this);
        this.clearCreatedBook = this.clearCreatedBook.bind(this);
    }

    public createBook = flow(function* (this: AdminStore, book: AdminBookCreate)
        : Generator<Promise<AdminBookCreateResult | string>, AdminBookCreateResult | null, AdminBookCreateResult | string> {
        this.createBookState = { loading: true, error: null };
        this.createdBook = null;

        try {
            const result = yield this.api.admin.createBook(book);

            if (typeof result === 'string') {
                this.createBookState = { loading: false, error: result || 'Failed to create book' };
                return null;
            }

            this.createdBook = result;
            this.createBookState = { loading: false, error: null };
            return result;
        } catch (err: any) {
            this.createBookState = { loading: false, error: err?.message || 'Failed to create book' };
            return null;
        }
    });

    public clearCreatedBook() {
        this.createdBook = null;
        this.createBookState = makeInitialAxiosSolt();
    }
}

export { AdminStore };
