import { flow, makeAutoObservable } from 'mobx';
import type { Api } from '../../../shared/api/api';
import { makeInitialAxiosSolt } from '../../../shared/helpers/apiSolt/makeInitialAxiosSolt';
import type { BookPreviewT } from '../../../shared/types';

class MyBooksStore {
    public books: BookPreviewT[] = [];
    public getMyBooksState = makeInitialAxiosSolt();

    public notmybooks: BookPreviewT[] = []
    public getNotMyBooksState = makeInitialAxiosSolt()

    private api: Api;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.getNotMyBooks = this.getNotMyBooks.bind(this)
        this.getMyBooks = this.getMyBooks.bind(this);
        this.clear = this.clear.bind(this);
    }

    public getMyBooks = flow(function* (this: MyBooksStore) {
        this.getMyBooksState = { loading: true, error: null };

        try {
            const result = yield this.api.myBooks.getMyBooks();

            if (typeof result === 'string') {
                this.getMyBooksState = { loading: false, error: result || 'Failed to get my books' };
                return;
            }

            this.books = result;
            this.getMyBooksState = { loading: false, error: null };
        } catch (err: any) {
            this.getMyBooksState = { loading: false, error: err?.message || 'Failed to get my books' };
        }
    });

    public getNotMyBooks = flow(function* (this: MyBooksStore) {
        this.getNotMyBooksState = { loading: true, error: null };

        try {
            const result = yield this.api.myBooks.getNotMyBooks();

            if (typeof result === 'string') {
                this.getNotMyBooksState = { loading: false, error: result || 'Failed to get not my books' };
                return;
            }

            this.notmybooks = result;
            this.getNotMyBooksState = { loading: false, error: null };
        } catch (err: any) {
            this.getNotMyBooksState = { loading: false, error: err?.message || 'Failed to get not my books' };
        }
    });


    public clear() {
        this.books = [];
        this.notmybooks = [];
        this.getMyBooksState = makeInitialAxiosSolt();
        this.getNotMyBooksState = makeInitialAxiosSolt();
    }
}

export { MyBooksStore };
