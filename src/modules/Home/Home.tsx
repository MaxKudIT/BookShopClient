
import styles from './Home.module.scss'
import ShopBookList from "../../features/ShopBookList/ShopBookList";
const Home = () => {
  return (
    <div className={styles.home_container}>
      <ShopBookList />
    </div>
  )
}

export default Home;