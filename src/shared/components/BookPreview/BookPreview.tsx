
import type { FC, JSX } from 'react';
import styles from './BookPreview.module.scss'
import type { BookPreviewT } from '../../types';

import { ColorChoiceFunc } from '../../helpers/colorChoice';
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaRubleSign } from "react-icons/fa6";
import { MdCurrencyRuble } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ReturnRateInteger } from '../../helpers/checkIsInteger';
import { GiLaurels } from "react-icons/gi";


const Book: FC<BookPreviewT & { PageView: 'shop' | 'home' }> = ({ Id, Title, Genre, ImageUrl, Price, IsMine, Discount, PageView, Rate }) => {


    const rateCalculateDiv = (rate: number): JSX.Element => {
        if ((rate >= 4 && rate < 5)) {
            return <div style={{
                position: 'absolute',
                background: 'linear-gradient(#3da813ff, #70c71fff)',
                padding: '5px 15px',
                top: 5,
                left: 5,
                zIndex: 3
            }}>
                <p style={{ color: 'white', fontWeight: 'bold' }}>{ReturnRateInteger(Rate)}</p>
            </div>
        }

        if (rate === 5) {
            return <div style={{
                position: 'absolute',
                background: 'linear-gradient(160deg, #eacc7f 16%, #ad9c72 64%)',
                padding: '5px 10px',
                top: 5,
                left: 5,
                zIndex: 3,
                display: 'flex',
                alignItems: 'center'
            }}>
                <GiLaurels style={{
                    color: 'black',
                    fontSize: '25px',
                    clipPath: 'inset(0 50% 0 0)',
                    marginRight: '-10px'
                }} />
                <p style={{ color: 'black', fontWeight: 'bold' }}>{ReturnRateInteger(Rate)}</p>
                <GiLaurels style={{
                    color: 'black',
                    fontSize: '25px',
                    clipPath: 'inset(0 0 0 50%)', 
                    marginLeft: '-10px'
                }} />
            </div>
        }



        return <div style={{
            position: 'absolute',
            background: 'linear-gradient(gray, #5a5656ff)',
            padding: '5px 15px',
            top: 5,
            left: 5,
            zIndex: 3
        }}>
            <p style={{ color: 'white', fontWeight: 'bold' }}>{ReturnRateInteger(Rate)}</p>
        </div>

    }



    const navigate = useNavigate();


    const DiscountPrice = Math.floor(Price - (Price / 100 * Discount))
    return (
        <div onClick={() => navigate(`/books/${Id}`)} className={styles.book_wrapper}>

            {rateCalculateDiv(Rate)}
            <img
                className={styles.book_image}

                src={ImageUrl} alt="" />
            <div className={styles.desc_wrapper}>
                <p className={styles.book_title}>{Title}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position: 'relative' }}>
                    <div style={{ background: ColorChoiceFunc(Genre) }} className={styles.genre_wrapper}>
                        <p>{Genre}</p>
                    </div>
                    {PageView === 'shop' && (
                        IsMine ? (
                            <div style={{ display: 'flex', columnGap: 5, alignItems: 'center', position: 'absolute', left: 140, top: 30 }}>
                                <IoCheckmarkCircle style={{ color: '#cecb13ff', fontSize: 25 }} />
                                <p style={{ color: '#cecb13ff', fontWeight: '500' }}>В наличии</p>
                            </div>
                        ) : (
                            <div style={{
                                display: 'flex', columnGap: 6, alignItems: 'center',
                                position: 'absolute', right: 5, top: 30
                            }}>
                                {Price === 0 ? (
                                    <p style={{ fontSize: 22, color: '#c386ebff', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>Бесплатно</p>
                                ) : (
                                    Discount !== 0 ? (
                                        <>
                                            <p style={{ fontSize: 22, color: '#c09fd6ff', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
                                                {DiscountPrice}
                                                <MdCurrencyRuble color='#c386ebff' style={{ fontSize: 22 }} />
                                            </p>
                                            <p style={{
                                                fontSize: 14,
                                                color: 'gray',
                                                textDecoration: 'line-through',
                                                textDecorationColor: '#a7a7adff'
                                            }}>-{Price}</p>
                                            <div style={{
                                                padding: '4px 6px',
                                                fontSize: 13,
                                                borderRadius: 8,
                                                background: '#0b9128ff',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                -{Discount}%
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p style={{ fontSize: 22, color: '#c386ebff', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
                                                {Price}
                                                <MdCurrencyRuble color='#c386ebff' style={{ fontSize: 22 }} />
                                            </p>
                                        </>
                                    )
                                )}


                            </div>
                        ))}




                </div>

            </div>

        </div>
    )
}

export default Book;