import React, { type FC, type JSX } from "react";
import styles from './BookInfoView.module.scss'
import type { BookInfoT } from "../../types";
import { FaRegStar, FaRegUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa"
import { FaStarHalfAlt } from "react-icons/fa";
import { MdCurrencyRuble, MdOutlineDateRange, MdOutlineShoppingCart } from "react-icons/md";
import { FiTag } from "react-icons/fi";
import { IoBookOutline, IoCheckmarkCircle, IoTimeOutline } from "react-icons/io5";
import BookInfoComponent from "../BookInfoComponent/BookInfoComponent";
import { Button, Divider } from "@mui/material";
import { buttonStyles } from "./muiStyles";
import { formatDateToRussian, getHoursWord, getPagesWord } from "../../helpers/format";
import { LuBookOpenText } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

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
    IsMine,
    Id

}) => {

    const navigate = useNavigate();


    const DiscountPrice = Math.floor(Price - (Price / 100 * Discount))

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
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 4 }}>
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
                    {IsMine ? (
                        <>
                            <div style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
                                 <IoCheckmarkCircle style={{ color: 'rgba(68, 190, 30, 1)', fontSize: 28 }} />
                            <p style={{fontSize: 18, color: 'rgba(67, 209, 24, 1)', fontWeight: '500' }}>В наличии</p>
                            </div>
                            <Button
                                onClick={() => navigate(`/books/${Id}/pages/1`)}
                                sx={buttonStyles}
                                variant="contained"

                            >
                                <LuBookOpenText style={{ fontSize: 18 }} />
                                <p>Читать книгу</p>
                            </Button>
                        </>
                    ) : (
                        <>
                            <div style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
                                <p style={{ fontSize: 26, color: '#c386ebff', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
                                    {DiscountPrice}
                                    <MdCurrencyRuble color='#c386ebff' style={{ fontSize: 22 }} />
                                </p>
                                <p style={{
                                    fontSize: 16,
                                    color: 'gray',
                                    textDecoration: 'line-through',
                                    textDecorationColor: '#a7a7adff'
                                }}>{Price}р</p>
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
                                    -{Discount}%
                                </div>
                            </div>
                            <Button
                             
                                sx={buttonStyles}
                                variant="contained"

                            >
                                <MdOutlineShoppingCart style={{ fontSize: 18 }} />
                                <p>Купить сейчас</p>
                            </Button>
                        </>
                    )}

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