import React, { useCallback, useEffect, useState } from "react";

import styles from './BookPage.module.scss'
import DynamicMarkdownContent from "../../shared/components/DynamicMarkdownContent/DynamicMarkdownContent";
import { useParams } from "react-router-dom";
import { useGet } from "../../shared/hooks/queries";
import type { PageInfoT } from "../../shared/types";
import { getAuth } from "firebase/auth";
import { CircularProgress } from "@mui/material";
import { useStores } from "../../store/context/GloabalContext";
import BPHeader from "../../shared/components/Header/BookPage/BPHeader";
import { observer } from "mobx-react-lite";
import BookPageFooter from "../../shared/components/Footer/BookPageFooter";




const BookPageF = observer(() => {


    const {id, pageNumber} = useParams()

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

    if (book && page && pagesCount) {
        return (
            <>
                <BPHeader title={book.Title} author={book.Author} />
                <div className={styles.book_page_block_style}>
                    <div className={styles.book_page_block_style_inner}>
                        <DynamicMarkdownContent content={page.Text} />
                    </div>
                </div>
                <BookPageFooter totalPages={pagesCount} currentPage={1}/>
            </>

        )
    }



})

export default BookPageF;