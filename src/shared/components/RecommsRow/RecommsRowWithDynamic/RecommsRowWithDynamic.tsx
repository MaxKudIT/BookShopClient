import type { FC } from 'react';
import styles from './RecommsRowWithDynamic.module.scss'



import { GrFormNext } from 'react-icons/gr';

import { IoIosArrowBack, IoIosCheckmarkCircleOutline } from 'react-icons/io';
import type { BookPreviewT } from '../../../types';
import RecommPreview from '../RecommPreview/RecommPreview';
import type { IconType } from 'react-icons';

export type RecommsRowWithDynamicProps = {
    icon: IconType,
    title: string,
    description: string,
    books: BookPreviewT[],
    color: 'pink' | 'purple' | 'blue'
}


const RecommsRowWithDynamic: FC<RecommsRowWithDynamicProps> = ({ books, icon: Icon, title, description, color }) => {
    const genres: string[] = ['История', 'Детективы', 'Научная фантастика', 'Психология', 'Технологии', 'Философия', 'Документальные']

    const backgroundCalc = (type: 'pink' | 'purple' | 'blue'): string => {
        switch (type) {
            case 'purple':
                return '#5E44E41A'
            case 'pink':
                return 'rgba(145, 66, 223, 0.13)'
            case 'blue':
                return '#4477e41a'
        }
    }

     const colorCalc = (type: 'pink' | 'purple' | 'blue'): string => {
        switch (type) {
            case 'purple':
                return '#5269E0FF'
            case 'pink':
                return '#BA8AEAFF'
            case 'blue':
                return '#3f81d6'
        }
    }


    return (

        <div className={styles.recomms_row_wrapper}>
            <div style={{ 
                display: 'flex', 
                columnGap: 10, 
                marginBottom: 25,
                marginLeft: 80
                 }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 13px',
                    background: backgroundCalc(color),
                    borderRadius: 14
                }}>
                    <Icon style={{ fontSize: 28, color: colorCalc(color) }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
                    <p style={{
                        fontSize: 23,
                        fontWeight: 500,
                        color: '#F9FAFBFF',

                    }}>{title}</p>
                    <p style={{
                        fontSize: 13,

                        color: '#BAC1CEFF',

                    }}>{description}</p>
                </div>

            </div>

            <div className={styles.recomms_row_main}>
                <button className={styles.icon_wrapper}>
                    <IoIosArrowBack className={styles.next} />
                </button>
                <RecommPreview color={color} book={{
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
                <RecommPreview color={color} book={{
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
                <RecommPreview color={color} book={{
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
                <RecommPreview color={color} book={{
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
                <RecommPreview color={color} book={{
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
                    <GrFormNext style={{ fontSize: 25 }} className={styles.next} />
                </button>

            </div>
        </div>





    )


}

export default RecommsRowWithDynamic;


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