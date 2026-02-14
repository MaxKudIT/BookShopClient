import React, { useCallback, useEffect, useState } from "react";

import styles from './BookPage.module.scss'
import DynamicMarkdownContent from "../../shared/components/DynamicMarkdownContent/DynamicMarkdownContent";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useStores } from "../../store/context/GloabalContext";
import BPHeader from "../../shared/components/Header/BookPage/BPHeader";
import { observer } from "mobx-react-lite";
import BookPageFooter from "../../shared/components/Footer/BookPageFooter";
import type { Genres } from "../../shared/types";




const BookPageF = observer(() => {


    const { id, pageNumber } = useParams()
    const navigate = useNavigate();


    const onPageChange = (page: number) => {
        if (!id || !page) {
            console.error('Параметров не обнаружено');
            return
        }

        navigate(`/books/${id}/pages/${page}`)
    }

    const {
        bookPageStore: {
            page,
            pagesCount,

            getPageById,
            getPageState,
            getPagesCount,
            getPagesCountState
        },
        bookInfoStore: {
            book
        }
    } = useStores()



    const handleGetBook = useCallback(async () => {
        if (id && pageNumber) {
            await Promise.all([
                getPageById(id, pageNumber),
                getPagesCount(id)
            ]);

            console.log('Оба запроса завершены');
        } else {
            console.error('Параметр id или pageNumber не найден')
        }
    }, [id, pageNumber, getPagesCount, getPageById])

    useEffect(() => {
        handleGetBook()

    }, [handleGetBook]);




    if (getPageState.loading || getPagesCountState.loading) {
        return (

            <CircularProgress
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    justifySelf: 'center',
                    marginTop: 10,
                    alignItems: 'center',
                    padding: 0.5,
                    color: 'white'
                }}

            />

        )
    }

    if (getPageState.error || getPagesCountState.error) {
        return (
            <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{getPageState.error || getPagesCountState.error}</p>
        )
    }

    if (!book || !page || !pagesCount) {
        return (
            <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>
                Данные не найдены
            </p>
        );
    }

    const currentPage = parseInt(pageNumber || '1');

    if (book && page && pagesCount) {
        return (
            <>
                <BPHeader genre={book.Genre as Genres} title={book.Title} author={book.Author} />
                <div className={styles.book_page_block_style}>
                    <div className={styles.book_page_block_style_inner}>
                        <DynamicMarkdownContent content={page.Text} />
                    </div>
                </div>
                <BookPageFooter onPageChange={onPageChange} totalPages={pagesCount} currentPage={currentPage} />
            </>

        )
    }



})

export default BookPageF;