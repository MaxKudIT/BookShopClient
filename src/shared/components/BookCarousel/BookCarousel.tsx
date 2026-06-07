import { useRef, useState, type FC } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { GrFormNext } from 'react-icons/gr';
import type { BookPreviewT } from '../../types';
import RecommPreview from '../RecommsRow/RecommPreview/RecommPreview';
import styles from './BookCarousel.module.scss';

const BookCarousel: FC<{ books?: BookPreviewT[] }> = ({ books = [] }) => {
  const booksListRef = useRef<HTMLDivElement>(null);

  const scrollBooks = (direction: 'prev' | 'next') => {
    const booksList = booksListRef.current;

    if (!booksList) {
      return;
    }

    booksList.scrollBy({
      left: direction === 'next' ? booksList.clientWidth : -booksList.clientWidth,
      behavior: 'smooth',
    });
  };

  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(false);

  const updateButtonsState = () => {
    const booksList = booksListRef.current;

    if (!booksList) {
      return;
    }

    setDisabledPrev(booksList.scrollLeft <= 0);
    setDisabledNext(
      booksList.scrollLeft >= booksList.scrollWidth - booksList.clientWidth - 1,
    );
  };

  return (
    <div className={styles.recomms_row_main}>
      <button
        className={styles.icon_wrapper}
        type="button"
        disabled={disabledPrev}
        onClick={() => {
          scrollBooks('prev')

        }
        }
      >
        <IoIosArrowBack className={styles.next_or_back} />
      </button>

      <div onScroll={updateButtonsState} ref={booksListRef} className={styles.books_list}>
        {books.length ? (
          books.map((book) => (
            <RecommPreview key={book.Id} color="blue" book={book} />
          ))
        ) : (
          <p style={{ color: '#BAC1CEFF', fontSize: 15 }}>Подборка пока пуста</p>
        )}
      </div>

      <button
        className={styles.icon_wrapper}
        type="button"

        disabled={disabledNext}
        onClick={() => {
          scrollBooks('next')
 
        }

        }
      >
        <GrFormNext style={{ fontSize: 25 }} className={styles.next_or_back} />
      </button>
    </div>
  );
};

export default BookCarousel;
