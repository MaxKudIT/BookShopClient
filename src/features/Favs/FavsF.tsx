
import { observer } from 'mobx-react-lite';
import styles from './FavsF.module.scss'
import SelectionHeader from '../../shared/components/Header/SelectionHeader/SelectionHeader';
import FavsFilterField from '../../shared/components/FilterField/FavsFilterField/FavsFilterField';
import FavBookPreview from '../../shared/components/FavBookPreview/FavBookPreview';
import { IoBagHandleOutline, IoBookOutline } from 'react-icons/io5';
import SelectionFooter from '../../shared/components/Footer/SelectionFooter/SelectionFooter';

const FavsF = observer(() => {

    // const {
    //     favItemsStore: {
    //         getFavItems,
    //         getFavItemsState,
    //         favItemsPreview,



    //         deleteFavItems,
    //         deleteFavItemsState,

    //         count,
    //         countFavState,
    //         getCountFav
    //     },
    //     cartItemsStore: {
    //         areAllInCart,
    //         areAllInCartItem,
    //         areAllInCartState,

    //         count: cartCount,
    //         countCartState,
    //         getCountCart
    //     }

    // } = useStores()



    // const { loading: addLoad, error: addError, post } = usePost('/ci/some');


    // const auth = getAuth();

    // const handleAddToCart = useCallback(async (bookIds: string[]) => {
    //     try {

    //         const idToken = await auth.currentUser?.getIdToken();
    //         await post({ BookIds: bookIds }, { idToken: idToken });



    //     } catch (err) {
    //         console.error('Ошибка добавления книг в корзину:', err);
    //     }
    // }, [post]);


    // const handleResultBook = useCallback(async () => {


    //         await Promise.all([

    //             getCountFav(),
    //             getCountCart()
    //         ])



    // }, [])

    // useEffect(() => {
    //     handleResultBook()
    // }, [handleResultBook]);


    // useEffect(() => {
    //     const loadFavItems = async () => {
    //         if (!deleteFavItemsState.loading && deleteFavItemsState.error === null) {
    //             await getFavItems();
    //         }
    //     };

    //     loadFavItems();
    // }, [deleteFavItemsState.loading, deleteFavItemsState.error, getFavItems]);


    // useEffect(() => {
    //     const checkCart = async () => {
    //         if (!addLoad && addError === null) {
    //             if (favItemsPreview && favItemsPreview.length > 0) {
    //                 const bookIds = favItemsPreview.map(el => el.Id);
    //                 await areAllInCartItem(bookIds);
    //             }
    //         }

    //     };

    //     checkCart();
    // }, [favItemsPreview, addLoad, addError]);


    // if (getFavItemsState.error || deleteFavItemsState.error || addError || areAllInCartState.error || countFavState.error || countCartState.error) {
    //     return (
    //         <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{getFavItemsState.error || deleteFavItemsState.error || addError || areAllInCartState.error || countFavState.error || countCartState.error}</p>
    //     )
    // }





    return (
        <>
            {/* <NavMediaComponent countCart={cartCount} countFav={count} pageType="favs" />
            <FavsView
                items={favItemsPreview || []}

                handleDeleteItem={deleteFavItems}
                loading={deleteFavItemsState.loading}

                handleAddToCart={handleAddToCart}
                loading2={addLoad}


                areAllInCart={areAllInCart}
                loading3={areAllInCartState.loading}
            /> */}


            <div className={styles.favs_page_style}>
                <SelectionHeader />
                <div className={styles.favs_main_container}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
                        <p style={{ fontSize: 34, color: "#F9FAFBFF", wordSpacing: 3, fontWeight: 500 }}>Мое
                            <span className={styles.text_gradient}> Избранное</span></p>
                        <p style={{ fontSize: 15, color: '#BDC2CBFF' }}>Ваша персональная коллекция вдохновения</p>
                    </div>

                    <FavsFilterField />
                    <div className={styles.favs_books_container}>
                        <FavBookPreview book={{
                            Id: '1',
                            Title: 'Мастер и Маргарита',
                            Author: 'Михаил Булгаков',
                            Genre: 'Драма',
                            Rate: 4.9,
                            ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
                            IsMine: true,
                            Price: 800,
                            Discount: 10

                        }} />
                        <FavBookPreview book={{
                            Id: '1',
                            Title: 'Мастер и Маргарита',
                            Author: 'Михаил Булгаков',
                            Genre: 'Драма',
                            Rate: 4.9,
                            ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
                            IsMine: true,
                            Price: 800,
                            Discount: 10

                        }} />
                        <FavBookPreview book={{
                            Id: '1',
                            Title: 'Мастер и Маргарита',
                            Author: 'Михаил Булгаков',
                            Genre: 'Драма',
                            Rate: 4.9,
                            ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
                            IsMine: true,
                            Price: 800,
                            Discount: 10

                        }} />
                        <FavBookPreview book={{
                            Id: '1',
                            Title: 'Мастер и Маргарита',
                            Author: 'Михаил Булгаков',
                            Genre: 'Драма',
                            Rate: 4.9,
                            ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
                            IsMine: true,
                            Price: 800,
                            Discount: 10

                        }} />
                        <FavBookPreview book={{
                            Id: '1',
                            Title: 'Мастер и Маргарита',
                            Author: 'Михаил Булгаков',
                            Genre: 'Драма',
                            Rate: 4.9,
                            ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
                            IsMine: true,
                            Price: 800,
                            Discount: 10

                        }} />
                        <FavBookPreview book={{
                            Id: '1',
                            Title: 'Мастер и Маргарита',
                            Author: 'Михаил Булгаков',
                            Genre: 'Драма',
                            Rate: 4.9,
                            ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
                            IsMine: true,
                            Price: 800,
                            Discount: 10

                        }} />
                        <FavBookPreview book={{
                            Id: '1',
                            Title: 'Мастер и Маргарита',
                            Author: 'Михаил Булгаков',
                            Genre: 'Драма',
                            Rate: 4.9,
                            ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
                            IsMine: true,
                            Price: 800,
                            Discount: 10

                        }} />
                    </div>

                    <div style={{
                        display: 'flex',
                        width: '100%',
                        height: 410,
                        background: '#1E2029FF',
                        border: '1px solid #353746FF',
                        borderRadius: 15,
                        marginTop: 100,
                        justifyContent: 'center',
                        
                    }}>

                        <div style={{
                            height: '100%',
                            width: '40%',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '50px 0',
                            alignItems: 'center',
                            minWidth: 500
                        }}>
                            <div style={{
                                background: '#5269E01A',
                                border: '2px solid #5269E033',
                                padding: 10,
                                borderRadius: 10,
                                marginBottom: 20,
                                width: 'fit-content'
                            }}>
                                <IoBagHandleOutline style={{
                                    color: '#5269E0FF',
                                    fontSize: 34
                                }} />
                            </div>

                            <p style={{ fontSize: 30, color: '#F9F9FBFF', fontWeight: 700, marginBottom: 10 }}>Готовы к новому путешествию?</p>
                            <p style={{ color: '#DFE0E7FF', fontSize: 16, marginBottom: 40, textAlign: 'center' }}>Не оставляйте любимых героев в одиночестве. Оформите подписку сегодня и получите дополнительный месяц бесплатно.</p>
                            <div style={{ display: 'flex', columnGap: 20 }}>
                                <button className={styles.sub_prem_button_one}>
                                    Перейти к оформлению
                                </button>
                                <button className={styles.sub_prem_button_two}>
                                    <IoBookOutline />
                                    Продолжить чтение
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <SelectionFooter />
            </div>
        </>





    )
})

export default FavsF;