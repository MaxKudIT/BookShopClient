
import type { FC } from 'react';
import styles from './BookPreview.module.scss'
import type { BookPreviewT } from '../../types';

import { ColorChoiceFunc } from '../../helpers/colorChoice';
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaRubleSign } from "react-icons/fa6";


const Book: FC<BookPreviewT> = ({ id, title, genre, image, price, isAvailable }) => {
    return (
        <div className={styles.book_wrapper}>
            <img
                style={{
                    width: '100%',
                    height: 400,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30
                }}
                src={image} alt="" />
            <div className={styles.desc_wrapper}>
                <p style={{ fontSize: 20, color: 'rgba(255,255,255' }}>{title}</p>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position: 'relative'}}>
                    <div style={{ background: ColorChoiceFunc(genre) }} className={styles.genre_wrapper}>
                        <p>{genre}</p>
                    </div>
                    {isAvailable ? (
                         <div style={{display: 'flex', columnGap: 5, alignItems: 'center', position: 'absolute', left: 140, top: 30}}>
                        <IoCheckmarkCircle style={{color: '#cecb13ff', fontSize: 25}}/>
                        <p style={{color: '#cecb13ff', fontWeight: '500'}}>В наличии</p>
                        </div>
                    ) : (
                            <div style={{ display: 'flex', columnGap: 6, alignItems: 'center',
                                position: 'absolute', left: 120, top: 30
                            }}>
                        <p style={{ fontSize: 22, color: '#c386ebff', fontWeight: 'bold' }}>599Р</p>
                        <p style={{
                            fontSize: 14,
                            color: 'gray',
                            textDecoration: 'line-through',
                            textDecorationColor: '#a7a7adff'
                        }}>-899р</p>
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
                            -33%
                        </div>
                    </div>
                    )}
                   
                
                </div>

            </div>

        </div>
    )
}

export default Book;