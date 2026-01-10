import type { Api } from "../../../shared/api/api";
import { makeInitialAxiosSolt } from "../../../shared/helpers/apiSolt/makeInitialAxiosSolt";
import type { BookInfoT, ErrorResponse } from "../../../shared/types";
import { makeAutoObservable, flow } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
class BookInfoStore {
    public book: BookInfoT | null = null;
    public getBookState = makeInitialAxiosSolt();



    private api: Api;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.getBookById = this.getBookById.bind(this)

         makePersistable(this, {
            name: 'BookInfoStore',
            properties: ['book'], 
            storage: window.localStorage,
        });
    }

    public getBookById = flow(function* (this: BookInfoStore, bookId: string)
        : Generator<Promise<BookInfoT | ErrorResponse>, void, BookInfoT | ErrorResponse> {
        this.getBookState = { loading: true, error: null }
        try {
            const res = yield this.api.books.getBookById(bookId)
            if (typeof res === 'string') {
                this.getBookState = { loading: false, error: res }
            } else {
                
                this.book = res
                
                this.getBookState = { loading: false, error: null }
            }
           

        }
        catch (err: any) {
            this.getBookState = {loading: false, error: err}
            console.error(err)
        }
    })


}

export {BookInfoStore}