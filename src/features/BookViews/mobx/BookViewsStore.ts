import { flow, makeAutoObservable } from 'mobx';
import type { Api } from '../../../shared/api/api';
import { makeInitialAxiosSolt } from '../../../shared/helpers/apiSolt/makeInitialAxiosSolt';
import type { BookViewPreview } from '../../../shared/types';

class BookViewsStore {
    public bookViews: BookViewPreview[] = [];
    public getLastBookViewsState = makeInitialAxiosSolt();
    public saveOrUpdateBookViewState = makeInitialAxiosSolt();

    private api: Api;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.getLastBookViews = this.getLastBookViews.bind(this);
        this.saveOrUpdateBookView = this.saveOrUpdateBookView.bind(this);
    }

    public getLastBookViews = flow(function* (this: BookViewsStore, limit = 50)
        : Generator<Promise<BookViewPreview[] | string>, void, BookViewPreview[] | string> {
        this.getLastBookViewsState = { loading: true, error: null };

        try {
            const result = yield this.api.bookViews.getLastBookViews(limit);

            if (typeof result === 'string') {
                this.getLastBookViewsState = { loading: false, error: result || 'Failed to get book views' };
                return;
            }

            this.bookViews = result;
            this.getLastBookViewsState = { loading: false, error: null };
        } catch (err: any) {
            this.getLastBookViewsState = { loading: false, error: err?.message || 'Failed to get book views' };
        }
    });

    public saveOrUpdateBookView = flow(function* (this: BookViewsStore, bookId: string)
        : Generator<Promise<{ bookId: string } | string>, boolean, { bookId: string } | string> {
        this.saveOrUpdateBookViewState = { loading: true, error: null };

        try {
            const result = yield this.api.bookViews.saveOrUpdateBookView(bookId);

            if (typeof result === 'string') {
                this.saveOrUpdateBookViewState = { loading: false, error: result || 'Failed to save book view' };
                return false;
            }

            this.saveOrUpdateBookViewState = { loading: false, error: null };
            return true;
        } catch (err: any) {
            this.saveOrUpdateBookViewState = { loading: false, error: err?.message || 'Failed to save book view' };
            return false;
        }
    });
}

export { BookViewsStore };
