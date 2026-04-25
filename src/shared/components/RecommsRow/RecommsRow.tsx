import type { FC } from 'react';
import styles from './RecommsRow.module.scss'
import type { BookPreviewT } from '../../types';

import RecommPreview from './RecommPreview/RecommPreview';

import { IoCompassOutline } from 'react-icons/io5';
import { Divider } from '@mui/material';





const RecommsRow: FC<{ books: BookPreviewT[] }> = ({ books }) => {
    const genres: string[] = ['История', 'Детективы', 'Научная фантастика', 'Психология', 'Технологии', 'Философия', 'Документальные']
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', columnGap: 40}}>
            <div className={styles.recomms_row_wrapper}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', columnGap: 10 }}>
                        <IoCompassOutline style={{ fontSize: 29, color: '#ba8aea' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                            <p style={{
                                fontSize: 24,
                                fontWeight: 500,
                                color: '#FFFFFFFF',
                               
                            }}>Личные рекомендации</p>
                            <p style={{
                                fontSize: 14,
                       
                                color: '#BAC1CEFF',
                                
                            }}>Создано специально для вас</p>
                        </div>
                    </div>

                </div>

                <div className={styles.recomms_row_main}>
                    <RecommPreview color='pink'  book={{
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
                    <RecommPreview color='pink' book={{
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
                    <RecommPreview color='pink' book={{
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
                    <RecommPreview color='pink' book={{
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
                    columnGap: 10
                }}>
                    {genres.map(genre => <GenreWrapper genre={genre} />)}
                </div>
            

            </div>
        </div>

    )


}

export default RecommsRow;


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

// const MaxPremiumWrapper = () => {
//     return (
//         <div className={styles.premium_wrapper}>

//                 <p style={{
//                     color: '#F9FAFBFF',
//                     fontWeight: 900,
//                     fontSize: 22,
//                     fontFamily: 'Roboto',
//                     display: 'inline'
//                 }}><span style={{ fontSize: 20 }}>Подписка</span> Max Premium</p>
       

//             <img style={{ width: 225, height: 170, borderRadius: 10, marginTop: 5 }} src="/public/images/premium.png" alt="" />
//             <div style={{ display: 'flex', flexDirection: 'column', rowGap: 10 }}>
//                 <div style={{ display: 'flex', columnGap: 10, fontSize: 14, alignItems: 'center', fontWeight: 700 }}>
//                     <IoIosCheckmarkCircleOutline style={{ color: '#6379E9FF', fontSize: 17 }} />
//                     <p style={{ color: '#BAC1CEFF' }}>Безлимитный доступ</p>
//                 </div>
//                 <div style={{ 
//                     display: 'flex', 
//                     columnGap: 10, 
//                     fontSize: 14, 
//                     alignItems: 'center', 
//                     fontWeight: 700,

//                     }}>
//                     <IoIosCheckmarkCircleOutline style={{ color: '#6379E9FF', fontSize: 17,   flex: '0 0 auto' }} />
                    
//                     <p style={{ color: '#BAC1CEFF', flex: '1 1 auto' }}>Скидка на печатные экземпляры</p>
//                 </div>
//             </div>
//             <button className={styles.premium_button}>
//                 <p>Улучшить план</p>
//             </button>
//         </div>
//     )
// }
