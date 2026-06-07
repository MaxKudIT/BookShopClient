import { useRef, useState, type FC } from 'react';
import styles from './RecommsRowWithDynamic.module.scss'
import { GrFormNext } from 'react-icons/gr';
import { IoIosArrowBack } from 'react-icons/io';
import type { BookPreviewT } from '../../../types';
import RecommPreview from '../RecommPreview/RecommPreview';
import type { IconType } from 'react-icons';

export type RecommsRowWithDynamicProps = {
    icon: IconType,
    title: string,
    description: string,
    books: BookPreviewT[],
    color: 'pink' | 'purple' | 'blue',
    itemsPerView?: 4 | 5
}

const RecommsRowWithDynamic: FC<RecommsRowWithDynamicProps> = ({ books, icon: Icon, title, description, color, itemsPerView = 5 }) => {
    const booksListRef = useRef<HTMLDivElement>(null);
    const [disabledPrev, setDisabledPrev] = useState(true);
    const [disabledNext, setDisabledNext] = useState(false);
    const accentClassName = styles[`accent_${color}`];
    const itemsClassName = styles[`items_${itemsPerView}`];

    const updateButtonsState = () => {
        const booksList = booksListRef.current;

        if (!booksList) {
            return;
        }

        setDisabledPrev(booksList.scrollLeft <= 0);
        setDisabledNext(booksList.scrollLeft >= booksList.scrollWidth - booksList.clientWidth - 1);
    };

    const scrollBooks = (direction: 'prev' | 'next') => {
        const booksList = booksListRef.current;

        if (!booksList) {
            return;
        }

        booksList.scrollBy({
            left: direction === 'next' ? booksList.clientWidth : -booksList.clientWidth,
            behavior: 'smooth'
        });
    };

    return (
        <section className={[styles.recomms_row_wrapper, accentClassName, itemsClassName].join(' ')}>
            <div className={styles.section_header}>
                <div className={styles.section_title_group}>
                    <div className={styles.section_icon}>
                        <Icon />
                    </div>
                    <div className={styles.section_title_text}>
                        <p className={styles.section_title}>{title}</p>
                        <p className={styles.section_subtitle}>{description}</p>
                    </div>
                </div>
            </div>

            <div className={styles.recomms_row_main}>
                <button
                    className={styles.icon_wrapper}
                    type="button"
                    disabled={disabledPrev}
                    onClick={() => scrollBooks('prev')}
                >
                    <IoIosArrowBack className={styles.next_or_back} />
                </button>

                <div onScroll={updateButtonsState} ref={booksListRef} className={styles.books_list}>
                    {books.length ? (
                        books.map((book) => (
                            <RecommPreview key={book.Id} color={color} book={book} />
                        ))
                    ) : (
                        <p style={{ color: '#BAC1CEFF', fontSize: 15 }}>Подборка пока пуста</p>
                    )}
                </div>

                <button
                    className={styles.icon_wrapper}
                    type="button"
                    disabled={disabledNext}
                    onClick={() => scrollBooks('next')}
                >
                    <GrFormNext className={styles.next_or_back} />
                </button>

            </div>
        </section>
    )
}

export default RecommsRowWithDynamic;
