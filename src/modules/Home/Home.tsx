import React from "react";
import styles from './Home.module.scss'
import HeaderHome from "../../features/HeaderHome/HeaderHome";
import ShopBookList from "../../features/ShopBookList/ShopBookList";
const Home = () =>
  {
    return (
      <div className={styles.home_container}>
        <HeaderHome/>
        <ShopBookList/>
      </div>
    )
  }

  export default Home;