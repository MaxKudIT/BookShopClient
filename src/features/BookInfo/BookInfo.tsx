import { useParams } from "react-router-dom";

import { observer } from 'mobx-react-lite';
import styles from './BookInfo.module.scss'
import SelectionHeader from "../../shared/components/Header/SelectionHeader/SelectionHeader";
import SelectionFooter from "../../shared/components/Footer/SelectionFooter/SelectionFooter";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegHeart, FaRegStar } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Divider } from "@mui/material";

const BookInfo = observer(() => {

  const { id } = useParams<{ id: string }>()



  // const {
  //   bookInfoStore: {
  //     book,
  //     getBookById,
  //     getBookState
  //   },
  //   cartItemsStore: {
  //     createCartItem,
  //     postCartItemsState,

  //     isInCartItem,
  //     isInCartItems,
  //     postCartItemsState2,

  //     deleteCartItems,
  //     deleteCartItemsState,

  //     count,
  //     countCartState,
  //     getCountCart
  //   },
  //   favItemsStore: {
  //     createFavItem,
  //     postFavItemsState,

  //     isInFavsItem,
  //     isInFavsItems,
  //     postFavItemsState2,

  //     deleteFavItems,
  //     deleteFavItemsState,

  //     count: favCount,
  //     countFavState,
  //     getCountFav
  //   }
  // } = useStores()



  // const handleResultBook = useCallback(async () => {
  //   if (id) {

  //     await Promise.all([
  //       getBookById(id),
  //       isInCartItem(id),
  //       isInFavsItem(id),
  //       getCountFav(),
  //       getCountCart()
  //     ])


  //   } else {
  //     console.error('Параметр id не найден')
  //   }
  // }, [getBookById])

  // useEffect(() => {
  //   handleResultBook()
  // }, [handleResultBook]);


  // const { loading, error, post } = usePost('/ub/buy');


  // const auth = getAuth();

  // const handleBuy = useCallback(async () => {
  //   try {

  //     if (id) {
  //       const idToken = await auth.currentUser?.getIdToken();
  //       await post({ BookIds: [id] }, { idToken: idToken });

  //     } else {
  //       console.error('Параметр id не найден')
  //     }

  //   } catch (err) {
  //     console.error('Ошибка покупки книг:', err);
  //   }
  // }, [post]);






  // if (getBookState.loading || postCartItemsState2.loading || postFavItemsState2.loading || countCartState.loading || countFavState.loading) {
  //   return (

  //     <CircularProgress
  //       sx={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         justifySelf: 'center',
  //         marginTop: 10,
  //         alignItems: 'center',
  //         padding: 0.5,
  //         color: 'white'
  //       }}

  //     />

  //   )
  // }

  // if (getBookState.error || postCartItemsState2.error || postFavItemsState2.error || countFavState.error || countCartState.error) {
  //   return (
  //     <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{getBookState.error || postCartItemsState2.error || postFavItemsState2.error || countFavState.error || countCartState.error}</p>
  //   )
  // }

  // if (!book) {
  //   return <p>Книга не найдена</p>;
  // }

  return (
    <div className={styles.bookinfo_page_style}>
      <SelectionHeader paddingSides={400} />
      <div className={styles.bookinfo_main_container}>
        <div className={styles.back_block}>
          <IoIosArrowBack style={{ fontSize: 16, marginBottom: 2 }} />
          <p>Назад в каталог</p>
        </div>
        <div className={styles.bookinfo_container}>
          <div className={styles.first_column_wrapper}>
            <img className={styles.book_image} src={'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506'} alt="" />
            <div style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
              <button className={styles.first_column_button}>
                <FaRegHeart />
                <p>В избранное</p>
              </button>
              <button className={styles.first_column_button}>
                <MdOutlineShoppingCart />
                <p>В корзину</p>
              </button>
            </div>
          </div>

          <div className={styles.second_column_wrapper}>
            <div className={styles.genre_wrapper}>
              Драма
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
              <p style={{
                color: '#FAF9FBFF',
                fontWeight: 700,
                fontSize: 40,
              }}>Мастер и маргарита</p>
              <div style={{ display: 'flex', columnGap: 15, alignItems: 'center' }}>
                <p style={{ color: '#b5bece', fontWeight: 500 }}>Михаил Булгаков</p>
                <Divider orientation="vertical" sx={{ borderLeftWidth: 1, borderColor: '#44506866' }} />
                <div className={styles.rating_row}>
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar className={styles.rating_star_muted} />

                  <p className={styles.rating_text}>4.5</p>

                  <p style={{color: '#99a2b1', marginLeft: 10}}>(1201 отзыв)</p>
                </div>
              </div>


            </div>

          </div>
        </div>

      </div>
      {/* <BookInfoView
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

      /> */}
      <SelectionFooter />
    </div>

  )
})

export default BookInfo;