import React from "react";
import BookInfo from "../../features/BookInfo/BookInfo";
import styles from './BookInfo.module.scss'



const BookInfoModule = () => {



  return (
    <div className={styles.book_info_page_style}>
      
     
      <BookInfo />
      <div style={{
        width: '100vw',
        height: '100px',
        background: 'rgba(170, 122, 202, 0.5)',
        position: 'absolute',
        zIndex: -1,
        bottom: 0
      }}></div>
    </div>
  )
}

export { BookInfoModule };