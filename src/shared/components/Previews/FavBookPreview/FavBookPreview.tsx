import type { FC } from 'react';
import styles from './FavBookPreview.module.scss'
import { FaRegStar, FaRegTrashAlt } from "react-icons/fa";
import type { BookPreviewT } from '../../../types';
import { MdCurrencyRuble } from 'react-icons/md';
import { IoBagAddOutline } from 'react-icons/io5';

const FavBookPreview: FC<{ book: BookPreviewT }> = ({ book }) => {
    const discountPrice = Math.floor(book.Price - (book.Price / 100 * book.Discount));

    return (
        <article className={styles.fav_preview_wrapper}>
            <div className={styles.image_wrapper}>
                <img className={styles.book_image} src={book.ImageUrl} alt={book.Title} />
            </div>

            <div className={styles.card_body}>
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
                    <p className={styles.preview_recomm_title}>{book.Title}</p>
                    <p className={styles.preview_author}>{book.Author}</p>
                </div>

                <div className={styles.card_footer}>
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
                    <div className={styles.actions}>
                        <button className={styles.cart_button} aria-label="Добавить в корзину">
                            <IoBagAddOutline />
                        </button>
                        <button className={styles.icon_wrapper} aria-label="Удалить из избранного">
                            <FaRegTrashAlt className={styles.trash_button} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default FavBookPreview;
