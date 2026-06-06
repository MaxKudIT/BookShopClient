import { useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './BookInfo.module.scss'
import SelectionHeader from "../../shared/components/Header/SelectionHeader/SelectionHeader";
import SelectionFooter from "../../shared/components/Footer/SelectionFooter/SelectionFooter";
import { IoIosArrowBack, IoMdCheckmarkCircleOutline, IoMdInformationCircleOutline } from "react-icons/io";
import { FaCrown, FaHeart, FaRegHeart, FaRegStar } from "react-icons/fa6";
import { MdCurrencyRuble, MdOutlineShoppingCart } from "react-icons/md";
import { CircularProgress, Divider, Tooltip } from "@mui/material";
import type { BookInfoSentenseProps } from "../../shared/components/BookInfoSentense/BookInfoSentense";
import BookInfoSentense from "../../shared/components/BookInfoSentense/BookInfoSentense";
import { PiQuotes } from "react-icons/pi";
import { useStores } from '../../store/context/GloabalContext';

const fallbackImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPTPFv3U6ZVvZh0GYlNFWntSw0PJjFvqNwMA&s';

const BookInfo = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    bookInfoStore: {
      book,
      physicalBookStockInfo,
      getBookById,
      getBookState,
      getPhysicalBookStockInfo,
      getPhysicalBookStockInfoState,
    },
    cartItemsStore: {
      createCartItem,
      postCartItemsState,
      isInCartItem,
      isInCartItems,
      postCartItemsState2,
      deleteCartItems,
      deleteCartItemsState,
      getCountCart,
    },
    favItemsStore: {
      createFavItem,
      postFavItemsState,
      isInFavsItem,
      isInFavsItems,
      postFavItemsState2,
      deleteFavItems,
      deleteFavItemsState,
      getCountFav,
    },
  } = useStores();

  const sentensesEls: BookInfoSentenseProps[] = [
    { icon: IoMdInformationCircleOutline, title: 'Эксклюзивный контент', text: 'Включает дополнительные иллюстрации и карты от автора.' },
    { icon: PiQuotes, title: 'Рекомендация критиков', text: '"Шедевр современной фантастики, который нельзя пропустить"' },
    { icon: IoMdCheckmarkCircleOutline, title: 'Гарантия качества', text: 'Высококачественная печать на бумаге премиум-класса.' }
  ];

  const physicalBook = useMemo(() => {
    return physicalBookStockInfo?.PhysicalBooks.find((item) => item.StockCount > 0) ?? null;
  }, [physicalBookStockInfo]);

  const discountPrice = book
    ? Math.floor(book.Price - (book.Price / 100 * book.Discount))
    : 0;

  const isLoading = getBookState.loading || getPhysicalBookStockInfoState.loading || postFavItemsState2.loading;
  const error = getBookState.error || getPhysicalBookStockInfoState.error;

  const loadBookInfo = useCallback(async () => {
    if (!id) {
      return;
    }

    await Promise.all([
      getBookById(id),
      getPhysicalBookStockInfo(id),
      isInFavsItem(id),
      getCountFav(),
      getCountCart(),
    ]);
  }, [getBookById, getPhysicalBookStockInfo, getCountCart, getCountFav, id, isInFavsItem]);

  useEffect(() => {
    loadBookInfo();
  }, [loadBookInfo]);

  useEffect(() => {
    if (physicalBook?.Id) {
      isInCartItem(physicalBook.Id);
    }
  }, [isInCartItem, physicalBook?.Id]);

  const handleFavClick = async () => {
    if (!book || postFavItemsState.loading || deleteFavItemsState.loading) {
      return;
    }

    if (isInFavsItems) {
      await deleteFavItems([book.Id]);
    } else {
      await createFavItem(book.Id);
    }

    await Promise.all([
      isInFavsItem(book.Id),
      getCountFav(),
    ]);
  };

  const handleCartClick = async () => {
    if (!physicalBook || postCartItemsState.loading || deleteCartItemsState.loading) {
      return;
    }

    if (isInCartItems) {
      await deleteCartItems([physicalBook.Id]);
    } else {
      await createCartItem(physicalBook.Id);
    }

    await Promise.all([
      isInCartItem(physicalBook.Id),
      getCountCart(),
    ]);
  };

  if (isLoading) {
    return (
      <div className={styles.bookinfo_page_style}>
        <SelectionHeader paddingSides={400} />
        <div className={styles.bookinfo_main_container}>
          <div className={styles.state_block}>
            <CircularProgress sx={{ color: '#8da6ff' }} />
            <p>Загружаем книгу...</p>
          </div>
        </div>
        <SelectionFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.bookinfo_page_style}>
        <SelectionHeader paddingSides={400} />
        <div className={styles.bookinfo_main_container}>
          <div className={styles.error_block}>{error}</div>
        </div>
        <SelectionFooter />
      </div>
    );
  }

  if (!book) {
    return (
      <div className={styles.bookinfo_page_style}>
        <SelectionHeader paddingSides={400} />
        <div className={styles.bookinfo_main_container}>
          <div className={styles.state_block}>Книга не найдена</div>
        </div>
        <SelectionFooter />
      </div>
    );
  }

  return (
    <div className={styles.bookinfo_page_style}>
      <SelectionHeader paddingSides={400} />
      <div className={styles.bookinfo_main_container}>
        <button className={styles.back_block} onClick={() => navigate('/mainbooks')}>
          <IoIosArrowBack style={{ fontSize: 16, marginBottom: 2 }} />
          <p>Назад в каталог</p>
        </button>

        <div className={styles.bookinfo_container}>
          <div className={styles.first_column_wrapper}>
            <img className={styles.book_image} src={book.ImageUrl || fallbackImage} alt={book.Title} />
            <div style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
              <button
                className={styles.first_column_button}
                onClick={handleFavClick}
                disabled={postFavItemsState.loading || deleteFavItemsState.loading || postFavItemsState2.loading}
              >
                {isInFavsItems ? <FaHeart /> : <FaRegHeart />}
                <p>{isInFavsItems ? 'В избранном' : 'В избранное'}</p>
              </button>
              <button
                className={styles.first_column_button}
                onClick={handleCartClick}
                disabled={!physicalBook || postCartItemsState.loading || deleteCartItemsState.loading || postCartItemsState2.loading}
              >
                <MdOutlineShoppingCart />
                <p>{isInCartItems ? 'В корзине' : physicalBook ? 'В корзину' : 'Нет в наличии'}</p>
              </button>
            </div>
          </div>

          <div className={styles.second_column_wrapper}>
            <div className={styles.genre_wrapper}>
              {book.Genre}
            </div>
            <div className={styles.title_block}>
              <p className={styles.book_title}>{book.Title}</p>
              <div className={styles.meta_row}>
                <p className={styles.author_name}>{book.Author}</p>
                <Divider orientation="vertical" sx={{ borderLeftWidth: 1, borderColor: '#44506866' }} />
                <div className={styles.rating_row}>
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar className={styles.rating_star_muted} />

                  <p className={styles.rating_text}>{book.Rate}</p>

                  <p className={styles.reviews_text}>Рейтинг</p>
                </div>
              </div>
              <div className={styles.price_row}>
                <div className={styles.price_current}>
                  <p>{book.Discount !== 0 ? discountPrice : book.Price}</p>
                  <MdCurrencyRuble style={{ fontSize: 22 }} />
                </div>
                {book.Discount !== 0 && (
                  <div className={styles.price_old}>
                    <p>{book.Price} ₽</p>
                  </div>
                )}
              </div>
              <div className={styles.read_button_wrapper}>
                <button
                  className={styles.read_button}
                  onClick={() => {
                    if (book.IsMine) {
                      navigate(`/books/${book.Id}/pages/1`);
                    }
                  }}
                >
                  <span className={styles.read_button_text}>
                    {book.IsMine ? 'Читать онлайн' : 'Доступ по подписке'}
                  </span>
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
                      <p>Онлайн-доступ открывается по подписке Premium или после покупки электронной версии.</p>
                      <p>Печатный экземпляр можно заказать через корзину, если он есть в наличии.</p>
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

              <div className={styles.content_divider}></div>

              <div className={styles.quote_block}>
                <Divider orientation="vertical" sx={{
                  borderLeftWidth: 3,
                  borderColor: '#6379E9FF',
                  height: 'calc(100% + 40px)'
                }} />
                <p className={styles.quote_text}>{book.Quote}</p>
              </div>
              <p className={styles.description_text}>
                {book.Description}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.sentenses_row}>
          {sentensesEls.map(el => (<BookInfoSentense key={el.title} text={el.text} title={el.title} icon={el.icon} />))}
        </div>
      </div>
      <SelectionFooter />
    </div>
  )
})

export default BookInfo;
