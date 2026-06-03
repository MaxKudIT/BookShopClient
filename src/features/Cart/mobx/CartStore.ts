import type { Api } from "../../../shared/api/api";
import { makeInitialAxiosSolt } from "../../../shared/helpers/apiSolt/makeInitialAxiosSolt";
import type { CartItemsPreview } from "../../../shared/types";
import { makeAutoObservable, flow } from 'mobx';
class CartItemStore {



    public cartItemsPreview: CartItemsPreview[] | null = null;

    public getCartItemsState = makeInitialAxiosSolt();

    public postCartItemsState = makeInitialAxiosSolt();

    public deleteCartItemsState = makeInitialAxiosSolt();


    public isInCartItems: boolean = false;
    public postCartItemsState2 = makeInitialAxiosSolt(); //isInCart

    public count: number = 0;
    public countCartState = makeInitialAxiosSolt();

    public areAllInCart: boolean = false
    public areAllInCartState = makeInitialAxiosSolt();


    private api: Api;

    constructor(api: Api) {
        makeAutoObservable(this);
        this.api = api;

        this.getCartItems = this.getCartItems.bind(this)
        this.areAllInCartItem = this.areAllInCartItem.bind(this)
        this.createCartItem = this.createCartItem.bind(this)
        this.deleteCartItems = this.deleteCartItems.bind(this)
        this.isInCartItem = this.isInCartItem.bind(this)
        this.getCountCart = this.getCountCart.bind(this)
        
    }




    public getCartItems = flow(function* (this: CartItemStore)
        : Generator<Promise<CartItemsPreview[] | string>, void, CartItemsPreview[] | string> {

        this.getCartItemsState = { loading: true, error: null };

        try {

            const res = yield this.api.carts.getCartItems();

            if (typeof res === 'string') {
                this.getCartItemsState = { loading: false, error: res };
            } else {
                this.cartItemsPreview = res;
                this.getCartItemsState = { loading: false, error: null };
            }
        } catch (err: any) {
            this.getCartItemsState = { loading: false, error: err?.message || 'Unknown error' };
            console.error('Failed to get cart items:', err);
        }
    });


    public isInCartItem = flow(function* (this: CartItemStore, physicalBookId: string)
        : Generator<Promise<string | { isInCart: boolean }>, void, string | { isInCart: boolean }> {

        this.postCartItemsState2 = { loading: true, error: null };

        try {

            const result = yield this.api.carts.isInCartItem(physicalBookId);

            if (typeof result === 'string') {
                this.postCartItemsState2 = { loading: false, error: result };
            } else {
                this.isInCartItems = result.isInCart
                this.postCartItemsState2 = { loading: false, error: null };

            }
        } catch (err: any) {
            this.postCartItemsState2 = { loading: false, error: err?.message || 'Failed to create' };
            console.error('Create error:', err);

        }
    });



      public areAllInCartItem = flow(function* (this: CartItemStore, physicalBookIds: string[])
        : Generator<Promise<string | { areAllInCart: boolean }>, void, string | { areAllInCart: boolean }> {

        this.areAllInCartState = { loading: true, error: null };

        try {

            const result = yield this.api.carts.areAllInCart(physicalBookIds);

            if (typeof result === 'string') {
                this.areAllInCartState = { loading: false, error: result };
            } else {
                this.areAllInCart = result.areAllInCart
                this.areAllInCartState = { loading: false, error: null };

            }
        } catch (err: any) {
            this.areAllInCartState = { loading: false, error: err?.message || 'Failed to create' };
            console.error('Create error:', err);

        }
    });

    public getCountCart = flow(function* (this: CartItemStore)
        : Generator<Promise<string | { count: number }>, void, string | { count: number }> {

        this.countCartState = { loading: true, error: null };

        try {

            const result = yield this.api.carts.countCart();

            if (typeof result === 'string') {
                this.countCartState = { loading: false, error: result };
            } else {
                this.count = result.count
                this.countCartState = { loading: false, error: null };

            }
        } catch (err: any) {
            this.countCartState = { loading: false, error: err?.message || 'Failed to create' };
            console.error('Create error:', err);

        }
    });




    public createCartItem = flow(function* (this: CartItemStore, physicalBookId: string)
        : Generator<Promise<string | { resultId: string }>, void, string | { resultId: string }> {

        this.postCartItemsState = { loading: true, error: null };

        try {

            const result = yield this.api.carts.createCartItem(physicalBookId);

            if (typeof result === 'string') {
                this.postCartItemsState = { loading: false, error: result };
            } else {

                this.postCartItemsState = { loading: false, error: null };

            }
        } catch (err: any) {
            this.postCartItemsState = { loading: false, error: err?.message || 'Failed to create' };
            console.error('Create error:', err);

        }
    });


    public deleteCartItems = flow(function* (this: CartItemStore, physicalBookIds: string[])
        : Generator<Promise<string | void>, void, string | void> {

        this.deleteCartItemsState = { loading: true, error: null };

        try {

            const result = yield this.api.carts.deleteCartItem(physicalBookIds);

            if (typeof result === 'string') {
                this.deleteCartItemsState = { loading: false, error: result };
            } else {
                this.deleteCartItemsState = { loading: false, error: null };
            }
        } catch (err: any) {
            this.deleteCartItemsState = { loading: false, error: err?.message || 'Failed to delete' };
            console.error('Delete error:', err);
        }
    });
}

export { CartItemStore }
