import MainBooksF from '../../features/MainBooks/MainBooksF';
import styles from './MainBooksM.module.scss'

const MainBooksM = () => {
  return (
    <div className={styles.main_books_container}>
      <MainBooksF/>
    </div>
  )
}

export default MainBooksM;