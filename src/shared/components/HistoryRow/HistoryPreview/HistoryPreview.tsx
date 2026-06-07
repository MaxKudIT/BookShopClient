import type { FC } from 'react';
import styles from './HistoryPreview.module.scss'
import { FaRegStar } from "react-icons/fa";
import type { ReadingBookPreview } from '../../../types';
import { useNavigate } from 'react-router-dom';

const HistoryPreview: FC<{ book: ReadingBookPreview }> = ({ book }) => {
    const progress = Math.min(96, Math.max(36, Math.round(book.Rate * 18)));

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/books/${book.Id}`)} className={styles.history_preview_wrapper}>
            <div className={styles.image_wrapper}>
                <img className={styles.book_image} src={book.ImageUrl} alt={book.Title} />
            </div>
            <div className={styles.preview_meta}>
                <div className={styles.preview_rate}>
                    <FaRegStar />
                    {book.Rate}
                </div>
                <p className={styles.preview_genre}>{book.Genre}</p>
            </div>

            <div className={styles.preview_text}>
                <p className={styles.preview_history_title}>{book.Title}</p>
                <p className={styles.preview_author}>{book.Author}</p>
            </div>

            <div className={styles.progress_block}>
                <div className={styles.progress_head}>
                    <p>Прогресс</p>
                    <span>{progress}%</span>
                </div>
                <div
                    className={styles.progress_track}
                    role="progressbar"
                    aria-label={`Прогресс чтения ${progress}%`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                >
                    <span style={{ width: `${progress}%` }}></span>
                </div>
            </div>

        </div>
    )

}

export default HistoryPreview;
