import { createContext } from "react";
import { BookInfoStore } from "../features/BookInfo/mobx/BookInfoStore"
import { Api } from "../shared/api/api";
import { HttpActions } from "../shared/api/httpActions"
import { BookPageStore } from "../features/BookPage/mobx/BookPageStore";
import { CartItemStore } from "../features/Cart/mobx/CartStore";
import { FavItemStore } from "../features/Favs/mobx/FavsStore";
import { MyBooksStore } from "../features/MyBooks/mobx/BooksStore";
import { AiChatStore } from "../features/AiChat/mobx/AiChatStore";
import { StatsStore } from "../features/Stats/mobx/StatsStore";
import { SubscriptionStore } from "../features/Subscription/mobx/SubscriptionStore";

export type Stores = {
    readonly aiChatStore: AiChatStore
    readonly bookInfoStore: BookInfoStore
    readonly bookPageStore: BookPageStore
    readonly cartItemsStore: CartItemStore
    readonly favItemsStore: FavItemStore
    readonly myBooksStore: MyBooksStore
    readonly statsStore: StatsStore
    readonly subscriptionStore: SubscriptionStore
}

const httpActions = new HttpActions();

const api = new Api(httpActions);

const stores: Stores = {
    aiChatStore: new AiChatStore(api),
    bookInfoStore: new BookInfoStore(api),
    bookPageStore: new BookPageStore(api),
    cartItemsStore: new CartItemStore(api),
    favItemsStore: new FavItemStore(api),
    myBooksStore: new MyBooksStore(api),
    statsStore: new StatsStore(api),
    subscriptionStore: new SubscriptionStore(api)
}

export {stores}
