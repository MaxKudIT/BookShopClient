import type { FC } from 'react';
import styles from './HistoryPreview.module.scss'
import { FaRegStar } from "react-icons/fa";
import type { BookPreviewT } from '../../../types';

const HistoryPreview: FC<{ book: BookPreviewT }> = ({ book }) => {

    return (
        <div className={styles.history_preview_wrapper}>
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

        </div>
    )

}

export default HistoryPreview;
