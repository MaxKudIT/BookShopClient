import { createContext } from "react";
import { BookInfoStore } from "../features/BookInfo/mobx/BookInfoStore"
import { Api } from "../shared/api/api";
import { HttpActions } from "../shared/api/httpActions"
import { BookPageStore } from "../features/BookPage/mobx/BookPageStore";
import { CartItemStore } from "../features/Cart/mobx/CartStore";
import { FavItemStore } from "../features/Favs/mobx/FavsStore";

export type Stores = {
    readonly bookInfoStore: BookInfoStore
    readonly bookPageStore: BookPageStore
    readonly cartItemsStore: CartItemStore
    readonly favItemsStore: FavItemStore
}

const httpActions = new HttpActions();

const api = new Api(httpActions);

const stores: Stores = {
    bookInfoStore: new BookInfoStore(api),
    bookPageStore: new BookPageStore(api),
    cartItemsStore: new CartItemStore(api),
    favItemsStore: new FavItemStore(api)
}

export {stores}