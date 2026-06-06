import type { FC } from 'react';
import styles from './RecommPreview.module.scss'
import { FaRegStar } from "react-icons/fa";
import type { BookPreviewT } from '../../../types';
import { MdCurrencyRuble } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const RecommPreview: FC<{ book: BookPreviewT, color: 'pink' | 'purple' | 'blue' }> = ({ book, color }) => {
    const discountPrice = Math.floor(book.Price - (book.Price / 100 * book.Discount));
    const titleClassName = [
        styles.preview_title,
        styles[`preview_title_${color}`]
    ].join(' ');

    const navigate = useNavigate();

    return (
        <article onClick={() => navigate(`/books/${book.Id}`)} className={styles.recomm_preview_wrapper}>
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
                <p className={titleClassName}>{book.Title}</p>
                <p className={styles.preview_author}>{book.Author}</p>
            </div>

            <div className={styles.preview_footer}>
                <div className={styles.price_group}>
                    {book.Discount !== 0 && (
                        <p className={styles.old_price}>
                            {book.Price}
                            <MdCurrencyRuble />
                        </p>
                    )}
                    <p className={styles.price}>
                        {book.Discount !== 0 ? discountPrice : book.Price}
                        <MdCurrencyRuble />
                    </p>
                </div>

                {book.Discount !== 0 && (
                    <p className={styles.discount_badge}>-{book.Discount}%</p>
                )}
            </div>
        </article>
    )
}

export default RecommPreview;
