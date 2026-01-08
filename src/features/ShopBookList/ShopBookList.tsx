import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from './ShopBookList.module.scss'
import type { BookPreviewT, Genres } from "../../shared/types";
import BookPreview from "../../shared/components/BookPreview/BookPreview";
import { searchByPartial } from "../../shared/helpers/searchByPartial";
import { useSearch } from "../../store/context/SearchContext";
import { useGet } from "../../shared/hooks/queries";
import { Avatar, CircularProgress, Dialog } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import BookList from "../../shared/components/BookList/BookList";

export const booksPlaceholder = [
  'Гарри Поттер',
  'Человек-паук',
  'Властелин колец',
  'Голодные игры',
  'Убить пересмешника',
  'Сто лет одиночества'
];

const ShopBookList = () => {






  const { get, loading, error } = useGet<{ Books: BookPreviewT[] }>('books/all');

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
      <BookList viewPage="shop" list={books}/>
    </div>
  )
}

export default ShopBookList;