export type Genres =
    | 'Приключения'
    | 'Ужасы'
    | 'Драма'
    | 'Исторические'
    | 'Фантастика'



export type BookPreviewT = {
    Id: string
    Title: string
    Genre: Genres
    Price: number
    Author: string;
    ImageUrl: string,
    Discount: number,
    IsMine?: boolean,
    Rate: number
}

export type BookInfoT = {
    Id: string
    Title: string
    PagesCount: number
    Description: string
    AboutBook: string
    Quote: string
    CreatedDate: string
    ReadingTime: string
    Price: number
    Discount: number //в процентах
    Author: string
    Genre: string
    ImageUrl: string
    Rate: number
    IsMine: number,

    isInCart: boolean
    isInFavs: boolean

}

export type PageInfoT = {
    Id: string
    Number: number
    Text: string
}


export type ErrorResponse = string

export type AxiosSolt = {
    loading: boolean
    error: string | null
}


export type CartItemsPreview = {
    Id: string
    BookId?: string
    ImageUrl: string
    Title: string
    Author: string
    Price: number
    Discount: number
    Rate: number
    Format?: string
    StockCount?: number

}

export type FavItemsPreview = {
    Id: string
    ImageUrl: string
    Title: string
    Author: string
    Price: number
    Discount: number
    Rate: number

}

export type UserSubscription = {
    Id: string
    UserId: string
    PlanId: string
    Status: string
    StartedAt: string
    ExpiresAt: string
}

export type UserSubscriptionStatus = {
    IsActive: boolean
    Subscription: UserSubscription | null
}

export type UserStats = {
    TotalMinutes: number
    ReadBooks: number
    AverageRating: number
}

export type RecommendationsPageT = {
    forYou: BookPreviewT[]
    fresh: BookPreviewT[]
    trend: BookPreviewT[]
}

export type ReadingSession = {
    Id: string
    UserId: string
    BookId: string
    StartedAt: string
    EndedAt: string | null
    Minutes: number
}

export type ReadingSessionCreate = {
    bookId: string
    startedAt: string
    endedAt: string | null
    minutes: number
}

export type ReadingBookPreview = {
    Id: string
    ImageUrl: string
    Title: string
    Author: string
    Rate: number
    Genre: Genres
    CreatedDate: string
    PagesCount: number
    LastStartedAt: string
}

export type ReadingStatus = 'ns' | 'reading' | 'finished'

export type ReadingState = {
    SessionId: string
    BookId: string
    Status: ReadingStatus
    CurrentPage: number
    ProgressPercent: number
}

export type StartReadingDTO = {
    bookId: string
}

export type UpdateReadingProgressDTO = {
    bookId: string
    currentPage: number
}

export type FinishReadingDTO = {
    sessionId: string
    currentPage: number
}

export type BookReview = {
    Id: string
    UserId: string
    BookId: string
    Rating: number
    CreatedAt: string
}

export type BookReviewCreate = {
    bookId: string
    rating: number
}

export type OrderStatus = 'paid'

export type Order = {
    Id: string
    UserId: string
    Status: OrderStatus
    TotalAmount: number
    Currency: string
    DeliveryAddress: string
    PaidAt: string
}

export type OrderCreate = {
    totalAmount: number
    currency: string
    deliveryAddress: string
}

export type OrderItem = {
    OrderId: string
    PhysicalProductId: string
    Quantity: number
    PriceAtPurchase: number
    DiscountAtPurchase: number
}

export type OrderItemCreate = {
    physicalProductId: string
    quantity: number
}

export type BookViewPreview = {
    Id: string
    ImageUrl: string
    Title: string
    Author: string
    CreatedDate: string
    Genre: Genres
    Rate: number
    PagesCount: number
    ViewedAt: string
}

export type AIMessageRole = 'user' | 'assistant'

export type AIChat = {
    Id: string
    UserId: string
    Title: string
    CreatedAt: string
    UpdatedAt: string
}

export type AIChatCurrent = {
    id: string
    title: string
    createdAt: string
    updatedAt: string
}

export type AIMessage = {
    Id: string
    UserId: string
    ChatId: string
    Role: AIMessageRole
    Content: string
    CreatedAt: string
}

export type AIChatCreate = {
    title: string
}

export type AIMessageCreate = {
    role: AIMessageRole
    content: string
}

export type AIAskResponse = {
    userMessageId: string
    assistantMessageId: string
    answer: string
}
