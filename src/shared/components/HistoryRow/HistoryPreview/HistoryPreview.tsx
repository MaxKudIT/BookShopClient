import type { FC } from 'react';
import styles from './HistoryPreview.module.scss'
import { FaRegStar } from "react-icons/fa";
import type { BookPreviewT } from '../../../types';

const HistoryPreview: FC<{ book: BookPreviewT }> = ({ book }) => {

    return (
        <div className={styles.history_preview_wrapper}>
            <div>
                <img className={styles.book_image} src={book.ImageUrl} alt="" />
            </div>
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: 10, 
                 padding: '0 10px',
                width: '100%'}}>
                <div style={{
                    color: '#BAC1CEFF', 
                    
                    display: 'flex',
                    fontSize: 12, 
                    fontWeight: 600,
                    columnGap: 5
                    }}>
                    <FaRegStar />
                    {book.Rate}
                </div>
                <p style={{color: '#BAC1CEFF', fontSize: 10, fontWeight: 700, letterSpacing: 0.2}}>ДРАМА</p>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', rowGap: 2, padding: '0 10px'}}>
                <p className={styles.preview_history_title}>{book.Title}</p>
                <p style={{color: '#BAC1CEFF', fontWeight: 500, fontSize: 12}}>{book.Author}</p>
            </div>

        </div>
    )

}

export default HistoryPreview;