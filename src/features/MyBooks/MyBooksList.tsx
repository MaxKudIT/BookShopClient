import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './MyBooksList.module.scss';
import MainFooter from '../../shared/components/Footer/MainFooter/MainFooter';
import MainHeader from '../../shared/components/Header/MainHeader/MainHeader';
import SideBar from '../../shared/components/SideBar/Sidebar';
import BookList from '../../shared/components/BookList/BookList';
import { useFirebaseAuth } from '../../shared/hooks/useFirebaseAuth';
import { useStores } from '../../store/context/GloabalContext';

const MyBooksList = observer(() => {
  const { logout } = useFirebaseAuth();
  const {
    myBooksStore: {
      books,
      getMyBooks,
      getMyBooksState,
    },
  } = useStores();

  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch {
      console.error('Возникла ошибка при выходе из аккаунта!');
    }
  };

  useEffect(() => {
    getMyBooks();
  }, [getMyBooks]);

  return (
    <>
      <SideBar
        user={{
          email: auth.currentUser?.email || 'none',
          login: auth.currentUser?.displayName || 'none',
          avatarUrl: auth.currentUser?.photoURL || '',
        }}
        handleLogout={handleLogout}
      />

      <div className={styles.main_container}>
        <MainHeader />
        <div className={styles.main_body}>
          <div className={styles.page_header}>
            <div className={styles.page_header_text}>
              <p className={styles.page_title}>Моя библиотека</p>
              <p className={styles.page_description}>Все ваши приобретенные издания в одном месте</p>
            </div>
          </div>

          {getMyBooksState.loading && (
            <div className={styles.state_block}>Загружаем библиотеку...</div>
          )}

          {getMyBooksState.error && (
            <div className={styles.error_block}>{getMyBooksState.error}</div>
          )}

          {!getMyBooksState.loading && !getMyBooksState.error && books.length === 0 && (
            <div className={styles.state_block}>В вашей библиотеке пока нет книг</div>
          )}

          {!getMyBooksState.loading && !getMyBooksState.error && books.length > 0 && (
            <BookList list={books} viewPage="home" />
          )}
        </div>
        <MainFooter />
      </div>
    </>
  );
});

export default MyBooksList;
