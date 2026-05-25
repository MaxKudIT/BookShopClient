import { useRef, useState, type FC } from 'react';
import styles from './RecommsRowWithDynamic.module.scss'
import { GrFormNext } from 'react-icons/gr';
import { IoIosArrowBack } from 'react-icons/io';
import type { BookPreviewT } from '../../../types';
import RecommPreview from '../RecommPreview/RecommPreview';
import type { IconType } from 'react-icons';

export type RecommsRowWithDynamicProps = {
    icon: IconType,
    title: string,
    description: string,
    books: BookPreviewT[],
    color: 'pink' | 'purple' | 'blue'
}

const defaultBooks: BookPreviewT[] = [
    {
        Id: 'dynamic-recomm-1',
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
        Id: 'dynamic-recomm-2',
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
        Id: 'dynamic-recomm-3',
        Title: 'Шерлок Холмс',
        Author: 'Артур Конан Дойл',
        Genre: 'Приключения',
        Rate: 4.7,
        ImageUrl: 'https://imo10.labirint.ru/books/540709/cover.jpg/242-0',
        IsMine: true,
        Price: 700,
        Discount: 12
    },
    {
        Id: 'dynamic-recomm-4',
        Title: 'Кладбище домашних животных',
        Author: 'Стивен Кинг',
        Genre: 'Ужасы',
        Rate: 4.6,
        ImageUrl: 'https://imo10.labirint.ru/books/771998/cover.jpg/242-0',
        IsMine: true,
        Price: 760,
        Discount: 8
    },
    {
        Id: 'dynamic-recomm-5',
        Title: 'Дюна',
        Author: 'Фрэнк Герберт',
        Genre: 'Фантастика',
        Rate: 4.9,
        ImageUrl: 'https://imo10.labirint.ru/books/865276/cover.jpg/242-0',
        IsMine: true,
        Price: 920,
        Discount: 15
    },
    {
        Id: 'dynamic-recomm-6',
        Title: 'Оно',
        Author: 'Стивен Кинг',
        Genre: 'Ужасы',
        Rate: 5.0,
        ImageUrl: 'https://imo10.labirint.ru/books/600284/cover.jpg/242-0',
        IsMine: true,
        Price: 980,
        Discount: 10
    }
];

const RecommsRowWithDynamic: FC<RecommsRowWithDynamicProps> = ({ books, icon: Icon, title, description, color }) => {
    const visibleBooks = books.length ? books : defaultBooks;
    const booksListRef = useRef<HTMLDivElement>(null);
    const [disabledPrev, setDisabledPrev] = useState(true);
    const [disabledNext, setDisabledNext] = useState(false);
    const accentClassName = styles[`accent_${color}`];

    const updateButtonsState = () => {
        const booksList = booksListRef.current;

        if (!booksList) {
            return;
        }

        setDisabledPrev(booksList.scrollLeft <= 0);
        setDisabledNext(booksList.scrollLeft >= booksList.scrollWidth - booksList.clientWidth - 1);
    };

    const scrollBooks = (direction: 'prev' | 'next') => {
        const booksList = booksListRef.current;

        if (!booksList) {
            return;
        }

        booksList.scrollBy({
            left: direction === 'next' ? booksList.clientWidth : -booksList.clientWidth,
            behavior: 'smooth'
        });
    };

    return (
        <section className={[styles.recomms_row_wrapper, accentClassName].join(' ')}>
            <div className={styles.section_header}>
                <div className={styles.section_title_group}>
                    <div className={styles.section_icon}>
                        <Icon />
                    </div>
                    <div className={styles.section_title_text}>
                        <p className={styles.section_title}>{title}</p>
                        <p className={styles.section_subtitle}>{description}</p>
                    </div>
                </div>
            </div>

            <div className={styles.recomms_row_main}>
                <button
                    className={styles.icon_wrapper}
                    type="button"
                    disabled={disabledPrev}
                    onClick={() => scrollBooks('prev')}
                >
                    <IoIosArrowBack className={styles.next_or_back} />
                </button>

                <div onScroll={updateButtonsState} ref={booksListRef} className={styles.books_list}>
                    {visibleBooks.map((book) => (
                        <RecommPreview key={book.Id} color={color} book={book} />
                    ))}
                </div>

                <button
                    className={styles.icon_wrapper}
                    type="button"
                    disabled={disabledNext}
                    onClick={() => scrollBooks('next')}
                >
                    <GrFormNext className={styles.next_or_back} />
                </button>

            </div>
        </section>
    )
}

export default RecommsRowWithDynamic;
