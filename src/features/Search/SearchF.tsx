import { getAuth } from 'firebase/auth';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { IoClose, IoFilterOutline, IoSearchOutline } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStores } from '../../store/context/GloabalContext';
import MainFooter from '../../shared/components/Footer/MainFooter/MainFooter';
import MainHeader from '../../shared/components/Header/MainHeader/MainHeader';
import BookList from '../../shared/components/BookList/BookList';
import SideBar from '../../shared/components/SideBar/Sidebar';
import { useFirebaseAuth } from '../../shared/hooks/useFirebaseAuth';
import type { BookSearchParams } from '../../shared/types';
import styles from './SearchF.module.scss';

const genres = ['Все жанры', 'Приключения', 'Драма', 'Ужасы', 'Исторические', 'Фантастика'];

const sortOptions = [
    { value: 'rate_desc', label: 'По рейтингу' },
    { value: 'new', label: 'Сначала новые' },
    { value: 'price_asc', label: 'Цена по возрастанию' },
    { value: 'price_desc', label: 'Цена по убыванию' },
    { value: 'title', label: 'По названию' },
] as const;

const numberFromValue = (raw: string) => {
    if (!raw) {
        return undefined;
    }

    const value = Number(raw);
    return Number.isFinite(value) ? value : undefined;
};

const SearchF = observer(() => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { logout } = useFirebaseAuth();
    const {
        bookSearchStore: {
            books,
            getAllBooks,
            searchBooks,
            getAllBooksState,
            searchBooksState,
        },
    } = useStores();

    const q = searchParams.get('q') ?? '';
    const genre = searchParams.get('genre') ?? 'Все жанры';
    const sort = searchParams.get('sort') ?? 'rate_desc';
    const minPrice = searchParams.get('minPrice') ?? '';
    const maxPrice = searchParams.get('maxPrice') ?? '';
    const minRate = searchParams.get('minRate') ?? '';

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/auth');
        } catch {
            console.error('Возникла ошибка при выходе из аккаунта!');
        }
    };

    const updateParam = (key: string, value: string) => {
        const nextParams = new URLSearchParams(searchParams);

        if (!value || value === 'Все жанры') {
            nextParams.delete(key);
        } else {
            nextParams.set(key, value);
        }

        setSearchParams(nextParams, { replace: true });
    };

    const resetFilters = () => {
        const nextParams = new URLSearchParams();

        if (q.trim()) {
            nextParams.set('q', q);
        }

        setSearchParams(nextParams, { replace: true });
    };

    useEffect(() => {
        const normalizedGenre = genre === 'Все жанры' ? undefined : genre;
        const params: BookSearchParams = {
            q,
            genre: normalizedGenre,
            minPrice: numberFromValue(minPrice),
            maxPrice: numberFromValue(maxPrice),
            minRate: numberFromValue(minRate),
            sort: sort as BookSearchParams['sort'],
            limit: 50,
        };

        const hasFilters = Boolean(
            q.trim() ||
            normalizedGenre ||
            params.minPrice !== undefined ||
            params.maxPrice !== undefined ||
            params.minRate !== undefined ||
            sort !== 'rate_desc'
        );

        if (hasFilters) {
            searchBooks(params);
            return;
        }

        getAllBooks();
    }, [getAllBooks, genre, maxPrice, minPrice, minRate, q, searchBooks, sort]);

    const loading = getAllBooksState.loading || searchBooksState.loading;
    const error = getAllBooksState.error || searchBooksState.error;
    const resultTitle = q.trim() ? `Результаты по запросу "${q.trim()}"` : 'Поиск по библиотеке';

    return (
        <>
            <SideBar
                user={{
                    email: auth.currentUser?.email || 'none',
                    login: auth.currentUser?.displayName || 'none'
                }}
                handleLogout={handleLogout}
            />

            <div className={styles.main_container}>
                <MainHeader />

                <main className={styles.main_body}>
                    <section className={styles.search_header}>
                        <div className={styles.search_icon}>
                            <IoSearchOutline />
                        </div>

                        <div className={styles.search_text}>
                            <p className={styles.search_title}>{resultTitle}</p>
                            <p className={styles.search_description}>
                                Ищите книги по названию, автору, жанру и описанию.
                            </p>
                        </div>

                        <p className={styles.search_count}>{books.length} книг</p>
                    </section>

                    <section className={styles.filters_panel}>
                        <div className={styles.filters_top}>
                            <div className={styles.filters_title}>
                                <span className={styles.filters_icon}>
                                    <IoFilterOutline />
                                </span>
                                <div>
                                    <p>Фильтры поиска</p>
                                    <span>Уточните выдачу по жанру, цене и рейтингу</span>
                                </div>
                            </div>

                            <button className={styles.reset_button} type="button" onClick={resetFilters}>
                                <IoClose />
                                <span>Сбросить</span>
                            </button>
                        </div>

                        <div className={styles.filters_grid}>
                            <label className={styles.filter_field}>
                                <span>Жанр</span>
                                <select value={genre} onChange={(event) => updateParam('genre', event.target.value)}>
                                    {genres.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </label>

                            <label className={styles.filter_field}>
                                <span>Сортировка</span>
                                <select value={sort} onChange={(event) => updateParam('sort', event.target.value)}>
                                    {sortOptions.map((item) => (
                                        <option key={item.value} value={item.value}>{item.label}</option>
                                    ))}
                                </select>
                            </label>

                            <label className={styles.filter_field}>
                                <span>Цена от</span>
                                <input
                                    min={0}
                                    type="number"
                                    value={minPrice}
                                    onChange={(event) => updateParam('minPrice', event.target.value)}
                                />
                            </label>

                            <label className={styles.filter_field}>
                                <span>Цена до</span>
                                <input
                                    min={0}
                                    type="number"
                                    value={maxPrice}
                                    onChange={(event) => updateParam('maxPrice', event.target.value)}
                                />
                            </label>

                            <label className={styles.filter_field}>
                                <span>Рейтинг от</span>
                                <input
                                    max={5}
                                    min={0}
                                    step={0.1}
                                    type="number"
                                    value={minRate}
                                    onChange={(event) => updateParam('minRate', event.target.value)}
                                />
                            </label>
                        </div>
                    </section>

                    <div className={styles.results_block}>
                        {loading && <div className={styles.state_block}>Ищем книги...</div>}
                        {error && <div className={styles.error_block}>{error}</div>}

                        {!loading && !error && books.length === 0 && (
                            <div className={styles.state_block}>По этому запросу книги не найдены</div>
                        )}

                        {!loading && !error && books.length > 0 && (
                            <BookList list={books} viewPage="home" />
                        )}
                    </div>
                </main>

                <MainFooter />
            </div>
        </>
    );
});

export default SearchF;
