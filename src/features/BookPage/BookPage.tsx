import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

import styles from './BookPage.module.scss'
import DynamicMarkdownContent from "../../shared/components/DynamicMarkdownContent/DynamicMarkdownContent";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useStores } from "../../store/context/GloabalContext";
import { observer } from "mobx-react-lite";
import BookPageFooter from "../../shared/components/Footer/BookPageFooter";
import { IoBookmarkOutline, IoReaderOutline, IoTimeOutline } from "react-icons/io5";
import SelectionHeader from "../../shared/components/Header/SelectionHeader/SelectionHeader";

const leftAsideWidth = 250;
const rightAsideWidth = 210;
const readerGap = 32;
const resizeDistance = 520;
const hideAsidesAfter = 0.58;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const BookPageF = observer(() => {
    const { id, pageNumber } = useParams()
    const navigate = useNavigate();
    const currentPage = Number(pageNumber || 1);
    const isValidPage = Number.isInteger(currentPage) && currentPage > 0;
    const currentPageRef = useRef(currentPage);
    const sessionIdRef = useRef<string | null>(null);
    const closedSessionIdsRef = useRef(new Set<string>());
    const isMountedRef = useRef(false);
    const isStartingSessionRef = useRef(false);
    const lastProgressRequestRef = useRef<string | null>(null);
    const startReadingRef = useRef<((bookId: string) => Promise<any>) | null>(null);
    const closeReadingSessionRef = useRef<((sessionId: string) => Promise<any>) | null>(null);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [readerExpand, setReaderExpand] = useState(0);
    const [isResizing, setIsResizing] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [isReadingCompleted, setIsReadingCompleted] = useState(false);
    const resizeStartRef = useRef({ x: 0, expand: 0 });
    const shouldHideAsides = readerExpand >= hideAsidesAfter;
    const effectiveReaderExpand = shouldHideAsides ? readerExpand : readerExpand * 0.72;

    const readerShellStyle = useMemo(() => ({
        '--reader-aside-left': `${Math.round(leftAsideWidth * (1 - effectiveReaderExpand))}px`,
        '--reader-aside-right': `${Math.round(rightAsideWidth * (1 - effectiveReaderExpand))}px`,
        '--reader-gap': `${Math.round(readerGap * (1 - effectiveReaderExpand))}px`,
    }) as CSSProperties, [effectiveReaderExpand]);

    const handleResizePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsResizing(true);
        resizeStartRef.current = { x: event.clientX, expand: readerExpand };
    };

    useEffect(() => {
        if (!isResizing) {
            return;
        }

        const handlePointerMove = (event: PointerEvent) => {
            const delta = resizeStartRef.current.x - event.clientX;
            setReaderExpand(clamp(resizeStartRef.current.expand + delta / resizeDistance, 0, 1));
        };

        const handlePointerUp = () => {
            setIsResizing(false);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isResizing]);

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
            book,
            getBookById,
            getBookState
        },
        readingStore: {
            startReading,
            startReadingState,
            updateProgress,
            updateProgressState,
            setLocalReadingProgress,
            finishReading,
            finishReadingState,
            closeReadingSession,
            closeReadingSessionState,
        },
        bookRevsStore: {
            createBookReview,
            createBookReviewState,
        }
    } = useStores()

    startReadingRef.current = startReading;
    closeReadingSessionRef.current = closeReadingSession;

    const saveReadingProgress = useCallback((page: number) => {
        if (!id || !isValidPage || !page || page < 1 || !pagesCount) {
            return;
        }

        const normalizedPage = Math.min(page, pagesCount);
        setLocalReadingProgress(id, normalizedPage, pagesCount);

        if (!activeSessionId) {
            return;
        }

        const progressRequestKey = `${id}:${activeSessionId}:${normalizedPage}`;
        if (lastProgressRequestRef.current === progressRequestKey) {
            return;
        }

        lastProgressRequestRef.current = progressRequestKey;
        updateProgress(id, normalizedPage);
    }, [activeSessionId, id, isValidPage, pagesCount, setLocalReadingProgress, updateProgress]);

    const onPageChange = useCallback((page: number) => {
        if (!id || !page || page < 1 || (pagesCount && page > pagesCount)) {
            console.error('Параметров не обнаружено');
            return;
        }

        saveReadingProgress(page);
        navigate(`/books/${id}/pages/${page}`);
    }, [id, navigate, pagesCount, saveReadingProgress]);

    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const closeActiveSession = useCallback(() => {
        const sessionId = sessionIdRef.current;

        if (!sessionId || closedSessionIdsRef.current.has(sessionId)) {
            return;
        }

        closedSessionIdsRef.current.add(sessionId);
        sessionIdRef.current = null;

        if (isMountedRef.current) {
            setActiveSessionId(null);
        }

        closeReadingSessionRef.current?.(sessionId);
    }, []);

    const startActiveSession = useCallback(async () => {
        if (!id || !isValidPage || sessionIdRef.current || isStartingSessionRef.current || document.hidden) {
            return;
        }

        let reading = null;

        try {
            isStartingSessionRef.current = true;
            reading = await startReadingRef.current?.(id);
        } finally {
            isStartingSessionRef.current = false;
        }

        if (!reading) {
            return;
        }

        if (!isMountedRef.current || document.hidden) {
            if (!closedSessionIdsRef.current.has(reading.SessionId)) {
                closedSessionIdsRef.current.add(reading.SessionId);
                closeReadingSessionRef.current?.(reading.SessionId);
            }
            return;
        }

        closedSessionIdsRef.current.delete(reading.SessionId);
        sessionIdRef.current = reading.SessionId;
        setActiveSessionId(reading.SessionId);
    }, [id, isValidPage]);



    const handleGetBook = useCallback(async () => {
        if (id && pageNumber && isValidPage) {
            await Promise.all([
                getBookById(id),
                getPageById(id, pageNumber),
                getPagesCount(id),

            ]);
        } else {
            console.error('Параметр id или pageNumber не найден')
        }
    }, [id, pageNumber, isValidPage, getBookById, getPagesCount, getPageById])

    useEffect(() => {
        handleGetBook()

    }, [handleGetBook]);

    useEffect(() => {
        currentPageRef.current = currentPage;
    }, [currentPage]);

    useEffect(() => {
        setActiveSessionId(null);
        sessionIdRef.current = null;
        startActiveSession();

        return () => {
            closeActiveSession();
        };
    }, [id, isValidPage, startActiveSession, closeActiveSession]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                closeActiveSession();
                return;
            }

            startActiveSession();
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('pagehide', closeActiveSession);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('pagehide', closeActiveSession);
        };
    }, [startActiveSession, closeActiveSession]);

    useEffect(() => {
        if (!id || !isValidPage || !activeSessionId) {
            return;
        }

        saveReadingProgress(currentPage);
    }, [id, currentPage, isValidPage, activeSessionId, saveReadingProgress]);

    useEffect(() => {
        setSelectedRating(0);
        setIsReadingCompleted(false);
    }, [id]);

    const activeBook = book;
    const activePage = page;
    const activePagesCount = pagesCount;
    const isLastPage = Boolean(activePagesCount && currentPage >= activePagesCount);

    const handleFinishReading = async () => {
        if (!id || selectedRating === 0) {
            return;
        }

        const sessionId = sessionIdRef.current;
        if (sessionId && !closedSessionIdsRef.current.has(sessionId)) {
            const finishedReading = await finishReading(sessionId, currentPage);

            if (!finishedReading) {
                return;
            }

            closedSessionIdsRef.current.add(sessionId);
            sessionIdRef.current = null;
            setActiveSessionId(null);
        }

        const reviewCreated = await createBookReview(id, selectedRating);
        if (reviewCreated) {
            setIsReadingCompleted(true);
        }
    };

    if (getBookState.loading || getPageState.loading || getPagesCountState.loading || startReadingState.loading) {
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

    if (getBookState.error || getPageState.error || getPagesCountState.error || startReadingState.error) {
        return (
            <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{getBookState.error || getPageState.error || getPagesCountState.error || startReadingState.error}</p>
        )
    }

    if (!isValidPage || !activeBook || !activePage || !activePagesCount) {
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
                    <div
                        className={`${styles.reader_shell} ${shouldHideAsides ? styles.reader_shell_expanded : ''} ${isResizing ? styles.reader_shell_resizing : ''}`}
                        style={readerShellStyle}
                    >
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
                                    <span>
                                        Страница {currentPage}
                                        {(updateProgressState.loading || finishReadingState.loading || closeReadingSessionState.loading) && ' · сохраняем'}
                                    </span>
                                </div>
                                <div className={styles.meta_item}>
                                    <IoTimeOutline />
                                    <span>{activeBook.ReadingTime || 'Спокойное чтение'}</span>
                                </div>
                            </div>
                        </aside>

                        <div
                            className={styles.reader_resize_zone}
                            onPointerDown={handleResizePointerDown}
                        />

                        <main className={styles.book_page_block_style}>
                            <div className={styles.book_page_block_style_inner}>
                                <div className={styles.reader_page_top}>
                                    <span>Глава</span>
                                    <span>{currentPage} / {activePagesCount}</span>
                                </div>
                                <DynamicMarkdownContent content={activePage.Text} />
                                {isLastPage && (
                                    <section className={styles.finish_reading_card}>
                                        <div>
                                            <p className={styles.finish_title}>
                                                Вы дошли до конца книги
                                            </p>
                                            <p className={styles.finish_text}>
                                                Завершите чтение и поставьте оценку, чтобы она учитывалась в рекомендациях и статистике.
                                            </p>
                                        </div>

                                        <div className={styles.rating_picker}>
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <button
                                                    key={rating}
                                                    type="button"
                                                    className={`${styles.rating_button} ${selectedRating >= rating ? styles.rating_button_active : ''}`}
                                                    onClick={() => setSelectedRating(rating)}
                                                    disabled={isReadingCompleted || createBookReviewState.loading || finishReadingState.loading}
                                                >
                                                    {rating}
                                                </button>
                                            ))}
                                        </div>

                                        {(createBookReviewState.error || finishReadingState.error) && (
                                            <p className={styles.finish_error}>
                                                {createBookReviewState.error || finishReadingState.error}
                                            </p>
                                        )}

                                        {isReadingCompleted ? (
                                            <p className={styles.finish_success}>Чтение завершено, оценка сохранена.</p>
                                        ) : (
                                            <button
                                                className={styles.finish_button}
                                                type="button"
                                                onClick={handleFinishReading}
                                                disabled={selectedRating === 0 || createBookReviewState.loading || finishReadingState.loading}
                                            >
                                                {createBookReviewState.loading || finishReadingState.loading
                                                    ? 'Сохраняем...'
                                                    : 'Завершить чтение'}
                                            </button>
                                        )}
                                    </section>
                                )}
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
