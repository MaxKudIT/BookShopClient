import type { FC } from 'react';
import styles from './RecommsCart.module.scss'

import { MdHistory, MdNavigateNext, MdOutlineWorkspacePremium } from "react-icons/md";

import { GrFormNext } from 'react-icons/gr';

import { FaRegCompass } from 'react-icons/fa6';
import { IoCompassOutline } from 'react-icons/io5';
import { Divider } from '@mui/material';
import { IoIosArrowBack, IoIosCheckmarkCircleOutline } from 'react-icons/io';
import type { BookPreviewT } from '../../../types';
import RecommPreview from '../RecommPreview/RecommPreview';




const RecommsCart: FC<{ books: BookPreviewT[] }> = ({ books }) => {
    const genres: string[] = ['История', 'Детективы', 'Научная фантастика', 'Психология', 'Технологии', 'Философия', 'Документальные']
    return (

        <div className={styles.recomms_row_wrapper}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', paddingLeft: 80}}>



                <p style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#F9FAFBFF',
                    fontFamily: 'MTSWide'
                }}>Ваш также может понравиться</p>




            </div>

            <div className={styles.recomms_row_main}>
                <button className={styles.icon_wrapper}>
                    <IoIosArrowBack className={styles.next} />
                </button>
                <RecommPreview book={{
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
                <RecommPreview book={{
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
                <RecommPreview book={{
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
                <RecommPreview book={{
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
                <RecommPreview book={{
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
                <button className={styles.icon_wrapper}>
                    <GrFormNext style={{fontSize: 25}} className={styles.next} />
                </button>

            </div>
        </div>





    )


}

export default RecommsCart;


const GenreWrapper: FC<{ genre: string }> = ({ genre }) => {
    return (
        <div style={{
            borderRadius: 14,
            padding: '7px 15px',
            background: '#30374666',
            fontSize: 12,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'rgb(228, 231, 235)',
            width: 'fit-content',
            fontWeight: 700
        }}>
            {genre}
        </div>
    )
}