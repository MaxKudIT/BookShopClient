import type { FC } from 'react';
import styles from './HistoryRow.module.scss'
import type { ReadingBookPreview } from '../../types';
import { MdHistory } from "react-icons/md";
import HistoryPreview from './HistoryPreview/HistoryPreview';
import { GrFormNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const HistoryRow: FC<{ books: ReadingBookPreview[] }> = ({ books }) => {
    const navigate = useNavigate();

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
                <button className={styles.books_button} type="button" onClick={() => navigate('/history')}>
                    <p>Все книги</p>
                    <GrFormNext />
                </button>
            </div>

            <div className={styles.history_row_main}>
                {books.length ? (
                    books.slice(0, 4).map((book) => (
                        <HistoryPreview key={book.Id} book={book} />
                    ))
                ) : (
                    <p style={{ color: '#BAC1CEFF', fontSize: 15 }}>Вы еще не открывали книги для чтения</p>
                )}
            </div>
        </section>
    )


}

export default HistoryRow;
