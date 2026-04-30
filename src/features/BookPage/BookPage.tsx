import { useCallback, useEffect } from "react";

import styles from './BookPage.module.scss'
import DynamicMarkdownContent from "../../shared/components/DynamicMarkdownContent/DynamicMarkdownContent";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useStores } from "../../store/context/GloabalContext";
import { observer } from "mobx-react-lite";
import BookPageFooter from "../../shared/components/Footer/BookPageFooter";
import type { BookInfoT, PageInfoT } from "../../shared/types";
import { IoBookmarkOutline, IoReaderOutline, IoTimeOutline } from "react-icons/io5";
import SelectionHeader from "../../shared/components/Header/SelectionHeader/SelectionHeader";

const USE_TEST_BOOK_PAGE_DATA = true;

const testBook: BookInfoT = {
    Id: 'test-book-master-and-margarita',
    Title: 'Мастер и Маргарита',
    PagesCount: 384,
    Description: 'Тестовая книга для страницы чтения.',
    AboutBook: 'Темная, мистическая и ироничная история о Москве, любви и свободе.',
    Quote: 'Рукописи не горят.',
    CreatedDate: '1967',
    ReadingTime: '7 ч 30 мин',
    Price: 990,
    Discount: 15,
    Author: 'Михаил Булгаков',
    Genre: 'Драма',
    ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
    Rate: 4.8,
    IsMine: 1,
    isInCart: false,
    isInFavs: true
}

const testPage: PageInfoT = {
    Id: 'test-page-1',
    Number: 1,
    Text: `## Глава 1

В час жаркого весеннего заката на Патриарших прудах появились двое граждан. Один из них был одет в летнюю серую пару, был маленького роста, упитан, лыс, свою приличную шляпу пирожком нес в руке.

Второй был плечистый, рыжеватый, вихрастый молодой человек в заломленной на затылок клетчатой кепке. На нем была ковбойка, жеваные белые брюки и черные тапочки.

Солнце опускалось за дома, и город постепенно становился тише. Воздух держал в себе дневное тепло, но уже чувствовалась вечерняя прохлада, та самая, которая делает разговоры длиннее, а случайные встречи значительнее.

**Это тестовый фрагмент**, чтобы можно было оценить верстку страницы чтения без активного сервера.

- Левая панель показывает информацию о книге.
- Центральная область имитирует страницу reader-а.
- Нижняя панель управляет переходом между страницами.

В час жаркого весеннего заката на Патриарших прудах появились двое граждан. Один из них был одет в летнюю серую пару, был маленького роста, упитан, лыс, свою приличную шляпу пирожком нес в руке.

Второй был плечистый, рыжеватый, вихрастый молодой человек в заломленной на затылок клетчатой кепке. На нем была ковбойка, жеваные белые брюки и черные тапочки.

Солнце опускалось за дома, и город постепенно становился тише. Воздух держал в себе дневное тепло, но уже чувствовалась вечерняя прохлада, та самая, которая делает разговоры длиннее, а случайные встречи значительнее.

**Это тестовый фрагмент**, чтобы можно было оценить верстку страницы чтения без активного сервера.

- Левая панель показывает информацию о книге.
- Центральная область имитирует страницу reader-а.
- Нижняя панель управляет переходом между страницами.
В час жаркого весеннего заката на Патриарших прудах появились двое граждан. Один из них был одет в летнюю серую пару, был маленького роста, упитан, лыс, свою приличную шляпу пирожком нес в руке.

Второй был плечистый, рыжеватый, вихрастый молодой человек в заломленной на затылок клетчатой кепке. На нем была ковбойка, жеваные белые брюки и черные тапочки.

Солнце опускалось за дома, и город постепенно становился тише. Воздух держал в себе дневное тепло, но уже чувствовалась вечерняя прохлада, та самая, которая делает разговоры длиннее, а случайные встречи значительнее.

**Это тестовый фрагмент**, чтобы можно было оценить верстку страницы чтения без активного сервера.

- Левая панель показывает информацию о книге.
- Центральная область имитирует страницу reader-а.
- Нижняя панель управляет переходом между страницами.

`

}

const TEST_PAGES_COUNT = 24;

const BookPageF = observer(() => {


    const { id, pageNumber } = useParams()
    const navigate = useNavigate();


    const onPageChange = (page: number) => {
        if (!page) {
            console.error('Параметров не обнаружено');
            return
        }

        navigate(`/books/${id || testBook.Id}/pages/${page}`)
    }

    const {
        bookPageStore: {
            page,
            pagesCount,

            getPageById,
            getPageState,
            getPagesCount,
            getPagesCountState
        },
        bookInfoStore: {
            book
        }
    } = useStores()



    const handleGetBook = useCallback(async () => {
        if (USE_TEST_BOOK_PAGE_DATA) {
            return;
        }

        if (id && pageNumber) {
            await Promise.all([
                getPageById(id, pageNumber),
                getPagesCount(id),
              
            ]);

            console.log('Оба запроса завершены');
        } else {
            console.error('Параметр id или pageNumber не найден')
        }
    }, [id, pageNumber, getPagesCount, getPageById])

    useEffect(() => {
        handleGetBook()

    }, [handleGetBook]);




    const activeBook = USE_TEST_BOOK_PAGE_DATA ? testBook : book;
    const activePage = USE_TEST_BOOK_PAGE_DATA ? testPage : page;
    const activePagesCount = USE_TEST_BOOK_PAGE_DATA ? TEST_PAGES_COUNT : pagesCount;
    const currentPage = parseInt(pageNumber || String(activePage?.Number || 1));

    if (!USE_TEST_BOOK_PAGE_DATA && (getPageState.loading || getPagesCountState.loading)) {
        return (

            <CircularProgress
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    justifySelf: 'center',
                    marginTop: 10,
                    alignItems: 'center',
                    padding: 0.5,
                    color: 'white'
                }}

            />

        )
    }

    if (!USE_TEST_BOOK_PAGE_DATA && (getPageState.error || getPagesCountState.error)) {
        return (
            <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{getPageState.error || getPagesCountState.error}</p>
        )
    }

    if (!activeBook || !activePage || !activePagesCount) {
        return (
            <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>
                Данные не найдены
            </p>
        );
    }

    if (activeBook && activePage && activePagesCount) {
        return (
            <div className={styles.bookpage_page_style}>
                <SelectionHeader />
                <div className={styles.bookpage_main_container}>
                    <div className={styles.reader_shell}>
                        <aside className={styles.reader_aside}>
                            <div className={styles.aside_card}>
                                <p className={styles.aside_label}>Сейчас читаете</p>
                                <p className={styles.aside_title}>{activeBook.Title}</p>
                                <p className={styles.aside_author}>{activeBook.Author}</p>
                            </div>
                            <div className={styles.aside_meta}>
                                <div className={styles.meta_item}>
                                    <IoReaderOutline />
                                    <span>{activeBook.Genre}</span>
                                </div>
                                <div className={styles.meta_item}>
                                    <IoBookmarkOutline />
                                    <span>Страница {currentPage}</span>
                                </div>
                                <div className={styles.meta_item}>
                                    <IoTimeOutline />
                                    <span>{activeBook.ReadingTime || 'Спокойное чтение'}</span>
                                </div>
                            </div>
                        </aside>

                        <main className={styles.book_page_block_style}>
                            <div className={styles.book_page_block_style_inner}>
                                <div className={styles.reader_page_top}>
                                    <span>Глава</span>
                                    <span>{currentPage} / {activePagesCount}</span>
                                </div>
                                <DynamicMarkdownContent content={activePage.Text} />
                            </div>
                        </main>

                        <div className={styles.reader_notes}>
                            <div className={styles.note_line}></div>
                            <p>Текст сохранен в мягком контрасте, чтобы глаза меньше уставали на темной теме.</p>
                        </div>
                    </div>
                </div>
                <BookPageFooter onPageChange={onPageChange} totalPages={activePagesCount} currentPage={currentPage} />
            </div>

        )
    }



})

export default BookPageF;
