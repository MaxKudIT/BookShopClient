import { flow, makeAutoObservable } from 'mobx';
import type { Api } from '../../../shared/api/api';
import { makeInitialAxiosSolt } from '../../../shared/helpers/apiSolt/makeInitialAxiosSolt';
import type { BookPreviewT, RecommendationsPageT } from '../../../shared/types';

class RecommendationStore {
    public homeRecommendations: BookPreviewT[] = [];
    public cartRecommendations: BookPreviewT[] = [];
    public bookRecommendations: BookPreviewT[] = [];
    public recommendationsPage: RecommendationsPageT | null = null;
    public getHomeRecommendationsState = makeInitialAxiosSolt();
    public getCartRecommendationsState = makeInitialAxiosSolt();
    public getRecommendationsByBookState = makeInitialAxiosSolt();
    public getRecommendationsPageState = makeInitialAxiosSolt();

    private api: Api;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.getHomeRecommendations = this.getHomeRecommendations.bind(this);
        this.getCartRecommendations = this.getCartRecommendations.bind(this);
        this.getRecommendationsByBook = this.getRecommendationsByBook.bind(this);
        this.getRecommendationsPage = this.getRecommendationsPage.bind(this);
    }

    public getHomeRecommendations = flow(function* (this: RecommendationStore, limit = 4)
        : Generator<Promise<BookPreviewT[] | string>, void, BookPreviewT[] | string> {
        this.getHomeRecommendationsState = { loading: true, error: null };

        try {
            const result = yield this.api.recommendations.getHomeRecommendations(limit);

            if (typeof result === 'string') {
                this.getHomeRecommendationsState = { loading: false, error: result || 'Failed to get recommendations' };
                return;
            }

            this.homeRecommendations = result;
            this.getHomeRecommendationsState = { loading: false, error: null };
        } catch (err: any) {
            this.getHomeRecommendationsState = { loading: false, error: err?.message || 'Failed to get recommendations' };
        }
    });

    public getCartRecommendations = flow(function* (this: RecommendationStore, limit = 10)
        : Generator<Promise<BookPreviewT[] | string>, void, BookPreviewT[] | string> {
        this.getCartRecommendationsState = { loading: true, error: null };

        try {
            const result = yield this.api.recommendations.getCartRecommendations(limit);

            if (typeof result === 'string') {
                this.getCartRecommendationsState = { loading: false, error: result || 'Failed to get cart recommendations' };
                return;
            }

            this.cartRecommendations = result;
            this.getCartRecommendationsState = { loading: false, error: null };
        } catch (err: any) {
            this.getCartRecommendationsState = { loading: false, error: err?.message || 'Failed to get cart recommendations' };
        }
    });

    public getRecommendationsPage = flow(function* (this: RecommendationStore, limit = 10)
        : Generator<Promise<RecommendationsPageT | string>, void, RecommendationsPageT | string> {
        this.getRecommendationsPageState = { loading: true, error: null };

        try {
            const result = yield this.api.recommendations.getRecommendationsPage(limit);

            if (typeof result === 'string') {
                this.getRecommendationsPageState = { loading: false, error: result || 'Failed to get recommendations page' };
                return;
            }

            this.recommendationsPage = result;
            this.getRecommendationsPageState = { loading: false, error: null };
        } catch (err: any) {
            this.getRecommendationsPageState = { loading: false, error: err?.message || 'Failed to get recommendations page' };
        }
    });

    public getRecommendationsByBook = flow(function* (this: RecommendationStore, bookId: string, limit = 10)
        : Generator<Promise<BookPreviewT[] | string>, void, BookPreviewT[] | string> {
        this.getRecommendationsByBookState = { loading: true, error: null };

        try {
            const result = yield this.api.recommendations.getRecommendationsByBook(bookId, limit);

            if (typeof result === 'string') {
                this.getRecommendationsByBookState = { loading: false, error: result || 'Failed to get book recommendations' };
                return;
            }

            this.bookRecommendations = result;
            this.getRecommendationsByBookState = { loading: false, error: null };
        } catch (err: any) {
            this.getRecommendationsByBookState = { loading: false, error: err?.message || 'Failed to get book recommendations' };
        }
    });
}

export { RecommendationStore };
