import type { FC } from 'react';
import styles from './RecommsCart.module.scss'
import type { BookPreviewT } from '../../../types';
import BookCarousel from '../../BookCarousel/BookCarousel';
import { IoSparklesOutline } from 'react-icons/io5';

const RecommsCart: FC<{ books: BookPreviewT[] }> = ({ books }) => {
    return (
        <section className={styles.recomms_row_wrapper}>
            <div className={styles.section_header}>
                <div className={styles.section_icon}>
                    <IoSparklesOutline />
                </div>
                <div className={styles.section_title_group}>
                    <p className={styles.section_title}>Вам также может понравиться</p>
                    <p className={styles.section_subtitle}>Подборка книг, которые хорошо дополняют корзину</p>
                </div>
            </div>
            <BookCarousel books={books} />
        </section>
    )
}

export default RecommsCart;
