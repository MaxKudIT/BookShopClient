import { useParams } from "react-router-dom";
import BookInfoView from "../../shared/components/BookInfoView/BookInfoView";
import { useGet } from "../../shared/hooks/queries";
import type { BookInfoT } from "../../shared/types";
import { useCallback, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { CircularProgress } from "@mui/material";
const BookInfo = () => {

    const {id} = useParams<{id: string}>()

     const { get, loading, error } = useGet<{ book: BookInfoT }>(`/books/${id}`);

  const [book, setBook] = useState<BookInfoT>()
    
  const auth = getAuth()

  const handleData = useCallback(async () => {
    try {

      const idToken = await auth.currentUser?.getIdToken();

      const bookData = await get({ idToken: idToken });
      console.log
      setBook(bookData.book);
    } catch (err) {
      console.error('Ошибка загрузки книги:', err);
    }
  }, [get]);


  useEffect(() => {
    handleData();
  }, [handleData]);






  if (loading ) {
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

  if (error) {
    return (
        <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{error}</p>
    )
  }

  if (!book) {
    return <p>Книга не найдена</p>;
  }

    return (
       <BookInfoView 
       Genre={book.Genre} 
       Title={book.Title} 
       PagesCount={book.PagesCount} 
       Description={book.Description} 
       AboutBook={book.AboutBook} 
       Quote={book.Quote} 
       CreatedDate={book.CreatedDate} 
       ReadingTime={book.ReadingTime} 
       Price={book.Price} 
       Discount={book.Discount} 
       Author={book.Author} 
       ImageUrl={book.ImageUrl} 
       Rate={book.Rate} 
       IsMine={book.IsMine} />
    )
}

export { BookInfo };