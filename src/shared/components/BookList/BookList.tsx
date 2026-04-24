import type { FC } from 'react';
import styles from './BookList.module.scss'
import type { BookPreviewT, Genres } from '../../types';
import React, { useMemo } from 'react';
import HistoryPreview from '../HistoryRow/HistoryPreview/HistoryPreview';
import MyBookPreview from '../Previews/MyBookPreview/MyBookPreview';




export const BookList: FC<{ list: BookPreviewT[], viewPage: 'home' | 'shop' }> = ({ list, viewPage: pageView }) => {

    const d = list;


    return (
        <>

            <div className={styles.book_list_container}>
                <MyBookPreview book={{
                    Id: '1',
                    Title: 'Мастер и Маргарита',
                    Author: 'Михаил Булгаков',
                    Genre: 'Драма',
                    Rate: 4.9,
                    ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
                    IsMine: true,
                    Price: 800,
                    Discount: 10

                }} />
                <MyBookPreview book={{
                    Id: '1',
                    Title: 'Человек-паук',
                    Author: 'Марвелпедия',
                    Genre: 'Фантастика',
                    Rate: 4.5,
                    ImageUrl: 'https://img.comicbooks.ru/images/products/1/7455/945601823/VGs-GD5boU8.jpg',
                    IsMine: true,
                    Price: 800,
                    Discount: 10

                }} />
                <MyBookPreview book={{
                    Id: '1',
                    Title: 'Оно',
                    Author: 'Стивен Кинг',
                    Genre: 'Ужасы',
                    Rate: 5.0,
                    ImageUrl: 'https://imo10.labirint.ru/books/600284/cover.jpg/242-0',
                    IsMine: true,
                    Price: 800,
                    Discount: 10

                }} />
                <MyBookPreview book={{
                    Id: '1',
                    Title: 'Зеленая Миля',
                    Author: 'Стивен Кинг',
                    Genre: 'Фантастика',
                    Rate: 4.9,
                    ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhhoSS4VwAoCA2l9iEe1ejrGckq7QZMp1Tw&s',
                    IsMine: true,
                    Price: 800,
                    Discount: 10

                }} />
                <MyBookPreview book={{
                    Id: '1',
                    Title: 'Оно',
                    Author: 'Стивен Кинг',
                    Genre: 'Ужасы',
                    Rate: 5.0,
                    ImageUrl: 'https://imo10.labirint.ru/books/600284/cover.jpg/242-0',
                    IsMine: true,
                    Price: 800,
                    Discount: 10

                }} />
                <MyBookPreview book={{
                    Id: '1',
                    Title: 'Мастер и Маргарита',
                    Author: 'Михаил Булгаков',
                    Genre: 'Драма',
                    Rate: 4.9,
                    ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
                    IsMine: true,
                    Price: 800,
                    Discount: 10

                }} />
                <HistoryPreview book={{
                    Id: '1',
                    Title: 'Зеленая Миля',
                    Author: 'Стивен Кинг',
                    Genre: 'Фантастика',
                    Rate: 4.9,
                    ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhhoSS4VwAoCA2l9iEe1ejrGckq7QZMp1Tw&s',
                    IsMine: true,
                    Price: 800,
                    Discount: 10

                }} />
                <MyBookPreview book={{
                    Id: '1',
                    Title: 'Мастер и Маргарита',
                    Author: 'Михаил Булгаков',
                    Genre: 'Драма',
                    Rate: 4.9,
                    ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
                    IsMine: true,
                    Price: 800,
                    Discount: 10

                }} />
                <MyBookPreview book={{
                    Id: '1',
                    Title: 'Человек-паук',
                    Author: 'Марвелпедия',
                    Genre: 'Фантастика',
                    Rate: 4.5,
                    ImageUrl: 'https://img.comicbooks.ru/images/products/1/7455/945601823/VGs-GD5boU8.jpg',
                    IsMine: true,
                    Price: 800,
                    Discount: 10

                }} />
            </div>
        </>

    )
}


export default React.memo(BookList);