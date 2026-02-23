import axios from 'axios'
import { BookInfoA } from './BookInfo/BookInfo'
import type { HttpActions } from './httpActions'
import { BookPageA } from './BookPage/BookPage'
import { CartA } from './Cart/Cart'


export const api = axios.create({baseURL: 'http://localhost:3000/'})

class Api {
    public readonly books: BookInfoA
    public readonly pages: BookPageA
    public readonly carts: CartA

    
    constructor(httpActions: HttpActions) {
        this.books = new BookInfoA(httpActions);
        this.pages = new BookPageA(httpActions)
        this.carts = new CartA(httpActions)
    }
}

export {Api}

