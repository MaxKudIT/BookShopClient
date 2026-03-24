
import styles from './Home.module.scss'
import ShopBookList from "../../features/ShopBookList/ShopBookList";
import MainHeader from '../../shared/components/Header/MainHeader/MainHeader';
import MainFooter from '../../shared/components/Footer/MainFooter/MainFooter';
const Home = () => {
  return (
    <div className={styles.home_container}>
      <ShopBookList />
    </div>
  )
}

export default Home;