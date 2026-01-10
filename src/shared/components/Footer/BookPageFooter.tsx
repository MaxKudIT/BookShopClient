import { LinearProgress, TextField } from "@mui/material"
import ButtonForPage from "../ui/Button/Button"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import styles from './BookPageFooter.module.scss'
import type { FC } from "react"




const BookPageFooter: FC<{currentPage: number, totalPages: number}> = ({currentPage, totalPages}) => {
    return (
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
                        value={currentPage/totalPages*100}
                        color="secondary" />
                    <div className={styles.book_page_footer_second_row}>
                        <ButtonForPage disabled={currentPage === 1}>
                            <IoIosArrowBack />
                            <p>Предыдущая</p>
                        </ButtonForPage>

                        <div style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
                            <p style={{ color: 'rgba(255,255,255,0.9)' }}>Страница {currentPage} из {totalPages}</p>
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

                        <ButtonForPage disabled={currentPage === totalPages}>
                            
                            <IoIosArrowForward />
                            <p>Следующая</p>
                        </ButtonForPage>
                    </div>

                </div>


            </div>
    )
}

export default BookPageFooter