import { flow, makeAutoObservable } from 'mobx';
import type { Api } from '../../../shared/api/api';
import { makeInitialAxiosSolt } from '../../../shared/helpers/apiSolt/makeInitialAxiosSolt';
import type { BookPreviewT, BookSearchParams } from '../../../shared/types';

class BookSearchStore {
    public books: BookPreviewT[] = [];
    public getAllBooksState = makeInitialAxiosSolt();
    public searchBooksState = makeInitialAxiosSolt();

    private api: Api;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.getAllBooks = this.getAllBooks.bind(this);
        this.searchBooks = this.searchBooks.bind(this);
        this.clear = this.clear.bind(this);
    }

    public getAllBooks = flow(function* (this: BookSearchStore) {
        this.getAllBooksState = { loading: true, error: null };

        try {
            const result = yield this.api.myBooks.getAllBooks();

            if (typeof result === 'string') {
                this.getAllBooksState = { loading: false, error: result || 'Failed to get books' };
                return;
            }

            this.books = result;
            this.getAllBooksState = { loading: false, error: null };
        } catch (err: any) {
            this.getAllBooksState = { loading: false, error: err?.message || 'Failed to get books' };
        }
    });

    public searchBooks = flow(function* (this: BookSearchStore, params: BookSearchParams) {
        this.searchBooksState = { loading: true, error: null };

        try {
            const result = yield this.api.myBooks.searchBooks(params);

            if (typeof result === 'string') {
                this.searchBooksState = { loading: false, error: result || 'Failed to search books' };
                return;
            }

            this.books = result;
            this.searchBooksState = { loading: false, error: null };
        } catch (err: any) {
            this.searchBooksState = { loading: false, error: err?.message || 'Failed to search books' };
        }
    });

    public clear() {
        this.books = [];
        this.getAllBooksState = makeInitialAxiosSolt();
        this.searchBooksState = makeInitialAxiosSolt();
    }
}

export { BookSearchStore };
