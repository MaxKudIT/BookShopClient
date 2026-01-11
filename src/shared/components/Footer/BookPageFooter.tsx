import { LinearProgress, TextField } from "@mui/material"
import ButtonForPage from "../ui/Button/Button"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import styles from './BookPageFooter.module.scss'
import { useCallback, useEffect, useState, type ChangeEvent, type FC } from "react"
import { useNavigate, useParams } from "react-router-dom"




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
                    backgroundColor: 'rgba(66, 35, 107, 0.5)',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#6d0cbdff',
                    }
                }}
                    variant="determinate"
                    value={currentPage / totalPages * 100}
                    color="secondary" />
                <div className={styles.book_page_footer_second_row}>
                    <ButtonForPage onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                        <IoIosArrowBack />
                        <p>Предыдущая</p>
                    </ButtonForPage>

                    <div style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
                        <p style={{ color: 'rgba(255,255,255,0.9)' }}>Страница {currentPage} из {totalPages}</p>
                        <TextField
                            type="number"

                            value={inputPage}
                            onChange={handleInputChange}
                            placeholder="1"
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
                        <ButtonForPage onClick={() => {

                            if (inputPage === '' || Number(inputPage) < 0 || Number(inputPage) > totalPages) {
                                return
                            }
                            onPageChange(Number(inputPage))
                        }}>
                            <p>Перейти</p>
                        </ButtonForPage>
                    </div>

                    <ButtonForPage onClick={() => { onPageChange(currentPage + 1) }} disabled={currentPage === totalPages}>

                        <IoIosArrowForward />
                        <p>Следующая</p>
                    </ButtonForPage>
                </div>

            </div>


        </div>
    )
}

export default BookPageFooter