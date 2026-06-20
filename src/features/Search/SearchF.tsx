import { Divider, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { HiArrowsUpDown } from 'react-icons/hi2';
import { IoClose, IoColorFilterOutline, IoSearchOutline } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStores } from '../../store/context/GloabalContext';
import MainFooter from '../../shared/components/Footer/MainFooter/MainFooter';
import MainHeader from '../../shared/components/Header/MainHeader/MainHeader';
import BookList from '../../shared/components/BookList/BookList';
import SideBar from '../../shared/components/SideBar/Sidebar';
import { useFirebaseAuth } from '../../shared/hooks/useFirebaseAuth';
import type { BookSearchParams } from '../../shared/types';
import { selectStyles } from '../../shared/components/FilterField/MainBooksFilterField/muiStyles';
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

const searchDebounceMs = 450;

const menuProps = {
    disableScrollLock: true,
    PaperProps: {
        sx: {
            ...selectStyles.menuPaper,
            zIndex: 9999,
        },
    },
    MenuListProps: {
        sx: selectStyles.menuList,
    },
};

const numberFieldSx = {
    height: 40,
    width: 120,
    '& .MuiFilledInput-root': {
        height: '100%',
        background: 'rgba(38, 42, 63, 0.28)',
        border: '1px solid #353746FF',
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        '&:before, &:after, &:hover:before, &.Mui-focused:after': {
            border: 'none',
            display: 'none',
        },
        '&:hover': {
            background: 'rgba(58, 65, 97, 0.28)',
        },
        '&.Mui-focused': {
            background: 'rgba(58, 65, 97, 0.28)',
        },
    },
    '& .MuiFilledInput-input': {
        color: 'rgba(255,255,255,0.9)',
        fontSize: '12px',
        fontWeight: 400,
        padding: '0 12px',
        '&::placeholder': {
            color: 'rgba(255,255,255,0.55)',
            opacity: 1,
        },
        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
        },
        MozAppearance: 'textfield',
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255,255,255,0.55) !important',
        fontSize: 12,
    },
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
    const currentFilters = useMemo(() => ({
        q,
        genre,
        sort,
        minPrice,
        maxPrice,
        minRate,
    }), [genre, maxPrice, minPrice, minRate, q, sort]);
    const [debouncedFilters, setDebouncedFilters] = useState(currentFilters);

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
        const debounceId = window.setTimeout(() => {
            setDebouncedFilters(currentFilters);
        }, searchDebounceMs);

        return () => {
            window.clearTimeout(debounceId);
        };
    }, [currentFilters]);

    useEffect(() => {
        const normalizedGenre = debouncedFilters.genre === 'Все жанры' ? undefined : debouncedFilters.genre;
        const params: BookSearchParams = {
            q: debouncedFilters.q,
            genre: normalizedGenre,
            minPrice: numberFromValue(debouncedFilters.minPrice),
            maxPrice: numberFromValue(debouncedFilters.maxPrice),
            minRate: numberFromValue(debouncedFilters.minRate),
            sort: debouncedFilters.sort as BookSearchParams['sort'],
            limit: 50,
        };

        const hasFilters = Boolean(
            debouncedFilters.q.trim() ||
            normalizedGenre ||
            params.minPrice !== undefined ||
            params.maxPrice !== undefined ||
            params.minRate !== undefined ||
            debouncedFilters.sort !== 'rate_desc'
        );

        if (hasFilters) {
            searchBooks(params);
            return;
        }

        getAllBooks();
    }, [debouncedFilters, getAllBooks, searchBooks]);

    const loading = getAllBooksState.loading || searchBooksState.loading;
    const error = getAllBooksState.error || searchBooksState.error;
    const resultTitle = q.trim() ? `Результаты по запросу "${q.trim()}"` : 'Поиск по библиотеке';

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
                        <div className={styles.filters_grid}>
                            <div className={styles.select_group}>
                                <FormControl sx={selectStyles.formControl}>
                                    <Select
                                        value={genre}
                                        onChange={(event) => updateParam('genre', event.target.value)}
                                        renderValue={(selected) => (
                                            <div className={styles.select_value}>
                                                <IoColorFilterOutline />
                                                <span>{selected}</span>
                                            </div>
                                        )}
                                        sx={selectStyles.select}
                                        MenuProps={menuProps}
                                    >
                                        {genres.map((item) => (
                                            <MenuItem key={item} value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Divider
                                    className={styles.filter_divider}
                                    orientation="vertical"
                                    sx={{ borderBottomWidth: 2, height: 45, ml: 2, mr: 2, borderColor: '#353746FF' }}
                                />

                                <FormControl sx={selectStyles.formControl}>
                                    <Select
                                        value={sort}
                                        onChange={(event) => updateParam('sort', event.target.value)}
                                        renderValue={(selected) => {
                                            const label = sortOptions.find((item) => item.value === selected)?.label || selected;

                                            return (
                                                <div className={styles.select_value}>
                                                    <HiArrowsUpDown />
                                                    <span>{label}</span>
                                                </div>
                                            );
                                        }}
                                        sx={selectStyles.select}
                                        MenuProps={menuProps}
                                    >
                                        {sortOptions.map((item) => (
                                            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={styles.number_group}>
                                <TextField
                                    placeholder="Цена от"
                                    type="number"
                                    value={minPrice}
                                    variant="filled"
                                    onChange={(event) => updateParam('minPrice', event.target.value)}
                                    sx={numberFieldSx}
                                    slotProps={{ htmlInput: { min: 0, 'aria-label': 'Цена от' } }}
                                />

                                <TextField
                                    placeholder="Цена до"
                                    type="number"
                                    value={maxPrice}
                                    variant="filled"
                                    onChange={(event) => updateParam('maxPrice', event.target.value)}
                                    sx={numberFieldSx}
                                    slotProps={{ htmlInput: { min: 0, 'aria-label': 'Цена до' } }}
                                />

                                <TextField
                                    placeholder="Рейтинг от"
                                    type="number"
                                    value={minRate}
                                    variant="filled"
                                    onChange={(event) => updateParam('minRate', event.target.value)}
                                    sx={numberFieldSx}
                                    slotProps={{ htmlInput: { max: 5, min: 0, step: 0.1, 'aria-label': 'Рейтинг от' } }}
                                />
                            </div>

                            <button className={styles.reset_button} type="button" onClick={resetFilters}>
                                <IoClose />
                                <span>Сбросить</span>
                            </button>
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
