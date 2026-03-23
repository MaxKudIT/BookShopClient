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
    IsMine: boolean,
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
    ImageUrl: string
    Title: string
    Author: string
    Price: number
    Discount: number
    Rate: number

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
