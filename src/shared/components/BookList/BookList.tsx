import type { FC } from 'react';
import styles from './BookList.module.scss'
import type { BookPreviewT } from '../../types';
import React from 'react';
import MainBookPreview from '../Previews/MainBookPreview/MainBookPreview';

const defaultBooks: BookPreviewT[] = [
    {
        Id: 'main-1',
        Title: 'Мастер и Маргарита',
        Author: 'Михаил Булгаков',
        Genre: 'Драма',
        Rate: 4.9,
        ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
        IsMine: true,
        Price: 800,
        Discount: 10
    },
    {
        Id: 'main-2',
        Title: 'Человек-паук',
        Author: 'Марвелпедия',
        Genre: 'Фантастика',
        Rate: 4.5,
        ImageUrl: 'https://img.comicbooks.ru/images/products/1/7455/945601823/VGs-GD5boU8.jpg',
        IsMine: true,
        Price: 800,
        Discount: 10
    },
    {
        Id: 'main-3',
        Title: 'Оно',
        Author: 'Стивен Кинг',
        Genre: 'Ужасы',
        Rate: 5,
        ImageUrl: 'https://imo10.labirint.ru/books/600284/cover.jpg/242-0',
        IsMine: true,
        Price: 800,
        Discount: 10
    },
    {
        Id: 'main-4',
        Title: 'Зеленая Миля',
        Author: 'Стивен Кинг',
        Genre: 'Фантастика',
        Rate: 4.9,
        ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhhoSS4VwAoCA2l9iEe1ejrGckq7QZMp1Tw&s',
        IsMine: true,
        Price: 800,
        Discount: 10
    },
    {
        Id: 'main-5',
        Title: 'Пикник на обочине',
        Author: 'Аркадий и Борис Стругацкие',
        Genre: 'Фантастика',
        Rate: 4.8,
        ImageUrl: 'https://imo10.labirint.ru/books/868684/cover.jpg/242-0',
        IsMine: true,
        Price: 640,
        Discount: 5
    },
    {
        Id: 'main-6',
        Title: 'Шерлок Холмс',
        Author: 'Артур Конан Дойл',
        Genre: 'Приключения',
        Rate: 4.7,
        ImageUrl: 'https://imo10.labirint.ru/books/540709/cover.jpg/242-0',
        IsMine: true,
        Price: 700,
        Discount: 0
    },
    {
        Id: 'main-7',
        Title: 'Преступление и наказание',
        Author: 'Федор Достоевский',
        Genre: 'Драма',
        Rate: 4.8,
        ImageUrl: 'https://cv6.litres.ru/pub/c/cover_415/4236675.webp',
        IsMine: true,
        Price: 720,
        Discount: 15
    },
    {
        Id: 'main-8',
        Title: 'Кладбище домашних животных',
        Author: 'Стивен Кинг',
        Genre: 'Ужасы',
        Rate: 4.6,
        ImageUrl: 'https://imo10.labirint.ru/books/771998/cover.jpg/242-0',
        IsMine: true,
        Price: 760,
        Discount: 8
    }
];

export const BookList: FC<{ list: BookPreviewT[], viewPage: 'home' | 'shop' }> = ({ list, viewPage }) => {
    const visibleBooks = list.length ? list : defaultBooks;
    const sectionSubtitle = viewPage === 'home'
        ? 'Сохраненные книги и истории, к которым легко вернуться'
        : 'Каталог книг, доступных для покупки и чтения';

    return (
        <section className={styles.books_section}>
            <div className={styles.section_header}>
                <div className={styles.section_title_group}>
                    <div>
                        <p className={styles.section_title}>Книжная подборка</p>
                        <p className={styles.section_subtitle}>{sectionSubtitle}</p>
                    </div>
                </div>
                <p className={styles.books_count}>{visibleBooks.length} книг</p>
            </div>

            <div className={styles.book_list_container}>
                {visibleBooks.map((book) => (
                    <MainBookPreview key={book.Id} book={book} />
                ))}
            </div>
        </section>
    )
}

export default React.memo(BookList);
