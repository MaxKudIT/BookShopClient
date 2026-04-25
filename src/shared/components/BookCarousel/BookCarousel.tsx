import { useState, type FC } from 'react';
import type { BookPreviewT } from '../../types';
import styles from './BookCarousel.module.scss'
import { IoIosArrowBack } from 'react-icons/io';
import RecommPreview from '../RecommsRow/RecommPreview/RecommPreview';
import { GrFormNext } from 'react-icons/gr';


const BookCarousel: FC<{ books: BookPreviewT[] }> = ({ books }) => {
  return (
    <div className={styles.recomms_row_main}>
      <button className={styles.icon_wrapper}>
        <IoIosArrowBack className={styles.next_or_back} />
      </button>
      <div style={{display: 'flex', flexGrow: 1, overflowX: 'hidden', columnGap: 70}}>
      
        <RecommPreview color='purple' book={{
          Id: '1',
          Title: 'Мастер и Маргарита',
          Author: 'Михаил Булгаков',
          Genre: 'Драма',
          Rate: 4.9,
          ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
          IsMine: true,
          Price: 800,
          Discount: 10

        }} />
         <RecommPreview color='purple' book={{
          Id: '1',
          Title: 'Мастер и Маргарита',
          Author: 'Михаил Булгаков',
          Genre: 'Драма',
          Rate: 4.9,
          ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
          IsMine: true,
          Price: 800,
          Discount: 10

        }} />
         <RecommPreview color='purple' book={{
          Id: '1',
          Title: 'Мастер и Маргарита',
          Author: 'Михаил Булгаков',
          Genre: 'Драма',
          Rate: 4.9,
          ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
          IsMine: true,
          Price: 800,
          Discount: 10

        }} />
        <RecommPreview color='purple' book={{
          Id: '1',
          Title: 'Мастер и Маргарита',
          Author: 'Михаил Булгаков',
          Genre: 'Драма',
          Rate: 4.9,
          ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
          IsMine: true,
          Price: 800,
          Discount: 10

        }} />
        <RecommPreview color='purple' book={{
          Id: '1',
          Title: 'Мастер и Маргарита',
          Author: 'Михаил Булгаков',
          Genre: 'Драма',
          Rate: 4.9,
          ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
          IsMine: true,
          Price: 800,
          Discount: 10

        }} />
        <RecommPreview color='purple' book={{
          Id: '1',
          Title: 'Мастер и Маргарита',
          Author: 'Михаил Булгаков',
          Genre: 'Драма',
          Rate: 4.9,
          ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
          IsMine: true,
          Price: 800,
          Discount: 10

        }} />
        <RecommPreview color='purple' book={{
          Id: '1',
          Title: 'Мастер и Маргарита',
          Author: 'Михаил Булгаков',
          Genre: 'Драма',
          Rate: 4.9,
          ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
          IsMine: true,
          Price: 800,
          Discount: 10

        }} />
        <RecommPreview color='purple' book={{
          Id: '1',
          Title: 'Мастер и Маргарита',
          Author: 'Михаил Булгаков',
          Genre: 'Драма',
          Rate: 4.9,
          ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
          IsMine: true,
          Price: 800,
          Discount: 10

        }} />
      </div>

      <button className={styles.icon_wrapper}>
        <GrFormNext style={{ fontSize: 25 }} className={styles.next_or_back} />
      </button>

    </div>
  )

};

export default BookCarousel;