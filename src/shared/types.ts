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
    ImageUrl: string,
    Discount: number,
    IsMine: boolean
}