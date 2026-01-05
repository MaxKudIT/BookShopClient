
import type { FC } from 'react';
import styles from './BookPreview.module.scss'
import type { BookPreviewT } from '../../types';

import { ColorChoiceFunc } from '../../helpers/colorChoice';
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaRubleSign } from "react-icons/fa6";
import { MdCurrencyRuble } from "react-icons/md";

const Book: FC<BookPreviewT> = ({ Id, Title, Genre, ImageUrl, Price, IsMine, Discount }) => {

    const DiscountPrice = Math.floor(Price - (Price / 100 * Discount))

    return (
        <div className={styles.book_wrapper}>
            <img
                style={{
                    width: '100%',
                    height: 400,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30
                }}
                src={ImageUrl} alt="" />
            <div className={styles.desc_wrapper}>
                <p style={{ fontSize: 20, color: 'rgba(255,255,255' }}>{Title}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position: 'relative' }}>
                    <div style={{ background: ColorChoiceFunc(Genre) }} className={styles.genre_wrapper}>
                        <p>{Genre}</p>
                    </div>
                    {IsMine ? (
                        <div style={{ display: 'flex', columnGap: 5, alignItems: 'center', position: 'absolute', left: 140, top: 30 }}>
                            <IoCheckmarkCircle style={{ color: '#cecb13ff', fontSize: 25 }} />
                            <p style={{ color: '#cecb13ff', fontWeight: '500' }}>В наличии</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex', columnGap: 6, alignItems: 'center',
                            position: 'absolute', right: 5, top: 30
                        }}>
                            <p style={{ fontSize: 22, color: '#c386ebff', fontWeight: 'bold',  display: 'inline-flex', alignItems: 'center' }}>
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
                        </div>
                    )}


                </div>

            </div>

        </div>
    )
}

export default Book;