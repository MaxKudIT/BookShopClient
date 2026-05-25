import type { FC } from 'react';
import styles from './HistoryRecentPreview.module.scss'
import { FaRegStar } from "react-icons/fa";
import type { BookPreviewT } from '../../../types';
import { MdOutlineDateRange } from 'react-icons/md';
import { LuBookOpenText } from 'react-icons/lu';

const HistoryRecentPreview: FC<{ book: BookPreviewT }> = ({ book }) => {
    const progress = Math.min(96, Math.max(36, Math.round(book.Rate * 18)));
    const readPages = Math.round(progress * 5.2);
    const filledStars = Math.round(book.Rate);

    return (
        <article className={styles.item_view_compo_wrapper}>
            <div className={styles.preview_content}>
                <img
                    className={styles.preview_image}
                    alt={book.Title}
                    src={book.ImageUrl}
                />

                <div className={styles.preview_body}>
                    <div className={styles.preview_top}>
                        <div className={styles.genre_wrapper}>{book.Genre}</div>
                        <div className={styles.title_block}>
                            <p className={styles.preview_title}>{book.Title}</p>
                            <p className={styles.preview_author}>{book.Author}</p>
                        </div>
                    </div>

                    <div className={styles.preview_bottom}>
                        <div className={styles.rating_row}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <FaRegStar
                                    key={index}
                                    className={index + 1 > filledStars ? styles.rating_star_muted : undefined}
                                />
                            ))}

                            <p className={styles.rating_text}>{book.Rate}/5</p>
                        </div>
                        <div className={styles.info_divider}></div>
                        <div className={styles.meta_row}>
                            <div className={styles.meta_item}>
                                <MdOutlineDateRange className={styles.meta_icon} />
                                <p>24 апр 2026</p>
                            </div>
                            <div className={styles.meta_item}>
                                <LuBookOpenText className={styles.meta_icon} />
                                <p>{readPages} стр.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <aside className={styles.side_slot}>
                <div className={styles.progress_head}>
                    <p className={styles.progress_label}>Прогресс</p>
                    <p className={styles.progress_value}>{progress}%</p>
                </div>
                <div className={styles.progress_track}>
                    <span style={{ width: `${progress}%` }}></span>
                </div>
                <button className={styles.open_button}>Открыть</button>
            </aside> */}
        </article>
    )
}

export default HistoryRecentPreview;
