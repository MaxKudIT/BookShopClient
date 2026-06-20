import type { FC } from 'react';
import styles from './MainBookPreview.module.scss'
import { FaRegStar } from "react-icons/fa";
import type { BookPreviewT } from '../../../types';
import { MdCurrencyRuble } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const MainBookPreview: FC<{ book: BookPreviewT }> = ({ book }) => {
    const discountPrice = Math.floor(book.Price - (book.Price / 100 * book.Discount));

    const navigate = useNavigate();

    return (
        <article onClick={() => navigate(`/books/${book.Id}`)} className={styles.main_preview_wrapper}>
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
                <p className={styles.preview_title}>{book.Title}</p>
                <p className={styles.preview_author}>{book.Author}</p>
            </div>

            <div className={styles.preview_footer}>
                <div className={styles.price_group}>
                    {book.Discount !== 0 ? (
                        <p className={styles.old_price}>
                            {book.Price}
                            <MdCurrencyRuble />
                        </p>
                    ) :   <p className={styles.old_price} style={{opacity: 0}}>
                            {book.Price}
                            <MdCurrencyRuble />
                        </p>}
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

export default MainBookPreview;
