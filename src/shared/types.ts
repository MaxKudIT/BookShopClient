export type Genres = 
| 'Приключения'
| 'Ужасы'
| 'Драма'
| 'Исторические'
| 'Фантастика'



export type BookPreviewT = {
    id: string
    title: string
    genre: Genres
    image: string,
    price: number,
    isAvailable: boolean
}