import axios from 'axios'
import { AIChatA } from './AIChat/AIChatA'
import { BookInfoA } from './BookInfo/BookInfo'
import { BookRevsA } from './BookRevs/BookRevsA'
import { BookViewsA } from './BookViews/BookViewsA'
import type { HttpActions } from './httpActions'
import { BookPageA } from './BookPage/BookPage'
import { CartA } from './Cart/Cart'
import { FavsA } from './Favs/FavsA'
import { BooksA } from './Books/BooksA'
import { OrderItemsA } from './OrderItems/OrderItemsA'
import { OrdersA } from './Orders/OrdersA'
import { PhysicalBooksA } from './PhysicalBooks/PhysicalBooksA'
import { ReadingA } from './Reading/ReadingA'
import { ReadingSessionsA } from './ReadingSessions/ReadingSessionsA'
import { RecommendationA } from './Recommendation/RecommendationA'
import { StatsA } from './Stats/StatsA'
import { SubscriptionPlansA } from './SubscriptionPlans/SubscriptionPlansA'
import { UsersBooksA } from './UsersBooks/UsersBooksA'
import { UserSubA } from './UserSub/UserSubA'


export const api = axios.create({baseURL: 'http://192.168.0.109:3000/'})

class Api {

    public readonly aiChats: AIChatA
    public readonly books: BookInfoA
    public readonly bookRevs: BookRevsA
    public readonly bookViews: BookViewsA
    public readonly pages: BookPageA
    public readonly carts: CartA
    public readonly favs: FavsA
    public readonly myBooks: BooksA
    public readonly orderItems: OrderItemsA
    public readonly orders: OrdersA
    public readonly physicalBooks: PhysicalBooksA
    public readonly reading: ReadingA
    public readonly readingSessions: ReadingSessionsA
    public readonly recommendations: RecommendationA
    public readonly stats: StatsA
    public readonly subscriptionPlans: SubscriptionPlansA
    public readonly usersBooks: UsersBooksA
    public readonly userSubscriptions: UserSubA
    
    constructor(httpActions: HttpActions) {
        this.aiChats = new AIChatA(httpActions)
        this.books = new BookInfoA(httpActions);
        this.bookRevs = new BookRevsA(httpActions)
        this.bookViews = new BookViewsA(httpActions)
        this.pages = new BookPageA(httpActions)
        this.carts = new CartA(httpActions)
        this.favs = new FavsA(httpActions)
        this.myBooks = new BooksA(httpActions)
        this.orderItems = new OrderItemsA(httpActions)
        this.orders = new OrdersA(httpActions)
        this.physicalBooks = new PhysicalBooksA(httpActions)
        this.reading = new ReadingA(httpActions)
        this.readingSessions = new ReadingSessionsA(httpActions)
        this.recommendations = new RecommendationA(httpActions)
        this.stats = new StatsA(httpActions)
        this.subscriptionPlans = new SubscriptionPlansA(httpActions)
        this.usersBooks = new UsersBooksA(httpActions)
        this.userSubscriptions = new UserSubA(httpActions)
    }
}

export {Api}
