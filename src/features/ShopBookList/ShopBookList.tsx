import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from './ShopBookList.module.scss'


import { Alert, Avatar, CircularProgress, Dialog, Divider, Snackbar } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import SideBar from "../../shared/components/SideBar/Sidebar";
import MainHeader from "../../shared/components/Header/MainHeader/MainHeader";

import { FaRegBookmark } from "react-icons/fa6";
import { GrFormNext } from "react-icons/gr";
import { useFirebaseAuth } from "../../shared/hooks/useFirebaseAuth";
import HistoryRow from "../../shared/components/HistoryRow/HistoryRow";
import RecommsRow from "../../shared/components/RecommsRow/RecommsRow";


const ShopBookList = () => {




  const { logout, logoutError, clearErrors } = useFirebaseAuth();


  const auth = getAuth()

  console.log(auth)


  const navigate = useNavigate();

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


  const handleClose = (event: any, reason: any) => {
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

          <div className={styles.book_month}>

            <div style={{
              width: '50%',

              height: '100%',
              paddingRight: 20,
              display: 'flex',
              flexDirection: 'column',
              rowGap: 25,

            }}>
              <div style={{ display: 'flex', flexDirection: 'column', rowGap: 25 }}>
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 10 }}>
                  <div style={{ width: 'fit-content' }}>
                    <p style={{
                      background: 'linear-gradient(90deg, #5f73cf, #b167ce )',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: 45,
                      fontWeight: 900
                    }}>Человек-паук</p>
                  </div>
                  <p style={{ fontSize: 18, color: '#BAC1CEFF', fontWeight: 600 }}>Автор: Мэтт Хейг</p>
                </div>
                <div style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: 25,
                  height: 100
                }}>
                  <Divider sx={{ borderRightWidth: 3, borderColor: 'rgb(45, 64, 163, 0.6)' }} orientation="vertical" />
                  <p style={{ color: 'rgb(136, 141, 150)', fontWeight: 500, fontSize: 16, lineHeight: 1.7 }}>«Между жизнью и смертью есть библиотека. И в этой библиотеке полки тянутся бесконечно. Каждая книга дает возможность попробовать другую жизнь...»</p>
                </div>
                <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', columnGap: 25 }}>
                  <button className={styles.book_month_button_one}>
                    <p>Читать сейчас</p>
                    <GrFormNext style={{ fontSize: 18 }} />
                  </button>
                  <button className={styles.book_month_button_two}>
                    <FaRegBookmark style={{ fontSize: 14 }} />
                    <p>В список желаемого</p>
                  </button>
                </div>

              </div>


            </div>
            <div className={styles.book_month_two}>
            </div>


          </div>
          <HistoryRow books={[]} />
          <RecommsRow books={[]}/>
        </div>
      </div>

    </>

  )
}

export default ShopBookList;