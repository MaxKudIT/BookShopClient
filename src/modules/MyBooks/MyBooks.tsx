import React from "react";
import styles from './MyBooks.module.scss'



import MyBooksList from "../../features/MyBooks/MyBooksList";
import Profile from "../../features/Profile/Profile";
const MyBooks = () =>
  {
    return (
      <div className={styles.mybooks_container}>

        <MyBooksList/>
      </div>
    )
  }

  export default MyBooks;