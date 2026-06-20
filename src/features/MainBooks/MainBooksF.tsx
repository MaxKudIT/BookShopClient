import { useEffect, useMemo, useState } from 'react';
import styles from './MainBooksF.module.scss'



import MainFooter from '../../shared/components/Footer/MainFooter/MainFooter';

import MainHeader from '../../shared/components/Header/MainHeader/MainHeader';
import SideBar from '../../shared/components/SideBar/Sidebar';

import { getAuth } from 'firebase/auth';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../shared/hooks/useFirebaseAuth';


import BookList from '../../shared/components/BookList/BookList';
import MainBooksFilterField from '../../shared/components/FilterField/MainBooksFilterField/MainBooksFilterField';
import { useStores } from '../../store/context/GloabalContext';
import type { DateDropDown, GenresDropDown } from '../../store/context/SearchContext';



const MainBooksF = observer(() => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedGenre, setSelectedGenre] = useState<GenresDropDown>('Все жанры');
    const [selectedSort, setSelectedSort] = useState<DateDropDown>('Сначала новые');

    const { logout } = useFirebaseAuth();
    const {
        myBooksStore: {
            notmybooks,
            getNotMyBooks,
            getNotMyBooksState,
        },
    } = useStores();


    const auth = getAuth()

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/auth')
        }
        catch {
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


    useEffect(() => {
        getNotMyBooks();
    }, [getNotMyBooks]);

    const filteredBooks = useMemo(() => {
        const normalizedSearch = searchValue.trim().toLowerCase();

        const filtered = notmybooks.filter((book) => {
            const matchesSearch = !normalizedSearch ||
                book.Title.toLowerCase().includes(normalizedSearch) ||
                book.Author.toLowerCase().includes(normalizedSearch) ||
                book.Genre.toLowerCase().includes(normalizedSearch);

            const matchesGenre = selectedGenre === 'Все жанры' || book.Genre === selectedGenre;

            return matchesSearch && matchesGenre;
        });

        if (selectedSort === 'В алфавитном порядке') {
            return [...filtered].sort((firstBook, secondBook) => (
                firstBook.Title.localeCompare(secondBook.Title, 'ru')
            ));
        }

        return filtered;
    }, [notmybooks, searchValue, selectedGenre, selectedSort]);

    const hasActiveFilters = Boolean(searchValue.trim() || selectedGenre !== 'Все жанры' || selectedSort !== 'Сначала новые');




    return (
        <>





            <SideBar user={{
                email: auth.currentUser?.email || 'none',
                login: auth.currentUser?.displayName || 'none',
                avatarUrl: auth.currentUser?.photoURL || '',
            }} handleLogout={handleLogout} />
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
                    <MainBooksFilterField
                        searchValue={searchValue}
                        selectedGenre={selectedGenre}
                        selectedSort={selectedSort}
                        onSearchChange={setSearchValue}
                        onGenreChange={setSelectedGenre}
                        onSortChange={setSelectedSort}
                    />
                    <div className={styles.books_content}>
                        {getNotMyBooksState.loading && (
                            <div className={styles.state_block}>Загружаем книги...</div>
                        )}

                        {getNotMyBooksState.error && (
                            <div className={styles.error_block}>{getNotMyBooksState.error}</div>
                        )}

                        {!getNotMyBooksState.loading && !getNotMyBooksState.error && notmybooks.length === 0 && (
                            <div className={styles.state_block}>Новых книг пока нет</div>
                        )}

                        {!getNotMyBooksState.loading && !getNotMyBooksState.error && notmybooks.length > 0 && filteredBooks.length === 0 && (
                            <div className={styles.state_block}>
                                {hasActiveFilters ? 'По этим фильтрам книги не найдены' : 'Новых книг пока нет'}
                            </div>
                        )}

                        {!getNotMyBooksState.loading && !getNotMyBooksState.error && filteredBooks.length > 0 && (
                            <BookList list={filteredBooks} viewPage={'home'} />
                        )}

                    </div>

                </div>
                <MainFooter />
            </div>

        </>
    )
})

export default MainBooksF;
