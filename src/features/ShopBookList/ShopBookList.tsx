import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from './ShopBookList.module.scss'
import type { BookPreviewT, Genres } from "../../shared/types";

import { useGet } from "../../shared/hooks/queries";
import { Avatar, CircularProgress, Dialog, Divider } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import BookList from "../../shared/components/BookList/BookList";
import HeaderComponent from "../../shared/components/Header/HeaderComponent";
import { useStores } from "../../store/context/GloabalContext";
import SideBar from "../../shared/components/SideBar/Sidebar";
import MainHeader from "../../shared/components/Header/MainHeader/MainHeader";
import { MdNavigateNext } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";


const ShopBookList = () => {






  // const { get, loading, error } = useGet<{ Books: BookPreviewT[] }>('books/all');

  // const [books, setBooks] = useState<BookPreviewT[]>([])

  // const auth = getAuth()


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



  return (
    <>
      <SideBar />
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
              rowGap: 25
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', rowGap: 15 }}>
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
                <Divider sx={{ borderRightWidth: 3, borderColor: '#6379E94D' }} orientation="vertical" />
                <p style={{ color: 'rgb(136, 141, 150)', fontWeight: 500, fontSize: 16, lineHeight: 1.7 }}>«Между жизнью и смертью есть библиотека. И в этой библиотеке полки тянутся бесконечно. Каждая книга дает возможность попробовать другую жизнь...»</p>
              </div>
              <div style={{marginTop: 40, display: 'flex', alignItems: 'center', columnGap: 25}}>
                <button className={styles.book_month_button_one}>
                  <p>Читать сейчас</p>
                  <MdNavigateNext />
                </button>
                 <button className={styles.book_month_button_two}>
                   <FaRegBookmark style={{ fontSize: 14 }} />
                  <p>В список желаемого</p>
                </button>
              </div>

            </div>
            {/* <div>
              <img style={{width: 350, height: 500}} src="https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/b7e91316-caf4-4678-9b75-e83b0e65acef/orig" alt="" />
            </div> */}

          </div>

        </div>
      </div>

    </>

  )
}

export default ShopBookList;