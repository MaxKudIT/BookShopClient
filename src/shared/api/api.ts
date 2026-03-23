import axios from 'axios'
import { BookInfoA } from './BookInfo/BookInfo'
import type { HttpActions } from './httpActions'
import { BookPageA } from './BookPage/BookPage'
import { CartA } from './Cart/Cart'
import { FavsA } from './Favs/FavsA'


export const api = axios.create({baseURL: 'http://192.168.0.106:3000/'})

class Api {
    public readonly books: BookInfoA
    public readonly pages: BookPageA
    public readonly carts: CartA
    public readonly favs: FavsA
    
    constructor(httpActions: HttpActions) {
        this.books = new BookInfoA(httpActions);
        this.pages = new BookPageA(httpActions)
        this.carts = new CartA(httpActions)
        this.favs = new FavsA(httpActions)
    }
}

export {Api}

