import { flow, makeAutoObservable } from 'mobx';
import type { Api } from '../../../shared/api/api';
import { makeInitialAxiosSolt } from '../../../shared/helpers/apiSolt/makeInitialAxiosSolt';

class BookRevsStore {
    public createBookReviewState = makeInitialAxiosSolt();

    private api: Api;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.createBookReview = this.createBookReview.bind(this);
    }

    public createBookReview = flow(function* (this: BookRevsStore, bookId: string, rating: number)
        : Generator<Promise<{ resultId: string } | string>, boolean, { resultId: string } | string> {
        this.createBookReviewState = { loading: true, error: null };

        try {
            const result = yield this.api.bookRevs.createBookReview({ bookId, rating });

            if (typeof result === 'string') {
                this.createBookReviewState = { loading: false, error: result };
                return false;
            }

            this.createBookReviewState = { loading: false, error: null };
            return true;
        } catch (err: any) {
            this.createBookReviewState = { loading: false, error: err?.message || 'Failed to create book review' };
            return false;
        }
    });
}

export { BookRevsStore };
