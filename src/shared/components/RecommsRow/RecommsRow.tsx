import type { FC } from 'react';
import styles from './RecommsRow.module.scss'
import type { BookPreviewT } from '../../types';
import RecommPreview from './RecommPreview/RecommPreview';
import { IoCompassOutline } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const genres: string[] = ['История', 'Детективы', 'Научная фантастика', 'Психология', 'Технологии', 'Философия', 'Документальные'];

const defaultBooks: BookPreviewT[] = [
    {
        Id: 'recomm-1',
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
        Id: 'recomm-2',
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
        Id: 'recomm-3',
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
        Id: 'recomm-4',
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

const RecommsRow: FC<{ books: BookPreviewT[] }> = ({ books }) => {
    const visibleBooks = books.length ? books : defaultBooks;
    const cardColors: Array<'pink' | 'purple' | 'blue'> = ['pink', 'purple', 'blue', 'pink'];
    const navigate = useNavigate();

    return (
        <section  className={styles.recomms_section}>
            <div className={styles.recomms_row_wrapper}>
                <div className={styles.section_header}>
                    <div className={styles.section_title_group}>
                        <div className={styles.section_icon}>
                            <IoCompassOutline />
                        </div>
                        <div className={styles.section_title_text}>
                            <p className={styles.section_title}>Личные рекомендации</p>
                            <p className={styles.section_subtitle}>Создано специально для вас</p>
                        </div>
                    </div>

                    <button className={styles.books_button} type="button" onClick={() => navigate('/recomms')}>
                        <p>Смотреть все</p>
                        <GrFormNext />
                    </button>
                </div>

                <div className={styles.recomms_row_main}>
                    {visibleBooks.slice(0, 4).map((book, index) => (
                        <RecommPreview key={book.Id} color={'pink'} book={book} />
                    ))}
                </div>
            </div>

            <aside className={styles.side_info_block}>
                <p className={styles.side_title}>ПОПУЛЯРНЫЕ ЖАНРЫ</p>
                <div className={styles.side_divider} />
                <div className={styles.genre_list}>
                    {genres.map((genre) => (
                        <GenreWrapper key={genre} genre={genre} />
                    ))}
                </div>
            </aside>
        </section>
    )
}

export default RecommsRow;

const GenreWrapper: FC<{ genre: string }> = ({ genre }) => {
    return (
        <div className={styles.genre_chip}>
            {genre}
        </div>
    )
}
