import { useParams } from "react-router-dom";
import BookInfoView from "../../shared/components/BookInfoView/BookInfoView";
import type { BookInfoT } from "../../shared/types";
import { useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useStores } from "../../store/context/GloabalContext";
import { observer } from 'mobx-react-lite';

const BookInfo = observer(() => {

    const {id} = useParams<{id: string}>()


    
  const {
    bookInfoStore: {
      book,
      getBookById,
      getBookState
    }
  } = useStores()



  const handleGetBook = useCallback(async () => {
     if (id) {
      await getBookById(id)

    } else {
      console.error('Параметр id не найден')
    }
  }, [getBookById]) 

  useEffect(() => {
      handleGetBook()
    
  }, [handleGetBook]);






  if (getBookState.loading) {
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

  if (getBookState.error) {
    return (
        <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{getBookState.error}</p>
    )
  }

  if (!book) {
    return <p>Книга не найдена</p>;
  }

    return (
       <BookInfoView 
       Id={id!}
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
})

export default BookInfo;