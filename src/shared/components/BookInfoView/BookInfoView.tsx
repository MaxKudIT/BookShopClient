import React, { useCallback, useEffect, useMemo, useState, type FC, type JSX } from "react";
import styles from './BookInfoView.module.scss'
import type { BookInfoT, Genres } from "../../types";
import { FaRegStar, FaRegUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa"
import { FaStarHalfAlt } from "react-icons/fa";
import { MdAttachMoney, MdCurrencyRuble, MdOutlineAttachMoney, MdOutlineDateRange, MdOutlineShoppingCart } from "react-icons/md";
import { FiTag } from "react-icons/fi";
import { IoBookOutline, IoCheckmarkCircle, IoTimeOutline } from "react-icons/io5";
import BookInfoComponent from "../BookInfoComponent/BookInfoComponent";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton } from "@mui/material";
import { buttonStyles, buttonStyles2 } from "./muiStyles";
import { formatDateToRussian, getHoursWord, getMinutesWord, getPagesWord } from "../../helpers/format";
import { LuBookOpenText } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ColorChoiceFunc, ColorChoiceFuncForBookInfo } from "../../helpers/colorChoice";
import useDominantColor from "../../hooks/useDominantColor";
import { RiMoneyDollarCircleLine } from "react-icons/ri";


export type RequestingState = {
    loading: boolean,
    error: string | null,
    handleBuy: () => void,

    loading2: boolean,
    error2: string | null,
    hanldleAddItem: (bookId: string) => void,

    loading3: boolean,
    error3: string | null,
    handleDeleteItem: (bookId: string[]) => void


}


export const rateStars = (rate: number, maxStars: number = 5): JSX.Element[] => {
    const fullStars = Math.floor(rate);
    const remainder = rate % 1;
    const hasHalfStar = remainder >= 0.2;

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


const BookInfoView: FC<BookInfoT & RequestingState> = ({
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
    Id,

    loading,
    handleBuy,
    error,

    loading2,
    error2,
    hanldleAddItem,

    isInCart,

    loading3,
    error3,
    handleDeleteItem

}) => {





    const navigate = useNavigate();

    const [dialog, setDialog] = useState(false)

    const textEvent = (state: { error: string | null }): string => {

        if (state.error) {
            return 'Произошла ошибка, повторите операцию позже'
        }

        return 'Покупка была успешно произведена!'


    }

    const DiscountPrice = Math.floor(Price - (Price / 100 * Discount))




    const calculateFormat = useMemo(() => {
        if (ReadingTime.trim().endsWith('m')) {
            const rt = ReadingTime.slice(0, -1)
            return getMinutesWord(Number(rt))
        }
        return getHoursWord(Number(ReadingTime))
    }, [ReadingTime])


    const firstRowComponent = [
        { title: 'Дата выхода', info: formatDateToRussian(CreatedDate), icon: MdOutlineDateRange },
        { title: 'Жанр', info: Genre, icon: FiTag }
    ]
    const secondRowComponent = [
        { title: 'Страниц', info: getPagesWord(PagesCount), icon: IoBookOutline },
        { title: 'Время чтения', info: calculateFormat, icon: IoTimeOutline }
    ]



    return (

        <div className={styles.book_info_wrapper}>



            <Dialog
                onClose={() => { setDialog(false); navigate('/mybooks') }}
                open={dialog}
                slotProps={{
                    paper: {
                        sx: {
                            outline: 'none',
                            background: `
                                linear-gradient(145deg, 
                                rgba(20, 39, 131, 1) 0%, 
                                rgba(37, 58, 180, 1) 30%, 
                                rgba(98, 38, 211, 1) 70%
                                )
                            `,
                            color: 'white',
                            borderRadius: 3,

                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                        }
                    },
                    backdrop: {
                        sx: {
                            backdropFilter: 'blur(3px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        }
                    }
                }}
                fullWidth
            >
                <DialogTitle>
                    Результат покупки
                    <IconButton
                        onClick={() => { setDialog(false); navigate('/mybooks') }}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'white',

                        }}
                    >
                        <IoClose />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {textEvent({ error })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setDialog(false); navigate('/mybooks') }} sx={{ color: 'white' }}>Продолжить</Button>

                </DialogActions>
            </Dialog>


            <div className={styles.book_first_block}>
                <div className={styles.book_preview_wrapper}>
                    <div className={styles.book_image_div}>
                        <img
                            alt=""
                            src={ImageUrl}
                            style={{
                                width: '100%',
                                height: '100%'
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
                        <p style={{ fontSize: 27, fontWeight: 'bold', color: ColorChoiceFuncForBookInfo(Genre as Genres) }}>{Title}</p>
                        <div style={{ display: 'flex', columnGap: 7, marginTop: 7 }}>
                            <FaRegUser style={{ fontSize: 15, color: 'white' }} />
                            <p style={{ fontSize: 15, letterSpacing: 0.2, color: 'white' }}>{Author}</p>
                        </div>
                    </div>
                    <Divider sx={{ my: 2, borderColor: 'rgba(94, 67, 156, 1)' }} />
                    <p style={{ color: 'rgba(255,255,255,0.6', fontSize: 14, letterSpacing: 0.2, textAlign: 'justify', lineHeight: 1.5, marginBottom: 15 }}>
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
                                <p style={{ fontSize: 18, color: 'rgba(67, 209, 24, 1)', fontWeight: '500' }}>В наличии</p>
                            </div>
                            <div style={{
                                width: '100%',
                                paddingTop: '20px',

                                rowGap: 20,
                                display: 'flex',
                                flexDirection: 'column',

                            }}>
                                <Button
                                    onClick={() => navigate(`/books/${Id}/pages/1`)}
                                    sx={buttonStyles}
                                    variant="contained"

                                >
                                    <LuBookOpenText style={{ fontSize: 18 }} />
                                    <p>Читать электронную книгу</p>
                                </Button>
                                {isInCart ? (
                                    <Button
                                        onClick={async () => {
                                            await handleDeleteItem([Id])
                                            navigate('/')

                                        }}
                                        sx={buttonStyles2}
                                        variant="contained"

                                    >
                                        {loading3 ? <CircularProgress
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 1,
                                                color: 'white',

                                            }}

                                        /> : <>
                                            <MdOutlineShoppingCart style={{ fontSize: 18 }} />
                                            <p>Удалить из корзины</p>
                                        </>}

                                    </Button>
                                ) : (
                                    <Button
                                        onClick={async () => {
                                            await hanldleAddItem(Id);
                                            navigate('/')

                                        }}
                                        sx={buttonStyles2}
                                        variant="contained"

                                    >
                                        {loading2 ? <CircularProgress
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 1,
                                                color: 'white',

                                            }}

                                        /> : <>
                                            <MdOutlineShoppingCart style={{ fontSize: 18 }} />
                                            <p>В корзину (с доставкой)</p>
                                        </>}

                                    </Button>
                                )}

                            </div>


                        </>
                    ) : (
                        <>
                            <div style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
                                {Price === 0 ? (
                                    <p style={{ fontSize: 22, color: '#c386ebff', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>Бесплатно</p>
                                ) : (
                                    Discount !== 0 ? (
                                        <>
                                            <p style={{ fontSize: 22, color: '#c386ebff', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
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
                            <div style={{
                                width: '100%',
                                paddingTop: '20px',

                                rowGap: 20,
                                display: 'flex',
                                flexDirection: 'column',

                            }}>
                                <Button
                                    onClick={async () => {
                                        await handleBuy();
                                        setDialog(true)

                                    }}
                                    sx={buttonStyles}
                                    variant="contained"

                                >
                                    {loading ? <CircularProgress
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 1,
                                            color: 'white'
                                        }}

                                    /> : <>
                                        <RiMoneyDollarCircleLine style={{ fontSize: 20 }} />
                                        <p>Купить электронную версию</p>
                                    </>}

                                </Button>

                                {isInCart ? (
                                    <Button
                                        onClick={async () => {
                                            await handleDeleteItem([Id])
                                            navigate('/')


                                        }}
                                        sx={buttonStyles2}
                                        variant="contained"

                                    >
                                        {loading3 ? <CircularProgress
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 1,
                                                color: 'white',

                                            }}

                                        /> : <>
                                            <MdOutlineShoppingCart style={{ fontSize: 18 }} />
                                            <p>Удалить из корзины</p>
                                        </>}

                                    </Button>
                                ) : (
                                    <Button
                                        onClick={async () => {
                                            await hanldleAddItem(Id);
                                            navigate('/')

                                        }}
                                        sx={buttonStyles2}
                                        variant="contained"

                                    >
                                        {loading2 ? <CircularProgress
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 1,
                                                color: 'white',

                                            }}

                                        /> : <>
                                            <MdOutlineShoppingCart style={{ fontSize: 18 }} />
                                            <p>В корзину (с доставкой)</p>
                                        </>}

                                    </Button>
                                )}

                            </div>

                        </>
                    )}

                </div>
            </div>

            <div className={styles.book_second_block}>
                <p style={{ fontSize: 20, fontWeight: '500', color: 'white' }}>Об этой книге</p>
                <p style={{ color: 'rgba(255,255,255,0.6', fontSize: 15, letterSpacing: 0.2, textAlign: 'justify', lineHeight: 1.5 }}>
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