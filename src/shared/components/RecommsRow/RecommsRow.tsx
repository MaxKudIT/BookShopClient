import type { FC } from 'react';
import styles from './RecommsRow.module.scss'
import type { BookPreviewT } from '../../types';
import { MdHistory } from "react-icons/md";

import { GrFormNext } from 'react-icons/gr';
import RecommPreview from './RecommPreview/RecommPreview';
import { FaRegCompass } from 'react-icons/fa6';
import { IoCompassOutline } from 'react-icons/io5';
import { Divider } from '@mui/material';




const RecommsRow: FC<{ books: BookPreviewT[] }> = ({ books }) => {
    const genres: string[] = ['История', 'Детективы', 'Научная фантастика', 'Психология', 'Технологии', 'Философия', 'Документальные']
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.recomms_row_wrapper}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', columnGap: 10 }}>
                        <IoCompassOutline style={{ fontSize: 29, color: '#ba8aea' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
                            <p style={{
                                fontSize: 23,
                                fontWeight: 800,
                                color: '#F9FAFBFF',
                                fontFamily: 'Montserrat'
                            }}>Личные рекомендации</p>
                            <p style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: '#BAC1CEFF',
                                fontFamily: 'Inter'
                            }}>Создано специально для вас</p>
                        </div>
                    </div>

                </div>

                <div className={styles.recomms_row_main}>
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

                </div>
            </div>
            <div className={styles.side_info_block}>
                <p style={{

                    fontSize: 17,
                    fontWeight: 800,
                    color: '#BAC1CEFF'
                }}>ПОПУЛЯРНЫЕ ЖАНРЫ</p>
                <Divider sx={{ borderBottomWidth: 2, my: 2, mb: 4, borderColor: '#30374666' }} />
                <div style={{
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    rowGap: 10, 
                    columnGap: 10}}>
                    {genres.map(genre => <GenreWrapper genre={genre}/>)}
                </div>
                <MaxPremiumWrapper/>
             
            </div>
        </div>

    )


}

export default RecommsRow;


const GenreWrapper: FC<{genre: string}> = ({genre}) => {
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

const MaxPremiumWrapper = () => {
    return (
        <div>
            <p>Подписка Max Premium</p>
            <img style={{width: 195, height: 150}} src="/public/premium.png" alt="" />
        </div>
    )
}