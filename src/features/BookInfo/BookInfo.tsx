import { useParams } from "react-router-dom";
import BookInfoView from "../../shared/components/BookInfoView/BookInfoView";

import { useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useStores } from "../../store/context/GloabalContext";
import { observer } from 'mobx-react-lite';
import { usePost } from "../../shared/hooks/queries";
import { getAuth } from "firebase/auth";

const BookInfo = observer(() => {

  const { id } = useParams<{ id: string }>()



  const {
    bookInfoStore: {
      book,
      getBookById,
      getBookState
    },
    cartItemsStore: {
      createCartItem,
      postCartItemsState,

      isInCartItem,
      isInCartItems,
      postCartItemsState2,

      deleteCartItems,
      deleteCartItemsState
    },
    favItemsStore: {
      createFavItem,
      postFavItemsState,

      isInFavsItem,
      isInFavsItems,
      postFavItemsState2,

      deleteFavItems,
      deleteFavItemsState
    }
  } = useStores()



  const handleResultBook = useCallback(async () => {
    if (id) {

      await Promise.all([
        getBookById(id),        
        isInCartItem(id),      
        isInFavsItem(id)       
      ])
  

    } else {
      console.error('Параметр id не найден')
    }
  }, [getBookById])

  useEffect(() => {
    handleResultBook()
  }, [handleResultBook]);


  const { loading, error, post } = usePost('/ub/buy');


  const auth = getAuth();

  const handleBuy = useCallback(async () => {
    try {

      if (id) {
        const idToken = await auth.currentUser?.getIdToken();
        await post({ BookIds: [id] }, { idToken: idToken });

      } else {
        console.error('Параметр id не найден')
      }

    } catch (err) {
      console.error('Ошибка покупки книг:', err);
    }
  }, [post]);






  if (getBookState.loading || postCartItemsState2.loading || postFavItemsState2.loading) {
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

  if (getBookState.error || postCartItemsState2.error || postFavItemsState2.error) {
    return (
      <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{getBookState.error || postCartItemsState2.error || postFavItemsState2.error}</p>
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
      IsMine={book.IsMine}

      loading={loading}
      handleBuy={handleBuy}
      error={error}

      loading2={postCartItemsState.loading}
      error2={postCartItemsState.error}
      hanldleAddItem={createCartItem}

      isInCart={isInCartItems}

      loading3={deleteCartItemsState.loading}
      error3={deleteCartItemsState.error}
      handleDeleteItem={deleteCartItems}

      isInFavs={isInFavsItems}

      loading4={postFavItemsState.loading}
      hanldleAddFavItem={createFavItem}

      loading5={deleteFavItemsState.loading}
      handleDeleteFavItem={deleteFavItems}

    />
  )
})

export default BookInfo;