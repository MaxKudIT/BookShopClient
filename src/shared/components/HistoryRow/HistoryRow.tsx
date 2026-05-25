import type { FC } from 'react';
import styles from './HistoryRow.module.scss'
import type { BookPreviewT } from '../../types';
import { MdHistory } from "react-icons/md";
import HistoryPreview from './HistoryPreview/HistoryPreview';
import { GrFormNext } from 'react-icons/gr';

const defaultBooks: BookPreviewT[] = [
    {
        Id: 'history-1',
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
        Id: 'history-2',
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
        Id: 'history-3',
        Title: 'Оно',
        Author: 'Стивен Кинг',
        Genre: 'Ужасы',
        Rate: 5.0,
        ImageUrl: 'https://imo10.labirint.ru/books/600284/cover.jpg/242-0',
        IsMine: true,
        Price: 800,
        Discount: 10
    },
    {
        Id: 'history-4',
        Title: 'Зеленая Миля',
        Author: 'Стивен Кинг',
        Genre: 'Фантастика',
        Rate: 4.9,
        ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhhoSS4VwAoCA2l9iEe1ejrGckq7QZMp1Tw&s',
        IsMine: true,
        Price: 800,
        Discount: 10
    }
];

const HistoryRow: FC<{ books: BookPreviewT[] }> = ({ books }) => {
    const visibleBooks = books.length ? books : defaultBooks;

    return (
        <section className={styles.history_row_wrapper}>
            <div className={styles.section_header}>
                <div className={styles.section_title_group}>
                    <div className={styles.section_icon}>
                        <MdHistory />
                    </div>
                    <div className={styles.section_title_text}>
                        <p className={styles.section_title}>Продолжить чтение</p>
                        <p className={styles.section_subtitle}>Ваша недавняя история просмотра книг</p>
                    </div>
                </div>
                <button className={styles.books_button}>
                    <p>Все книги</p>
                    <GrFormNext />
                </button>
            </div>

            <div className={styles.history_row_main}>
                {visibleBooks.slice(0, 4).map((book) => (
                    <HistoryPreview key={book.Id} book={book} />
                ))}
            </div>
        </section>
    )


}

export default HistoryRow;
