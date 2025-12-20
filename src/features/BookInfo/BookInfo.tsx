import React from "react";
import { FaStar } from "react-icons/fa";
import styles from './BookInfo.module.scss'
import { Box, Button, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import { MdOutlineDateRange } from "react-icons/md";
import { FiTag } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoBookOutline, IoTimeOutline } from "react-icons/io5";
import BookInfoComponent, { type BICProps } from "../../shared/components/BookInfoComponent/BookInfoComponent";
import { info } from "sass";
import { MdOutlineShoppingCart } from "react-icons/md";
import { buttonStyles } from "./muiStyles";

const BookInfo = () => {

    const stars = [1, 2, 3, 4, 5]
    const firstRowComponent: BICProps[] = [
        { title: 'Дата выхода', info: '11 октября 2011', icon: MdOutlineDateRange },
        { title: 'Жанр', info: 'Фантастика', icon: FiTag }
    ]
    const secondRowComponent: BICProps[] = [
        { title: 'Страниц', info: '438 страниц', icon: IoBookOutline },
        { title: 'Время чтения', info: '~8 часов', icon: IoTimeOutline }
    ]


    return (
        <div className={styles.book_info_wrapper}>

            <div className={styles.book_first_block}>
                <div className={styles.book_preview_wrapper}>
                    <div className={styles.book_image_div}>
                        <img
                            alt=""
                            src="https://cdn1.ozone.ru/s3/multimedia-3/c600/6799258983.jpg"
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 30
                            }}
                        />
                    </div>

                    <div className={styles.book_rate_block}>
                        <div style={{ display: 'flex', columnGap: 2 }}>
                            {stars.map(el => <FaStar style={{ color: '#e0c320ff', fontSize: 19 }} key={el} />)}
                        </div>
                        <div style={{ display: 'flex', columnGap: 4 }}>
                            <p style={{ color: 'rgba(255,255,255,0.6', fontSize: 17 }}>5</p>
                            <p style={{ color: 'rgba(255,255,255,0.6', fontSize: 17 }}>(Рейтинг)</p>
                        </div>

                    </div>
                </div>

                <div className={styles.book_info_second_column}>
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                        <p style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>Человек-паук</p>
                        <div style={{ display: 'flex', columnGap: 5 }}>
                            <FaRegUser style={{ fontSize: 14, color: '#c386ebff' }} />
                            <p style={{ fontSize: 14, letterSpacing: 0.2, color: '#c386ebff' }}>Марвелпедия</p>
                        </div>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.6', fontSize: 14, letterSpacing: 0.2, textAlign: 'justify', lineHeight: 1.5 }}>
                        Питер Бенджамин Паркер (англ. Peter Benjamin Parker) — молодой парень и уличный супергерой Нью-Йорка по прозвищу Человек-Паук (англ. Spider-Man). Питер являлся учеником средней школы Мидтауна, где подружился с Нэдом Лидсом и Эм-Джей, и бывшим Мстителем. В настоящее время Доктор Стрэндж стёр всему миру, включая его друзей, воспоминания о Питере Паркере, а его тётя трагично погибла, что привело к его одиночеству.
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
                        }}>-899р</p>
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
                            -33%
                        </div>
                    </div>
                    <Button
                        
                        sx={buttonStyles}
                        variant="contained"

                    >
                        <MdOutlineShoppingCart style={{fontSize: 18}}/>
                        <p>Купить сейчас</p>
                    </Button>
                </div>
            </div>

            <div className={styles.book_second_block}>
                <p style={{ fontSize: 20, fontWeight: '500', color: 'white' }}>Об этой книге</p>
                 <p style={{ color: 'rgba(255,255,255,0.6', fontSize: 14, letterSpacing: 0.2, textAlign: 'justify', lineHeight: 1.5 }}>
                    Питер Бенджамин Паркер (англ. Peter Benjamin Parker) — молодой парень и уличный супергерой Нью-Йорка по прозвищу Человек-Паук (англ. Spider-Man). Питер являлся учеником средней школы Мидтауна, где подружился с Нэдом Лидсом и Эм-Джей, и бывшим Мстителем. В настоящее время Доктор Стрэндж стёр всему миру, включая его друзей, воспоминания о Питере Паркере, а его тётя трагично погибла, что привело к его одиночеству.
                </p>
                <div className={styles.quote_style}>
                    Питер Бенджамин Паркер (англ. Peter Benjamin Parker) — молодой парень и уличный супергерой 
                </div>
            </div>
             
            
        </div>
    )
}

export { BookInfo };