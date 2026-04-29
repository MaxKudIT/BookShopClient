import React from "react";
import BookInfo from "../../features/BookInfo/BookInfo";
import styles from './BookInfo.module.scss'



const BookInfoModule = () => {



  return (
    <div className={styles.book_info_page_style}>
      
     
      <BookInfo />
    
    </div>
  )
}

export { BookInfoModule };