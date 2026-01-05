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



const ShopBookList = () => {


  


  const { searchingValue, selectedGenre } = useSearch()
  const { get, loading, error } = useGet<{Books: BookPreviewT[]}>('books/all');
  
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





  function filterBySearch(books: BookPreviewT[], searchValue: string): BookPreviewT[] {
    if (!searchValue) return books;
    return books.filter(({ Title }: BookPreviewT) => searchByPartial(searchValue, Title));
  }

  function filterByCategory(books: BookPreviewT[], genreSelected: Genres | 'Все жанры'): BookPreviewT[] {
    if (genreSelected === 'Все жанры') {
      return books
    }
    return books.filter(({ Genre }: BookPreviewT) => Genre === genreSelected);
  }


  const filteredBooks = useMemo(() => {
    
    let result: BookPreviewT[] = books;
    console.log(result)
    if (searchingValue) {
      result = filterBySearch(books, searchingValue)
    }


    if (selectedGenre !== 'Все жанры') {
      result = filterByCategory(result, selectedGenre)
    }
    
    return result;
  }, [books, searchingValue, selectedGenre, loading]);


  const countFoundBooks = filteredBooks.length;

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
      <div className={styles.title_row}>
        Найдено книг: {countFoundBooks}
      </div>

      <div className={styles.book_list_container}>
        {
          filteredBooks.map(book => (
            <BookPreview
              Price={book.Price}
              IsMine={book.IsMine}
              key={book.Id}
              Id={book.Id}
              Genre={book.Genre}
              Title={book.Title}
              ImageUrl={book.ImageUrl}
              Discount={book.Discount}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ShopBookList;