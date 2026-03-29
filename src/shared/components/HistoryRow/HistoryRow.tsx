import type { FC } from 'react';
import styles from './HistoryRow.module.scss'
import type { BookPreviewT } from '../../types';
import { MdHistory } from "react-icons/md";
import HistoryPreview from './HistoryPreview/HistoryPreview';
import { GrFormNext } from 'react-icons/gr';

const HistoryRow: FC<{ books: BookPreviewT[] }> = ({ books }) => {

    return (

        <div className={styles.history_row_wrapper}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', columnGap: 10 }}>
                    <MdHistory style={{ fontSize: 30, color: '#6379e9' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
                        <p style={{
                            fontSize: 23,
                            fontWeight: 800,
                            color: '#F9FAFBFF',
                            fontFamily: 'MTSWide'
                        }}>Продолжить чтение</p>
                        <p style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#BAC1CEFF',
                     
                        }}>Ваша недавняя история просмотра книг</p>
                    </div>
                </div>
                <button className={styles.books_button}>
                    <p>Все книги</p>
                    <GrFormNext style={{ fontSize: 18 }} />
                </button>
            </div>

            <div className={styles.history_row_main}>
                <HistoryPreview book={{
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
                <HistoryPreview book={{
                    Id: '1',
                    Title: 'Человек-паук',
                    Author: 'Марвелпедия',
                    Genre: 'Фантастика',
                    Rate: 4.5,
                    ImageUrl: 'https://img.comicbooks.ru/images/products/1/7455/945601823/VGs-GD5boU8.jpg',
                    IsMine: true,
                    Price: 800,
                    Discount: 10

                }} />
                <HistoryPreview book={{
                    Id: '1',
                    Title: 'Оно',
                    Author: 'Стивен Кинг',
                    Genre: 'Ужасы',
                    Rate: 5.0,
                    ImageUrl: 'https://imo10.labirint.ru/books/600284/cover.jpg/242-0',
                    IsMine: true,
                    Price: 800,
                    Discount: 10

                }} />
                <HistoryPreview book={{
                    Id: '1',
                    Title: 'Зеленая Миля',
                    Author: 'Стивен Кинг',
                    Genre: 'Фантастика',
                    Rate: 4.9,
                    ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhhoSS4VwAoCA2l9iEe1ejrGckq7QZMp1Tw&s',
                    IsMine: true,
                    Price: 800,
                    Discount: 10

                }} />
            </div>
        </div>
    )


}

export default HistoryRow;