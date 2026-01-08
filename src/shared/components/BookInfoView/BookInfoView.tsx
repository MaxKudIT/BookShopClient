import React, { type FC, type JSX } from "react";
import styles from './BookInfoView.module.scss'
import type { BookInfoT } from "../../types";
import { FaRegStar, FaRegUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa"
import { FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineDateRange, MdOutlineShoppingCart } from "react-icons/md";
import { FiTag } from "react-icons/fi";
import { IoBookOutline, IoTimeOutline } from "react-icons/io5";
import BookInfoComponent from "../BookInfoComponent/BookInfoComponent";
import { Button, Divider } from "@mui/material";
import { buttonStyles } from "./muiStyles";
import { formatDateToRussian, getHoursWord, getPagesWord } from "../../helpers/format";


const BookInfoView: FC<BookInfoT> = ({
    Rate,
    Title,
    PagesCount,
    AboutBook,
    Quote,
    CreatedDate,
    ReadingTime,
    Price,
    Discount,
    Author,
    Genre,
    ImageUrl,
    Description,
    IsMine
}) => {


    const rateStars = (rate: number, maxStars: number = 5): JSX.Element[] => {
    const fullStars = Math.floor(rate);
    const remainder = rate % 1;
    const hasHalfStar = remainder >= 0.5;
    
    const stars: JSX.Element[] = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <FaStar 
                key={`full-${i}`} 
                style={{ color: '#e0c320ff', fontSize: 19 }} 
            />
        );
    }
    
   
    if (hasHalfStar && fullStars < maxStars) {
        stars.push(
            <FaStarHalfAlt 
                key="half" 
                style={{ color: '#e0c320ff', fontSize: 19 }} 
            />
        );
    }
    
 
    const totalStars = fullStars + (hasHalfStar ? 1 : 0);
    for (let i = totalStars; i < maxStars; i++) {
        stars.push(
            <FaRegStar 
                key={`empty-${i}`} 
                style={{ color: '#e0c320ff', fontSize: 19 }} 
            />
        );
    }
    
    return stars;
};




    const firstRowComponent = [
        { title: 'Дата выхода', info: formatDateToRussian(CreatedDate), icon: MdOutlineDateRange },
        { title: 'Жанр', info: Genre, icon: FiTag }
    ]
    const secondRowComponent = [
        { title: 'Страниц', info: getPagesWord(PagesCount), icon: IoBookOutline },
        { title: 'Время чтения', info: `~${getHoursWord(Number(ReadingTime))}`, icon: IoTimeOutline }
    ]


    return (
        <div className={styles.book_info_wrapper}>

            <div className={styles.book_first_block}>
                <div className={styles.book_preview_wrapper}>
                    <div className={styles.book_image_div}>
                        <img
                            alt=""
                            src={ImageUrl}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 30
                            }}
                        />
                    </div>

                    <div className={styles.book_rate_block}>
                        <div style={{ display: 'flex', columnGap: 2 }}>

                            {rateStars(Rate)}
                        </div>
                        <div style={{ display: 'flex', columnGap: 4 }}>
                            <p style={{ color: 'rgba(255,255,255,0.6', fontSize: 17 }}>{Rate}</p>
                            <p style={{ color: 'rgba(255,255,255,0.6', fontSize: 17 }}>(Рейтинг)</p>
                        </div>

                    </div>
                </div>

                <div className={styles.book_info_second_column}>
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                        <p style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>{Title}</p>
                        <div style={{ display: 'flex', columnGap: 5 }}>
                            <FaRegUser style={{ fontSize: 14, color: '#c386ebff' }} />
                            <p style={{ fontSize: 14, letterSpacing: 0.2, color: '#c386ebff' }}>{Author}</p>
                        </div>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.6', fontSize: 14, letterSpacing: 0.2, textAlign: 'justify', lineHeight: 1.5 }}>
                        {Description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {firstRowComponent.map(el => (<BookInfoComponent title={el.title} icon={el.icon} info={el.info} />))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {secondRowComponent.map(el => (<BookInfoComponent title={el.title} icon={el.icon} info={el.info} />))}
                    </div>

                    <Divider sx={{ my: 2, borderColor: 'rgba(94, 67, 156, 1)' }} />

                    <div style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
                        <p style={{ fontSize: 26, color: '#c386ebff', fontWeight: 'bold' }}>599Р</p>
                        <p style={{
                            fontSize: 16,
                            color: 'gray',
                            textDecoration: 'line-through',
                            textDecorationColor: '#a7a7adff'
                        }}>{Price}</p>
                        <div style={{
                            padding: '5px 7px',
                            fontSize: 14,
                            borderRadius: 8,
                            background: '#0b9128ff',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            -{Discount}
                        </div>
                    </div>
                    <Button

                        sx={buttonStyles}
                        variant="contained"

                    >
                        <MdOutlineShoppingCart style={{ fontSize: 18 }} />
                        <p>Купить сейчас</p>
                    </Button>
                </div>
            </div>

            <div className={styles.book_second_block}>
                <p style={{ fontSize: 20, fontWeight: '500', color: 'white' }}>Об этой книге</p>
                <p style={{ color: 'rgba(255,255,255,0.6', fontSize: 14, letterSpacing: 0.2, textAlign: 'justify', lineHeight: 1.5 }}>
                    {AboutBook}
                </p>
                <div className={styles.quote_style}>
                    {Quote}
                </div>
            </div>


        </div>
    )
}

export default BookInfoView;