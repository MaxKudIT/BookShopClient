import { observer } from 'mobx-react-lite';
import styles from './BookInfo.module.scss'
import SelectionHeader from "../../shared/components/Header/SelectionHeader/SelectionHeader";
import SelectionFooter from "../../shared/components/Footer/SelectionFooter/SelectionFooter";
import { IoIosArrowBack, IoMdCheckmarkCircleOutline, IoMdInformationCircleOutline } from "react-icons/io";
import { FaCrown, FaRegHeart, FaRegStar } from "react-icons/fa6";
import { MdCurrencyRuble, MdOutlineShoppingCart } from "react-icons/md";
import { Divider, Tooltip } from "@mui/material";
import type { BookInfoSentenseProps } from "../../shared/components/BookInfoSentense/BookInfoSentense";
import BookInfoSentense from "../../shared/components/BookInfoSentense/BookInfoSentense";
import { PiQuotes } from "react-icons/pi";

const BookInfo = observer(() => {

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

  const sentensesEls: BookInfoSentenseProps[] = [
    { icon: IoMdInformationCircleOutline, title: 'Эксклюзивный контент', text: 'Включает дополнительные иллюстрации и карты от автора.' },
    { icon: PiQuotes, title: 'Рекомендация критиков', text: '"Шедевр современной фантастики, который нельзя пропустить"'},
    { icon: IoMdCheckmarkCircleOutline, title: 'Гарантия качества', text: 'Высококачественная печать на бумаге премиум-класса.'}
  ]
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
                fontSize: 36,
              }}>Мастер и маргарита</p>
              <div style={{
                display: 'flex',
                columnGap: 15,
                alignItems: 'center',
                marginBottom: 30
              }}>
                <p style={{ color: '#b5bece', fontWeight: 500, fontSize: 16 }}>Михаил Булгаков</p>
                <Divider orientation="vertical" sx={{ borderLeftWidth: 1, borderColor: '#44506866' }} />
                <div className={styles.rating_row}>
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar className={styles.rating_star_muted} />

                  <p className={styles.rating_text}>4.5</p>

                  <p style={{ color: '#99a2b1', marginLeft: 10, letterSpacing: 0.5 }}>(1201 отзыв)</p>
                </div>
              </div>
              <div style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6379E9FF',
                  fontWeight: 500,
                  fontSize: 22,
                  letterSpacing: 0.5
                }}>
                  <p>990</p>
                  <MdCurrencyRuble style={{ fontSize: 22 }} />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#b5bece',
                  textDecoration: 'line-through',

                }}>
                  <p>1450 ₽</p>
                </div>
              </div>
              <div className={styles.read_button_wrapper}>
                <button className={styles.read_button}>
                  <span className={styles.read_button_text}>Читать онлайн</span>
                  <span className={styles.premium_badge}>
                    <FaCrown />
                    Premium
                  </span>
                </button>
                <Tooltip
                  placement="top"
                  title={
                    <div className={styles.tooltip_content}>
                      <p className={styles.tooltip_title}>Варианты чтения</p>
                      <p>Онлайн-доступ открывается по подписке Premium.</p>
                      <p>Печатный экземпляр можно заказать через корзину.</p>
                    </div>
                  }
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [0, 10],
                          },
                        },
                      ],
                    },
                    tooltip: {
                      sx: {
                        backgroundColor: '#21252c',
                        color: '#ffffff',
                        fontSize: 12,
                        lineHeight: 1.5,
                        padding: '8px 12px',
                        borderRadius: '8px',

                      }
                    },
                    arrow: {
                      sx: {
                        color: '#333333',
                      }
                    }
                  }}
                  arrow
                >
                  <span className={styles.premium_tooltip_icon}>
                    <IoMdInformationCircleOutline />
                  </span>
                </Tooltip>
              </div>

              <div style={{ flexGrow: 1, height: 2, background: '#44506866', marginTop: '40px', marginBottom: '50px' }}></div>

              <div style={{
                display: 'flex',
                columnGap: 20,
                alignItems: 'center',
                marginBottom: 40
              }}>
                <Divider orientation="vertical" sx={{
                  borderLeftWidth: 3,
                  borderColor: '#6379E9FF',
                  height: 'calc(100% + 40px)'
                }} />
                <p style={{
                  fontSize: 17,
                  fontWeight: 500,
                  color: 'rgba(250, 249, 251, 0.92)',
                  fontStyle: 'italic',
                  letterSpacing: 0.5
                }}>"Трусость — единственный порок, который делает человека человеком. И единственный, который мешает им стать свободным."</p>
              </div>
              <p style={{ fontSize: 16, color: '#c9cfdb', fontWeight: 400, lineHeight: 1.5 }}>
                В Москве 1930-х годов появляется загадочный иностранный профессор Воланд со своей свитой. Там, где он проходит, привычный мир трещит по швам: начинают сбываться самые невероятные пророчества, люди теряют головы от жадности и трусости, а литературная элита оказывается совсем не тем, чем кажется.
              </p>

            </div>

          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 70, width: '100%', columnGap: 20 }}>
          {sentensesEls.map(el => (<BookInfoSentense text={el.text} title={el.title} icon={el.icon}/>))}
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
