import type { FC } from 'react';
import styles from './FavBookPreview.module.scss'
import { FaRegStar, FaRegTrashAlt } from "react-icons/fa";
import type { BookPreviewT } from '../../types';
import { Divider } from '@mui/material';
import { MdCurrencyRuble } from 'react-icons/md';


const FavBookPreview: FC<{ book: BookPreviewT }> = ({ book }) => {

    return (
        <div className={styles.fav_preview_wrapper}>
            <div>
                <img className={styles.book_image} src={book.ImageUrl} alt="" />
            </div>
            <div style={{ padding: '5px 15px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 10,

                }}>


                    <div style={{
                        color: '#BAC1CEFF',
                        display: 'flex',
                        fontSize: 12,
                        fontWeight: 600,
                        columnGap: 5,
                        alignItems: 'center'
                    }}>
                        <FaRegStar style={{ color: '#F9F9FBFF', fontSize: 14, marginBottom: 2 }} />
                        <p style={{ color: '#F9F9FBFF', fontSize: 14 }}>{book.Rate}</p>
                        <p>/</p>
                        <p>5.0</p>
                    </div>

                </div>

                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 2, padding: '0 5px' }}>
                    <p className={styles.preview_recomm_title}>{book.Title}</p>
                    <p style={{ color: '#BAC1CEFF', fontWeight: 500, fontSize: 13 }}>{book.Author}</p>
                </div>
                <p style={{
                    marginTop: 10,
                    background: '#181921FF',
                    border: '1px solid #353746FF',
                    width: 'fit-content',
                    padding: '3px 15px',
                    borderRadius: 10,
                    fontSize: 13,
                    color: '#F9F9FBFF'
                }}>Детектив</p>
            </div>

            <Divider sx={{ borderBottomWidth: 1, mt: 2, mb: 2, borderColor: '#353746FF' }} />
            <div style={{ padding: '0 15px', display: 'flex', justifyContent: 'space-between' }}>
                <p style={{
                    fontSize: 22,
                    color: '#6379e9',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: 2
                }}>
                    {899}
                    <MdCurrencyRuble style={{ fontSize: 22 }} />
                </p>
                <button onClick={() => {
                    // handleDeleteItem([Id])
                    // deleteItem(Id)
                }} className={styles.icon_wrapper}>
                    <FaRegTrashAlt className={styles.trash_button} />
                </button>
            </div>
        </div>
    )

}

export default FavBookPreview;