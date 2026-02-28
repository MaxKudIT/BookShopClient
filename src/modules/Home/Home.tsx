import React from "react";
import styles from './Home.module.scss'
import ShopBookList from "../../features/ShopBookList/ShopBookList";
import HeaderComponent from "../../shared/components/Header/HeaderComponent";
const Home = () =>
  {
    return (
      <div className={styles.home_container}>
        <ShopBookList/>
      </div>
    )
  }

  export default Home;