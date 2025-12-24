import React from "react";
import BookPageF from "../../features/BookPage/BookPage";
import styles from './BookPageModule.module.scss'
import { IoBookOutline } from "react-icons/io5";
import { Box, Button, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Tooltip, Typography } from "@mui/material";
import { MdEmail, MdExitToApp, MdLibraryBooks, MdOutlineAccountCircle, MdPerson } from "react-icons/md";
import { PiBooks } from "react-icons/pi";
import LinearProgress from '@mui/material/LinearProgress';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ButtonForPage from "../../shared/components/ui/Button/Button";
import { AiOutlineShopping } from "react-icons/ai";
const BookPageModule = () => {
    return (
        <div className={styles.book_page_style}>
            <div className={styles.book_page_header}>
                <div className={styles.book_page_header_inner}>
                    <div className={styles.header_first_block}>
                        <div style={{
                            padding: 5,
                            background: '#6d0cbdff',
                            borderRadius: 10,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <IoBookOutline style={{ fontSize: 30, color: 'white' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                            <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.9)' }}>Человек-Паук</p>
                            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Марвелпедия</p>
                        </div>
                    </div>
                    <div className={styles.header_second_block}>
                        <AiOutlineShopping  style={{ fontSize: 35, color: 'white' }} />
                        <Tooltip
                            title={
                                <Box sx={{ p: 1, minWidth: 250 }}>

                                    <List dense disablePadding>
                                        <ListItem disablePadding sx={{ mb: 1 }}>
                                            <ListItemIcon sx={{ minWidth: 36 }}>
                                                <MdEmail fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Почта"
                                                secondary={`maks@gmail.com`}
                                            />
                                        </ListItem>


                                        <ListItem disablePadding sx={{ mb: 2 }}>
                                            <ListItemIcon sx={{ minWidth: 36 }}>
                                                <MdPerson fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Логин"
                                                secondary={`Макс001`}
                                            />
                                        </ListItem>

                                        <Divider sx={{ my: 1 }} />

                                        <ListItem
                                            disablePadding

                                            onClick={() => console.log('Переход к моим книгам')}
                                            sx={{
                                                borderRadius: 1,
                                                '&:hover': { backgroundColor: 'action.hover' }
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 36 }}>
                                                <MdLibraryBooks fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Мои книги"
                                                secondary={`5 книг`}
                                            />
                                        </ListItem>


                                        <ListItem
                                            disablePadding

                                            onClick={() => console.log('Выход')}
                                            sx={{
                                                borderRadius: 1,
                                                mt: 1,
                                                '&:hover': { backgroundColor: 'action.hover' }
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 36 }}>
                                                <MdExitToApp fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Выйти"
                                                primaryTypographyProps={{
                                                    color: 'error.main'
                                                }}
                                            />
                                        </ListItem>
                                    </List>
                                </Box>
                            }
                            placement="bottom-end"
                            arrow
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        backgroundColor: 'white',
                                        color: 'text.primary',
                                        boxShadow: 3,
                                        '& .MuiTooltip-arrow': {
                                            color: 'white',
                                        }
                                    }
                                }
                            }}
                        >
                            <IconButton sx={{ p: 0 }}>
                                <MdOutlineAccountCircle
                                    style={{
                                        fontSize: 32,
                                        color: 'white',
                                        borderRadius: 10,
                                        cursor: 'pointer'
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

            </div>
            
            <BookPageF />


            <div className={styles.book_page_footer}>
                <div className={styles.book_page_footer_inner}>
                    <LinearProgress sx={{
                        height: 5,
                        width: '100%',
                        backgroundColor: 'rgba(66, 35, 107, 0.5)',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#6d0cbdff',
                        }
                    }}
                        variant="determinate"
                        value={12}
                        color="secondary" />
                    <div className={styles.book_page_footer_second_row}>
                        <ButtonForPage>
                            <IoIosArrowBack />
                            <p>Предыдущая</p>
                        </ButtonForPage>

                        <div style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
                            <p style={{ color: 'rgba(255,255,255,0.9)' }}>Страница 1 из 5</p>
                            <TextField
                                type="number"

                                value={1}


                                variant="outlined"
                                size="small"
                                sx={{
                                    width: '75px',


                                    background: 'rgba(73, 65, 107, 0.2)',
                                    border: '1px solid rgba(66, 35, 107, 0.5)',
                                    borderRadius: 4,
                                    outline: 'none',
                                    color: 'white',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'white',
                                        textAlign: 'center',


                                        '&[type=number]': {
                                            MozAppearance: 'textfield',
                                        },
                                        '&[type=number]::-webkit-outer-spin-button': {
                                            WebkitAppearance: 'none',
                                            margin: 0,
                                        },
                                        '&[type=number]::-webkit-inner-spin-button': {
                                            WebkitAppearance: 'none',
                                            margin: 0,
                                        },
                                    },

                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'rgba(255, 255, 255, 0.6)',
                                    },

                    
                                    '& .MuiOutlinedInput-root': {
                                        

                                        '&.Mui-focused': {
                                     
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#7b6dc2', 
                                                borderWidth: '2px',
                                            },

                              
                                            backgroundColor: 'rgba(91, 79, 145, 0.2)',
                                        },


                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#343497ff',
                                            borderWidth: '1px',
                                        },

                              
                                        '&:hover': {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                                outline: 'none',
                                               
                                            },
                                            backgroundColor: 'rgba(91, 79, 145, 0.2)',
                                            borderRadius: 4
                                        },
                                    },

                                 
                                }}
                            />
                            <ButtonForPage>

                                <p>Перейти</p>
                            </ButtonForPage>
                        </div>

                        <ButtonForPage>
                            <IoIosArrowForward />
                            <p>Предыдущая</p>
                        </ButtonForPage>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default BookPageModule;