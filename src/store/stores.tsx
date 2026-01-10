import { createContext } from "react";
import { BookInfoStore } from "../features/BookInfo/mobx/BookInfoStore"
import { Api } from "../shared/api/api";
import { HttpActions } from "../shared/api/httpActions"
import { BookPageStore } from "../features/BookPage/mobx/BookPageStore";

export type Stores = {
    readonly bookInfoStore: BookInfoStore
    readonly bookPageStore: BookPageStore
}

const httpActions = new HttpActions();

const api = new Api(httpActions);

const stores: Stores = {
    bookInfoStore: new BookInfoStore(api),
    bookPageStore: new BookPageStore(api)
}

export {stores}