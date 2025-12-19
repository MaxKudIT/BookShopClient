
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
                    height: 450,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30
                }}
                src={image} alt="" />
            <div className={styles.desc_wrapper}>
                <p style={{ fontSize: 20, color: 'rgba(0,0,0,0.9' }}>{title}</p>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{ background: ColorChoiceFunc(genre) }} className={styles.genre_wrapper}>
                        <p>{genre}</p>
                    </div>
                    {isAvailable ? (
                         <div style={{display: 'flex', columnGap: 5, alignItems: 'center'}}>
                        <IoCheckmarkCircle style={{color: 'orange', fontSize: 25}}/>
                        <p style={{color: 'orange'}}>В наличии</p>
                        </div>
                    ) : (
                         <div style={{display: 'flex', columnGap: 5, alignItems: 'center'}}>
                        <FaRubleSign style={{color: 'orange', fontSize: 20}}/>
                        <p style={{color: 'orange', fontSize: 20, fontWeight: 'bold'}}>{price}</p>
                        </div>
                    )}
                   
                
                </div>

            </div>

        </div>
    )
}

export default Book;