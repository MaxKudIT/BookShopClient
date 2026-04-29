
import styles from './MainBooksF.module.scss'



import MainFooter from '../../shared/components/Footer/MainFooter/MainFooter';

import MainHeader from '../../shared/components/Header/MainHeader/MainHeader';
import SideBar from '../../shared/components/SideBar/Sidebar';

import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../shared/hooks/useFirebaseAuth';


import BookList from '../../shared/components/BookList/BookList';
import FavsFilterField from '../../shared/components/FilterField/MainBooksFilterField/MainBooksFilterField';
import MainBooksFilterField from '../../shared/components/FilterField/MainBooksFilterField/MainBooksFilterField';
import BookCarousel from '../../shared/components/BookCarousel/BookCarousel';
import Banner from '../../shared/components/Banner/Banner';
import type { IconBaseProps } from 'react-icons';
import { IoAccessibility } from 'react-icons/io5';



const MainBooksF = () => {

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
                        alignItems: 'center',
                        columnGap: 12,
                        height: 55,
                        marginBottom: 20
                    }}>
                        {/* <div style={{
              background: '#a3aab81c',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 5px',
              borderRadius: 10
            }}>
              <PiShieldStar style={{ fontSize: 40, color: '#6379e9' }} />
            </div> */}

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',

                        }}>
                            <p style={{ fontSize: 25, color: '#FFFFFFFF', fontWeight: 600 }}>Книжный мир</p>
                            <p style={{ fontSize: 14, color: '#C0C2C8FF' }}>Собирайте, храните и перечитывайте любимые книги.</p>
                        </div>
                    </div>
                    <MainBooksFilterField />
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40, rowGap: 200 }}>
                        <BookList list={[]} viewPage={'home'} />
                        <BookCarousel/>
                        <Banner icon={IoAccessibility} title={'Пока'} description={'Приык'} color={'pink'}/>
                    </div>

                </div>
                <MainFooter />
            </div>

        </>
    )
}

export default MainBooksF;