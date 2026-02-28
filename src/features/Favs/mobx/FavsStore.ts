import type { Api } from "../../../shared/api/api";
import { makeInitialAxiosSolt } from "../../../shared/helpers/apiSolt/makeInitialAxiosSolt";
import type { BookInfoT, CartItemsPreview, ErrorResponse, PageInfoT } from "../../../shared/types";
import { makeAutoObservable, flow } from 'mobx';


class FavItemStore {



    public favItemsPreview: CartItemsPreview[] | null = null;

    public getFavItemsState = makeInitialAxiosSolt();

    public postFavItemsState = makeInitialAxiosSolt();

    public deleteFavItemsState = makeInitialAxiosSolt();


    public isInFavsItems: boolean = false;
    public postFavItemsState2 = makeInitialAxiosSolt(); //isInCart

    public count: number = 0;
    public countFavState = makeInitialAxiosSolt();

    private api: Api;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.getFavItems = this.getFavItems.bind(this)
        this.createFavItem = this.createFavItem.bind(this)
        this.deleteFavItems = this.deleteFavItems.bind(this)
        this.isInFavsItem = this.isInFavsItem.bind(this)
        this.getCountFav = this.getCountFav.bind(this)
    }




    public getFavItems = flow(function* (this: FavItemStore)
        : Generator<Promise<CartItemsPreview[] | string>, void, CartItemsPreview[] | string> {

        this.getFavItemsState = { loading: true, error: null };

        try {
           
            const res = yield this.api.favs.getFavItems();

            if (typeof res === 'string') {
                this.getFavItemsState = { loading: false, error: res };
            } else {
                this.favItemsPreview = res;
                this.getFavItemsState = { loading: false, error: null };
            }
        } catch (err: any) {
            this.getFavItemsState = { loading: false, error: err?.message || 'Unknown error' };
            console.error('Failed to get fav items:', err);
        }
    });

 
     public isInFavsItem = flow(function* (this: FavItemStore, bookId: string)
        : Generator<Promise<string | {isInFavs: boolean}>, void, string | {isInFavs: boolean}> {

        this.postFavItemsState2 = { loading: true, error: null };

        try {
         
            const result = yield this.api.favs.isInFavsItem(bookId);

            if (typeof result === 'string') {
                this.postFavItemsState2 = { loading: false, error: result };
            } else {
                this.isInFavsItems = result.isInFavs
                this.postFavItemsState2 = { loading: false, error: null };
              
            }
        } catch (err: any) {
            this.postFavItemsState2 = { loading: false, error: err?.message || 'Failed to create' };
            console.error('Create error:', err);
         
        }
    });


    
     public getCountFav = flow(function* (this: FavItemStore)
        : Generator<Promise<string | {count: number}>, void, string | {count: number}> {

        this.countFavState = { loading: true, error: null };

        try {
         
            const result = yield this.api.favs.countFavs();

            if (typeof result === 'string') {
                this.countFavState = { loading: false, error: result };
            } else {
                this.count = result.count
                this.countFavState = { loading: false, error: null };
              
            }
        } catch (err: any) {
            this.countFavState = { loading: false, error: err?.message || 'Failed to create' };
            console.error('Create error:', err);
         
        }
    });



    public createFavItem = flow(function* (this: FavItemStore, bookId: string)
        : Generator<Promise<string | {resultId: string}>, void, string | {resultId: string}> {

        this.postFavItemsState = { loading: true, error: null };

        try {
         
            const result = yield this.api.favs.createFavItem(bookId);

            if (typeof result === 'string') {
                this.postFavItemsState = { loading: false, error: result };
            } else {
                
                this.postFavItemsState = { loading: false, error: null };
              
            }
        } catch (err: any) {
            this.postFavItemsState = { loading: false, error: err?.message || 'Failed to create' };
            console.error('Create error:', err);
         
        }
    });


    public deleteFavItems = flow(function* (this: FavItemStore, bookIds: string[])
        : Generator<Promise<string | void>, void, string | void> {

        this.deleteFavItemsState = { loading: true, error: null };

        try {
            
            const result = yield this.api.favs.deleteFavItem(bookIds);

            if (typeof result === 'string') {
                this.deleteFavItemsState = { loading: false, error: result };
            } else {
                this.deleteFavItemsState = { loading: false, error: null };
            }
        } catch (err: any) {
            this.deleteFavItemsState = { loading: false, error: err?.message || 'Failed to delete' };
            console.error('Delete error:', err);
        }
    });
}

export { FavItemStore }