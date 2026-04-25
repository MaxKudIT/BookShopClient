
import styles from './MyBooksList.module.scss'


import RecommsRow from '../../shared/components/RecommsRow/RecommsRow';
import MainFooter from '../../shared/components/Footer/MainFooter/MainFooter';

import MainHeader from '../../shared/components/Header/MainHeader/MainHeader';
import SideBar from '../../shared/components/SideBar/Sidebar';

import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../shared/hooks/useFirebaseAuth';
import type { Snackbar, Alert } from '@mui/material';
import RecommsRowWithDynamic from '../../shared/components/RecommsRow/RecommsRowWithDynamic/RecommsRowWithDynamic';
import { IoBookOutline, IoCompassOutline } from 'react-icons/io5';
import type { BICProps } from '../../shared/components/BookInfoComponent/BookInfoComponent';
import { GiBookshelf } from 'react-icons/gi';
import BookInfoComponent from '../../shared/components/BookInfoComponent/BookInfoComponent';
import BookList from '../../shared/components/BookList/BookList';
import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { MdHistory, MdOutlineAccessTime } from 'react-icons/md';
import { FaRegStar } from 'react-icons/fa6';
import { LuBookOpenText } from 'react-icons/lu';
import { AiOutlineDollar, AiOutlineDollarCircle } from 'react-icons/ai';



const MyBooksList = () => {

  const { logout, logoutError, clearErrors } = useFirebaseAuth();


  const auth = getAuth()

  console.log(auth)


  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/auth')
    }
    catch (e: any) {
      console.error('Возникла ошибка при выходе из аккаунта!')
    }
  }
  // const { get, loading, error } = useGet<{Books: BookPreviewT[]}>('books/my');

  // const [books, setBooks] = useState<BookPreviewT[]>([])

  // const auth = getAuth()

  // const handleData = useCallback(async () => {
  //   try {

  //     const idToken = await auth.currentUser?.getIdToken();

  //     const booksData = await get({ idToken: idToken });
  //     setBooks(booksData.Books);
  //   } catch (err) {
  //     console.error('Ошибка загрузки книг:', err);
  //   }
  // }, [get]);


  // useEffect(() => {
  //   handleData();
  // }, [handleData]);






  // if (loading) {
  //   return (
  //     <div className={styles.books_global_style}>
  //       <CircularProgress
  //         sx={{
  //           display: 'flex',
  //           justifyContent: 'center',
  //           justifySelf: 'center',
  //           marginTop: 10,
  //           alignItems: 'center',
  //           padding: 0.5,
  //           color: 'white'
  //         }}

  //       />
  //     </div>
  //   )
  // }

  // if (error) {
  //   return (
  //     <div className={styles.books_global_style}>
  //       <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{error}</p>
  //     </div>
  //   )
  // }




  return (
    <>





      <SideBar user={{ email: auth.currentUser?.email || 'none', login: auth.currentUser?.displayName || 'none' }} handleLogout={handleLogout} />
      <div className={styles.main_container}>
        <MainHeader />
        <div className={styles.main_body}>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: 25
          }}>
            <p style={{ fontSize: 28, color: '#FFFFFFFF', fontWeight: 500 }}>Моя библиотека</p>
            <p style={{ fontSize: 15, color: '#C0C2C8FF' }}>Все ваши приобретенные издания в одном месте</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '200px' }}>
            <BookList list={[]} viewPage={'home'} />
            <RecommsRowWithDynamic icon={IoCompassOutline} title={'Личные рекомендации'} description={'Сборник книг, которые вам по душе'} books={[]} color={'blue'} />
            
          </div>

        </div>
        <MainFooter />
      </div>

    </>
  )
}

export default MyBooksList;