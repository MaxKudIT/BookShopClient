import { useEffect, useState } from "react";
import styles from './HistoryF.module.scss'

import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import SideBar from "../../shared/components/SideBar/Sidebar";
import MainHeader from "../../shared/components/Header/MainHeader/MainHeader";

import { useFirebaseAuth } from "../../shared/hooks/useFirebaseAuth";
import MainFooter from "../../shared/components/Footer/MainFooter/MainFooter";
import { MdHistory } from "react-icons/md";
import HistoryRecentRows from "../../shared/components/HistoryRecentRows/HistoryRecentRows";
import HistoryTable from "../../shared/components/HistoryTable/HistoryTable";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/context/GloabalContext";


const HistoryF = observer(() => {




  const { logout, logoutError, clearErrors } = useFirebaseAuth();


  const auth = getAuth()

  console.log(auth)


  const navigate = useNavigate();
  const {
    bookViewsStore: {
      bookViews,
      getLastBookViews,
      getLastBookViewsState,
    },
    readingStore: {
      lastReadingBooks,
      getLastReadingBooks,
      getLastReadingBooksState,
    },
  } = useStores();

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/auth')
    }
    catch (e: any) {
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

  useEffect(() => {
    if (logoutError) {
      setOpen(true);
    }
  }, [logoutError]);

  useEffect(() => {
    getLastBookViews(50);
    getLastReadingBooks(4);
  }, [getLastBookViews, getLastReadingBooks]);


  const handleClose = (_event: unknown, reason: string) => {
    if (reason === 'clickaway') {
      setOpen(false);
      clearErrors?.();
    }
  };

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
          <section className={styles.page_intro}>
            <div className={styles.intro_content}>
              <div className={styles.intro_icon}>
                <MdHistory />
              </div>
              <div className={styles.intro_text}>
                <p className={styles.intro_title}>История чтения</p>
                <p className={styles.intro_subtitle}>Недавние визиты, прочитанные страницы и книги, к которым стоит вернуться</p>
              </div>
            </div>

            <div className={styles.intro_badge}>{bookViews.length} записей</div>
          </section>

          <div className={styles.section_header}>
            <div className={styles.section_title_group}>
              <p className={styles.section_title}>Недавно прочитанные</p>
              <p className={styles.section_subtitle}>Книги, которые вы открывали последними</p>
            </div>
            <div className={styles.border_vertical_style}></div>
          </div>

          <div className={styles.content_stack}>
            {getLastBookViewsState.loading || getLastReadingBooksState.loading ? (
              <CircularProgress sx={{ color: '#8da6ff', alignSelf: 'center', mt: 4 }} />
            ) : getLastBookViewsState.error || getLastReadingBooksState.error ? (
              <p style={{ color: '#ff8f8f', fontSize: 16 }}>
                {getLastReadingBooksState.error || getLastBookViewsState.error}
              </p>
            ) : (
              <>
                <HistoryRecentRows books={lastReadingBooks} />
                <HistoryTable books={bookViews} />
              </>
            )}
          </div>

        </div>
        <MainFooter />
      </div>

    </>

  )
})

export default HistoryF;
