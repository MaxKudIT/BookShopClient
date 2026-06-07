import { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './BookInfo.module.scss'
import SelectionHeader from "../../shared/components/Header/SelectionHeader/SelectionHeader";
import SelectionFooter from "../../shared/components/Footer/SelectionFooter/SelectionFooter";
import { IoIosArrowBack, IoMdCheckmarkCircleOutline, IoMdInformationCircleOutline } from "react-icons/io";
import { FaCrown, FaHeart, FaRegHeart, FaRegStar } from "react-icons/fa6";
import { MdAutoAwesome, MdCurrencyRuble, MdOutlineShoppingCart } from "react-icons/md";
import { CircularProgress, Divider, Tooltip } from "@mui/material";
import type { BookInfoSentenseProps } from "../../shared/components/BookInfoSentense/BookInfoSentense";
import BookInfoSentense from "../../shared/components/BookInfoSentense/BookInfoSentense";
import { PiQuotes } from "react-icons/pi";
import { useStores } from '../../store/context/GloabalContext';
import SubscriptionModal from '../../shared/components/SubscriptionModal/SubscriptionModal';
import RecommsRowWithDynamic from '../../shared/components/RecommsRow/RecommsRowWithDynamic/RecommsRowWithDynamic';

const fallbackImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPTPFv3U6ZVvZh0GYlNFWntSw0PJjFvqNwMA&s';

const BookInfo = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);

  const {
    bookInfoStore: {
      book,
      physicalBookStockInfo,
      getBookById,
      getBookState,
      getPhysicalBookStockInfo,
      getPhysicalBookStockInfoState,
      buyElectronicBook,
      buyElectronicBookState,
    },
    cartItemsStore: {
      createCartItem,
      postCartItemsState,
      isInCartItem,
      isInCartItems,
      postCartItemsState2,
      deleteCartItems,
      deleteCartItemsState,
      // getCountCart,
    },
    favItemsStore: {
      createFavItem,
      postFavItemsState,
      isInFavsItem,
      isInFavsItems,
      postFavItemsState2,
      deleteFavItems,
      deleteFavItemsState,
      // getCountFav,
    },
    subscriptionStore: {
      status: subscriptionStatus,
      activePlan,
      getStatus,
      getStatusState,
    },
    bookViewsStore: {
      saveOrUpdateBookView,
    },
    recommendationStore: {
      bookRecommendations,
      getRecommendationsByBook,
      getRecommendationsByBookState,
    },
  } = useStores();

  const sentensesEls: BookInfoSentenseProps[] = [
    { icon: IoMdInformationCircleOutline, title: 'Эксклюзивный контент', text: 'Включает дополнительные иллюстрации и карты от автора.' },
    { icon: PiQuotes, title: 'Рекомендация критиков', text: '"Шедевр современной фантастики, который нельзя пропустить"' },
    { icon: IoMdCheckmarkCircleOutline, title: 'Гарантия качества', text: 'Высококачественная печать на бумаге премиум-класса.' }
  ];

  const physicalBookInStock = useMemo(() => {
    return physicalBookStockInfo?.PhysicalBooks.find((item) => item.StockCount > 0) ?? null;
  }, [physicalBookStockInfo]);

  const physicalBookForDisplay = useMemo(() => {
    return physicalBookStockInfo?.PhysicalBooks[0] ?? null;
  }, [physicalBookStockInfo]);

  const discountPrice = book
    ? Math.floor(book.Price - (book.Price / 100 * book.Discount))
    : 0;
  const physicalDiscountPrice = physicalBookForDisplay
    ? Math.floor(physicalBookForDisplay.Price - (physicalBookForDisplay.Price / 100 * physicalBookForDisplay.Discount))
    : 0;
  const canReadElectronic = Boolean(book?.IsMine || subscriptionStatus?.IsActive);
  const hasPhysicalStock = Boolean(physicalBookInStock && physicalBookInStock.StockCount > 0);
  const electronicAccessLabel = book?.IsMine
    ? 'Книга уже в вашей библиотеке'
    : subscriptionStatus?.IsActive
      ? `Доступно по ${activePlan?.Title ?? 'Premium'}`
      : 'Можно купить навсегда или читать по Premium';
  const physicalAccessLabel = hasPhysicalStock
    ? `В наличии ${physicalBookInStock?.StockCount} шт.`
    : physicalBookForDisplay
      ? 'Печатная версия временно закончилась'
      : 'Печатная версия пока недоступна';

  const isLoading = getBookState.loading || getPhysicalBookStockInfoState.loading || getStatusState.loading;
  const error = getBookState.error || getPhysicalBookStockInfoState.error || buyElectronicBookState.error;

  const loadBookInfo = useCallback(async () => {
    if (!id) {
      return;
    }

    await Promise.all([
      getBookById(id),
      getPhysicalBookStockInfo(id),
      isInFavsItem(id),
      // getCountFav(),
      // getCountCart(),
      getStatus(),
      getRecommendationsByBook(id, 10),
    ]);
  }, [getBookById, getPhysicalBookStockInfo, getRecommendationsByBook, getStatus, id, isInFavsItem]);

  useEffect(() => {
    loadBookInfo();
  }, [loadBookInfo]);

  useEffect(() => {
    if (!id) {
      return;
    }

    saveOrUpdateBookView(id);
  }, [id, saveOrUpdateBookView]);

  useEffect(() => {
    if (physicalBookInStock?.Id) {
      isInCartItem(physicalBookInStock.Id);
    }
  }, [isInCartItem, physicalBookInStock?.Id]);

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
      // getCountFav(),
    ]);
  };

  const handleCartClick = async () => {
    if (!physicalBookInStock || postCartItemsState.loading || deleteCartItemsState.loading) {
      return;
    }

    if (isInCartItems) {
      await deleteCartItems([physicalBookInStock.Id]);
    } else {
      await createCartItem(physicalBookInStock.Id);
    }

    await Promise.all([
      isInCartItem(physicalBookInStock.Id),
      // getCountCart(),
    ]);
  };

  const handleElectronicClick = async () => {
    if (!book || buyElectronicBookState.loading) {
      return;
    }

    if (canReadElectronic) {
      navigate(`/books/${book.Id}/pages/1`);
      return;
    }

    const isSuccess = await buyElectronicBook(book.Id);
    if (isSuccess) {
      await getBookById(book.Id);
      navigate(`/books/${book.Id}/pages/1`);
    }
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
                disabled={!hasPhysicalStock || postCartItemsState.loading || deleteCartItemsState.loading || postCartItemsState2.loading}
              >
                <MdOutlineShoppingCart />
                <p>{isInCartItems ? 'В корзине' : hasPhysicalStock ? 'В корзину' : 'Нет в наличии'}</p>
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
              <div className={styles.purchase_options}>
                <div className={styles.purchase_card}>
                  <div className={styles.purchase_header}>
                    <div>
                      <p className={styles.purchase_title}>Электронная версия</p>
                      <p className={styles.purchase_hint}>{electronicAccessLabel}</p>
                    </div>
                    <span className={styles.premium_badge}>
                      <FaCrown />
                      Premium
                    </span>
                  </div>

                  <div className={styles.purchase_footer}>
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
                        onClick={handleElectronicClick}
                        disabled={buyElectronicBookState.loading}
                      >
                        <span className={styles.read_button_text}>
                          {canReadElectronic
                            ? 'Читать онлайн'
                            : buyElectronicBookState.loading
                              ? 'Покупаем...'
                              : 'Купить электронную'}
                        </span>
                      </button>
                      <Tooltip
                        placement="top"
                        title={
                          <div className={styles.tooltip_content}>
                            <p className={styles.tooltip_title}>Электронный доступ</p>
                            <p>Если книга уже куплена или активен Premium, ее можно читать сразу.</p>
                            <p>Покупка электронной версии добавит книгу в вашу библиотеку.</p>
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
                      {!canReadElectronic && (
                        <button
                          className={styles.premium_action_button}
                          onClick={() => setSubscriptionOpen(true)}
                          type="button"
                        >
                          <FaCrown />
                          Читать по Premium
                        </button>
                      )}
                    </div>
                  </div>

                <div className={styles.purchase_card}>
                  <div className={styles.purchase_header}>
                    <div>
                      <p className={styles.purchase_title}>Печатная версия</p>
                      <p className={hasPhysicalStock ? styles.purchase_hint : styles.purchase_hint_muted}>
                        {physicalAccessLabel}
                      </p>
                    </div>
                    {physicalBookForDisplay?.Format && (
                      <span className={styles.format_badge}>{physicalBookForDisplay.Format}</span>
                    )}
                  </div>

                  <div className={styles.purchase_footer}>
                    {physicalBookForDisplay ? (
                      <div className={styles.price_row}>
                        <div className={styles.price_current}>
                          <p>{physicalBookForDisplay.Discount !== 0 ? physicalDiscountPrice : physicalBookForDisplay.Price}</p>
                          <MdCurrencyRuble style={{ fontSize: 22 }} />
                        </div>
                        {physicalBookForDisplay.Discount !== 0 && (
                          <div className={styles.price_old}>
                            <p>{physicalBookForDisplay.Price} ₽</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className={styles.unavailable_text}>Цена недоступна</p>
                    )}

                    <button
                      className={styles.cart_action_button}
                      onClick={handleCartClick}
                      disabled={!hasPhysicalStock || postCartItemsState.loading || deleteCartItemsState.loading || postCartItemsState2.loading}
                    >
                      <MdOutlineShoppingCart />
                      <span>
                        {isInCartItems
                          ? 'Убрать из корзины'
                          : hasPhysicalStock
                            ? 'В корзину'
                            : 'Нет в наличии'}
                      </span>
                    </button>
                  </div>
                </div>
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

        <section className={styles.book_recommendations}>
          {getRecommendationsByBookState.loading ? (
            <div className={styles.state_block}>Подбираем похожие книги...</div>
          ) : getRecommendationsByBookState.error ? (
            <div className={styles.error_block}>{getRecommendationsByBookState.error}</div>
          ) : (
            <RecommsRowWithDynamic
              title="Похожие книги"
              icon={MdAutoAwesome}
              description="Подборка на основе жанра, автора и рейтинга этой книги"
              books={bookRecommendations}
              color="blue"
              itemsPerView={4}
            />
          )}
        </section>
      </div>
      <SubscriptionModal open={subscriptionOpen} onClose={() => setSubscriptionOpen(false)} />
      <SelectionFooter />
    </div>
  )
})

export default BookInfo;
