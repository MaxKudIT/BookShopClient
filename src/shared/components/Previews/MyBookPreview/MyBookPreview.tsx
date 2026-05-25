import type { FC } from 'react';
import styles from './MyBookPreview.module.scss'
import { FaRegStar } from "react-icons/fa";
import type { BookPreviewT } from '../../../types';

const MyBookPreview: FC<{ book: BookPreviewT }> = ({ book }) => {
    return (
        <article className={styles.history_preview_wrapper}>
            <div className={styles.image_wrapper}>
                <img className={styles.book_image} src={book.ImageUrl} alt={book.Title} />
            </div>

            <div className={styles.preview_meta}>
                <div className={styles.preview_rate}>
                    <FaRegStar />
                    <p>{book.Rate}</p>
                    <p>/</p>
                    <p>5.0</p>
                </div>
                <p className={styles.preview_genre}>{book.Genre}</p>
            </div>

            <div className={styles.preview_text}>
                <p className={styles.preview_history_title}>{book.Title}</p>
                <p className={styles.preview_author}>{book.Author}</p>
            </div>
        </article>
    )
}

export default MyBookPreview;
