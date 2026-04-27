import { useRef, useState, type FC } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { GrFormNext } from 'react-icons/gr';
import type { BookPreviewT } from '../../types';
import RecommPreview from '../RecommsRow/RecommPreview/RecommPreview';
import styles from './BookCarousel.module.scss';

const testBooks: BookPreviewT[] = [
  {
    Id: '1',
    Title: 'Мастер и Маргарита',
    Author: 'Михаил Булгаков',
    Genre: 'Драма',
    Rate: 4.9,
    ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
    IsMine: true,
    Price: 800,
    Discount: 10,
  },
  {
    Id: '2',
    Title: 'Преступление и наказание',
    Author: 'Федор Достоевский',
    Genre: 'Драма',
    Rate: 4.8,
    ImageUrl: 'https://cv6.litres.ru/pub/c/cover_415/4236675.webp',
    IsMine: false,
    Price: 720,
    Discount: 15,
  },
  {
    Id: '3',
    Title: 'Анна Каренина',
    Author: 'Лев Толстой',
    Genre: 'Драма',
    Rate: 4.7,
    ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
    IsMine: false,
    Price: 910,
    Discount: 5,
  },
  {
    Id: '4',
    Title: '1984',
    Author: 'Джордж Оруэлл',
    Genre: 'Драма',
    Rate: 4.9,
    ImageUrl: 'https://cv6.litres.ru/pub/c/cover_415/4236675.webp',
    IsMine: false,
    Price: 650,
    Discount: 20,
  },
  {
    Id: '5',
    Title: 'Портрет Дориана Грея',
    Author: 'Оскар Уайльд',
    Genre: 'Драма',
    Rate: 4.6,
    ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
    IsMine: true,
    Price: 540,
    Discount: 0,
  },
  {
    Id: '6',
    Title: 'Три товарища',
    Author: 'Эрих Мария Ремарк',
    Genre: 'Драма',
    Rate: 4.8,
    ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
    IsMine: false,
    Price: 690,
    Discount: 10,
  },
  {
    Id: '7',
    Title: 'Маленький принц',
    Author: 'Антуан де Сент-Экзюпери',
    Genre: 'Драма',
    Rate: 4.9,
    ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
    IsMine: false,
    Price: 430,
    Discount: 0,
  },
  {
    Id: '8',
    Title: 'Шантарам',
    Author: 'Грегори Дэвид Робертс',
    Genre: 'Драма',
    Rate: 4.7,
    ImageUrl: 'https://cv6.litres.ru/pub/c/cover_415/4236675.webp',
    IsMine: false,
    Price: 980,
    Discount: 12,
  },
];

const BookCarousel: FC = () => {
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
    <div  className={styles.recomms_row_main}>
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
        {testBooks.map((book) => (
          <RecommPreview key={book.Id} color="blue" book={book} />
        ))}
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
