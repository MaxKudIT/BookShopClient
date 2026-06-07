import type { FC } from 'react';
import styles from './RecommsRow.module.scss'
import type { BookPreviewT } from '../../types';
import RecommPreview from './RecommPreview/RecommPreview';
import { IoCompassOutline } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const genres: string[] = ['История', 'Детективы', 'Научная фантастика', 'Психология', 'Технологии', 'Философия', 'Документальные'];

const RecommsRow: FC<{ books: BookPreviewT[] }> = ({ books }) => {
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
                    {books.length ? (
                        books.slice(0, 4).map((book) => (
                            <RecommPreview key={book.Id} color={'pink'} book={book} />
                        ))
                    ) : (
                        <p style={{ color: '#BAC1CEFF', fontSize: 15 }}>Рекомендаций пока нет</p>
                    )}
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
