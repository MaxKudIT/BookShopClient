import React from "react";
import styles from './MyBooks.module.scss'


import HeaderComponent from "../../shared/components/Header/HeaderComponent";
import MyBooksList from "../../features/MyBooks/MyBooksList";
const MyBooks = () =>
  {
    return (
      <div className={styles.home_container}>
      
        <MyBooksList/>
      </div>
    )
  }

  export default MyBooks;