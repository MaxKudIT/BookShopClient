import { useEffect, useState } from "react";
import styles from './ShopBookList.module.scss'


import { Alert, Snackbar } from "@mui/material";
import { getAuth } from "firebase/auth";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import SideBar from "../../shared/components/SideBar/Sidebar";
import MainHeader from "../../shared/components/Header/MainHeader/MainHeader";

import { FaChevronDown, FaRegStar } from "react-icons/fa6";
import { useFirebaseAuth } from "../../shared/hooks/useFirebaseAuth";
import HistoryRow from "../../shared/components/HistoryRow/HistoryRow";
import RecommsRow from "../../shared/components/RecommsRow/RecommsRow";
import MainFooter from "../../shared/components/Footer/MainFooter/MainFooter";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { LuBookOpenText } from "react-icons/lu";
import { MdOutlineAccessTime } from "react-icons/md";
import BookInfoComponent, { type BICProps } from "../../shared/components/BookInfoComponent/BookInfoComponent";
import SubscriptionModal from "../../shared/components/SubscriptionModal/SubscriptionModal";
import { useStores } from "../../store/context/GloabalContext";


const ShopBookList = observer(() => {




  const { logout, logoutError, clearErrors } = useFirebaseAuth();
  const {
    statsStore: {
      userStats,
      getUserStats,
    },
  } = useStores();


  const auth = getAuth()

  console.log(auth)


  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/auth')
    }
    catch {
      console.error('Возникла ошибка при выходе из аккаунта!')
    }
  }

  // const { get, loading, error } = useGet<{ Books: BookPreviewT[] }>('books/all');

  // const [books, setBooks] = useState<BookPreviewT[]>([])




  // const {
  //   favItemsStore: {
  //     count,
  //     countFavState,
  //     getCountFav

  //   },
  //   cartItemsStore: {
  //     count: countCart,
  //     countCartState,
  //     getCountCart
  //   }

  // } = useStores()



  // const handleData = useCallback(async () => {
  //   try {

  //     const idToken = await auth.currentUser?.getIdToken();
  //     const booksData = await get({ idToken: idToken });
  //     await Promise.all([
  //       getCountFav(),
  //       getCountCart()
  //     ]);
  //     setBooks(booksData.Books);




  //   } catch (err) {
  //     console.error('Ошибка загрузки количества и книг:', err);
  //   }
  // }, [get]);




  // useEffect(() => {
  //   handleData();
  // }, [handleData]);






  // if (loading) {
  //   return (
  //     <div className={styles.books_global_style}>
  //       <CircularProgress
  //         sx={{
  //           display: 'flex',
  //           justifyContent: 'center',
  //           justifySelf: 'center',
  //           marginTop: 10,
  //           alignItems: 'center',
  //           padding: 0.5,
  //           color: 'white'
  //         }}

  //       />
  //     </div>
  //   )
  // }

  // if (error) {
  //   return (
  //     <div className={styles.books_global_style}>
  //       <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{error}</p>
  //     </div>
  //   )
  // }


  //окно ошибки
  const [open, setOpen] = useState(false);
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);

  useEffect(() => {
    if (logoutError) {
      setOpen(true);
    }
  }, [logoutError]);

  useEffect(() => {
    getUserStats();
  }, [getUserStats]);


  const handleClose = (_event: unknown, reason: string) => {
    if (reason === 'clickaway') {
      setOpen(false);
      clearErrors?.();
    }
  };



  const scrollToDiv = () => {
    const element = document.getElementById('info_block');
    let y: number = 0
    if (element) {
      const yOffset = -120;
      y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    }


    window.scrollTo({ top: y, behavior: 'smooth' });
  };


  const statistics: BICProps[] = [
    {
      icon: AiOutlineDollarCircle,
      title: 'КУПЛЕНО КНИГ',
      info: String(userStats?.PurchasedBooks ?? 0),
      color: 'rgba(63, 128, 214, 0.42)'
    },
    {
      icon: LuBookOpenText,
      title: 'ПРОЧИТАНО',
      info: String(userStats?.ReadBooks ?? 0),
      color: 'rgba(230, 135, 58, 0.47)'
    },
    {
      icon: MdOutlineAccessTime,
      title: 'МИНУТ ЧТЕНИЯ',
      info: String(userStats?.TotalMinutes ?? 0),
      color: 'rgba(214, 63, 133, 0.4)'
    },
    {
      icon: FaRegStar,
      title: 'СРЕДНЯЯ ОЦЕНКА',
      info: userStats ? userStats.AverageRating.toFixed(1) : '0',
      color: 'rgba(186, 138, 234, 0.51)'
    }

  ]

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 2 }}
      >
        <Alert
          severity="error"
          sx={{
            background: 'rgba(155, 32, 16, 0.3)',
            borderRadius: 3,
            color: '#F3F4F6FF',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(155, 32, 16, 0.5)'
          }}
          onClose={() => {
            setOpen(false);
            clearErrors?.();
          }}
        >
          {logoutError}
        </Alert>
      </Snackbar>



      <SideBar user={{ email: auth.currentUser?.email || 'none', login: auth.currentUser?.displayName || 'none' }} handleLogout={handleLogout} />
      <div className={styles.main_container}>
        <MainHeader />
        <div className={styles.main_body}>

          <div className={styles.book_month}>
            <div className={styles.book_month_content}>

              <div className={styles.book_month_text}>
                <p className={styles.book_month_title}>Книжные новинки уже здесь!</p>
                <p className={styles.book_month_description}>Откройте для себя лучшие произведения современных авторов. Читайте без ограничений по подписке Max Premium. Тысячи книг всегда под рукой.
                </p>
              </div>
              <div className={styles.book_month_offer}>
                <p className={styles.book_month_price}>49 ₽/мес</p>
                <p className={styles.book_month_price_hint}>и всё включено</p>
              </div>
              <div className={styles.book_month_actions}>
                <button
                  className={styles.book_month_button_one}
                  type="button"
                  onClick={() => setSubscriptionOpen(true)}
                >
                  Приобрести подписку
                </button>
              </div>
            </div>

            <div className={styles.book_month_two}></div>
          </div>

          <button onClick={scrollToDiv} className={styles.icon_wrapper}>
            <FaChevronDown style={{ fontSize: 32 }} className={styles.next_or_back} />
          </button>


          <div id="info_block" className={styles.info_block}>
            <div className={styles.info_block_content}>
              {statistics.map(el => (
                <BookInfoComponent key={el.title} color={el.color} icon={el.icon} title={el.title} info={el.info} />))}
            </div>
          </div>

          <HistoryRow books={[]} />
          <RecommsRow books={[]} />
        </div>
        <MainFooter />
      </div>
      <SubscriptionModal open={subscriptionOpen} onClose={() => setSubscriptionOpen(false)} />

    </>

  )
})

export default ShopBookList;
