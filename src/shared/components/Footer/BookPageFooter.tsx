import { LinearProgress, TextField } from "@mui/material"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import styles from './BookPageFooter.module.scss'
import { useCallback, useEffect, useState, type ChangeEvent, type FC } from "react"




const BookPageFooter: FC<{ currentPage: number, totalPages: number, onPageChange: (page: number) => void }> = ({ currentPage, totalPages, onPageChange }) => {

    const [inputPage, setInputPage] = useState<string>();

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (inputPage === '' || Number(inputPage) < 0 || Number(inputPage) > totalPages) {
                return;
            }
            onPageChange(Number(inputPage));
        }
    }, [inputPage, onPageChange]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            setInputPage(value);
        }
    };
    return (

        <div className={styles.book_page_footer}>
            <div className={styles.book_page_footer_inner}>
                <LinearProgress sx={{
                    height: 5,
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.07)',
                    borderRadius: 999,
                    '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #6379e9, #ffb84d)',
                        borderRadius: 999,
                    }
                }}
                    variant="determinate"
                    value={currentPage / totalPages * 100}
                    color="secondary" />
                <div className={styles.book_page_footer_second_row}>
                    <button className={styles.footer_button} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                        <IoIosArrowBack />
                        <span>Предыдущая</span>
                    </button>

                    <div className={styles.page_control}>
                        <p>Страница <span>{currentPage}</span> из {totalPages}</p>
                        <TextField
                            type="number"

                            value={inputPage}
                            onChange={handleInputChange}
                            placeholder="1"
                            variant="outlined"
                            size="small"
                            sx={{
                                width: '75px',


                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(143, 164, 255, 0.16)',
                                borderRadius: 2,
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
                                            borderColor: '#6379e9',
                                            borderWidth: '2px',
                                        },


                                        backgroundColor: 'rgba(99, 121, 233, 0.1)',
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
                                        borderRadius: 2
                                    },
                                },


                            }}
                        />
                        <button className={styles.goto_button} onClick={() => {

                            if (inputPage === '' || Number(inputPage) < 0 || Number(inputPage) > totalPages) {
                                return
                            }
                            onPageChange(Number(inputPage))
                        }}>
                            <span>Перейти</span>
                        </button>
                    </div>

                    <button className={styles.footer_button} onClick={() => { onPageChange(currentPage + 1) }} disabled={currentPage === totalPages}>

                        <IoIosArrowForward />
                        <span>Следующая</span>
                    </button>
                </div>

            </div>


        </div>
    )
}

export default BookPageFooter
