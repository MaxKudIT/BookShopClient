import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import styles from './FavsF.module.scss'
import SelectionHeader from '../../shared/components/Header/SelectionHeader/SelectionHeader';
import FavBookPreview from '../../shared/components/Previews/FavBookPreview/FavBookPreview';
import SelectionFooter from '../../shared/components/Footer/SelectionFooter/SelectionFooter';
import { IoLibraryOutline, IoSparklesOutline } from 'react-icons/io5';
import { useStores } from '../../store/context/GloabalContext';

const FavsF = observer(() => {
    const {
        favItemsStore: {
            favItemsPreview,
            getFavItems,
            getFavItemsState,
            deleteFavItems,
            deleteFavItemsState,
            getCountFav,
        },
    } = useStores();

    const favoriteBooks = favItemsPreview ?? [];

    useEffect(() => {
        getFavItems();
        getCountFav();
    }, [getFavItems, getCountFav]);

    const handleDeleteFav = async (bookId: string) => {
        if (deleteFavItemsState.loading) {
            return;
        }

        await deleteFavItems([bookId]);
        await Promise.all([
            getFavItems(),
            getCountFav(),
        ]);
    };

    const handleClearFavs = async () => {
        if (favoriteBooks.length === 0 || deleteFavItemsState.loading) {
            return;
        }

        await deleteFavItems(favoriteBooks.map((book) => book.Id));
        await Promise.all([
            getFavItems(),
            getCountFav(),
        ]);
    };

    return (
        <div className={styles.favs_page_style}>
            <SelectionHeader />
            <main className={styles.favs_main_container}>
                <section className={styles.favs_header}>
                    <div className={styles.favs_title_group}>
                        <div style={{display: 'flex', flexDirection: 'column', rowGap: 5}}>
                            <p className={styles.favs_title}>Мое <span className={styles.text_gradient}>Избранное</span></p>
                            <p className={styles.favs_subtitle}>Ваша персональная коллекция вдохновения</p>
                        </div>
                    </div>
                    <div className={styles.header_stats}>
                        <div className={styles.stat_item}>
                            <IoLibraryOutline />
                            <p>{favoriteBooks.length} книг</p>
                        </div>
                        <div className={styles.stat_item}>
                            <IoSparklesOutline />
                            <p>Подборка обновлена</p>
                        </div>
                    </div>
                </section>

                <section className={styles.favs_panel}>
                    <div className={styles.panel_header}>
                        <div>
                            <p className={styles.panel_title}>Сохраненные книги</p>
                        </div>
                        <button
                            className={styles.panel_action}
                            disabled={favoriteBooks.length === 0 || deleteFavItemsState.loading}
                            onClick={handleClearFavs}
                        >
                            {deleteFavItemsState.loading ? 'Удаляем...' : 'Очистить'}
                        </button>
                    </div>

                    {getFavItemsState.loading && (
                        <div className={styles.state_block}>Загружаем избранное...</div>
                    )}

                    {getFavItemsState.error && (
                        <div className={styles.error_block}>{getFavItemsState.error}</div>
                    )}

                    {deleteFavItemsState.error && (
                        <div className={styles.error_block}>{deleteFavItemsState.error}</div>
                    )}

                    {!getFavItemsState.loading && !getFavItemsState.error && favoriteBooks.length === 0 && (
                        <div className={styles.state_block}>В избранном пока нет книг</div>
                    )}

                    {!getFavItemsState.loading && !getFavItemsState.error && favoriteBooks.length > 0 && (
                        <div className={styles.favs_books_container}>
                            {favoriteBooks.map((book) => (
                                <FavBookPreview
                                    key={book.Id}
                                    book={book}
                                    isDeleting={deleteFavItemsState.loading}
                                    onDelete={handleDeleteFav}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <SelectionFooter />
        </div>
    )
})

export default FavsF;
