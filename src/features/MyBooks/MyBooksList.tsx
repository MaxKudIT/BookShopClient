import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from './MyBooksList.module.scss'
import type { BookPreviewT, Genres } from "../../shared/types";
import { useGet } from "../../shared/hooks/queries";
import { getAuth } from "firebase/auth";
import { CircularProgress } from "@mui/material";
import BookList from "../../shared/components/BookList/BookList";



const MyBooksList = () => {


  const { get, loading, error } = useGet<{Books: BookPreviewT[]}>('books/my');
  
  const [books, setBooks] = useState<BookPreviewT[]>([])

  const auth = getAuth()

  const handleData = useCallback(async () => {
    try {

      const idToken = await auth.currentUser?.getIdToken();

      const booksData = await get({ idToken: idToken });
      setBooks(booksData.Books);
    } catch (err) {
      console.error('Ошибка загрузки книг:', err);
    }
  }, [get]);


  useEffect(() => {
    handleData();
  }, [handleData]);






  if (loading) {
    return (
      <div className={styles.books_global_style}>
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
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.books_global_style}>
        <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{error}</p>
      </div>
    )
  }

  return (
    <div className={styles.books_global_style}>
      <BookList viewPage="home" list={books}/>
    </div>
  )
}

export default MyBooksList;