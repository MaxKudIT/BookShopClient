
import { observer } from 'mobx-react-lite';
import styles from './FavsF.module.scss'
import SelectionHeader from '../../shared/components/Header/SelectionHeader/SelectionHeader';
import FavsFilterField from '../../shared/components/FilterField/MainBooksFilterField/MainBooksFilterField';
import FavBookPreview from '../../shared/components/Previews/FavBookPreview/FavBookPreview';
import { IoBagHandleOutline, IoBookOutline } from 'react-icons/io5';
import SelectionFooter from '../../shared/components/Footer/SelectionFooter/SelectionFooter';
import { MdShoppingCartCheckout } from 'react-icons/md';
import Banner from '../../shared/components/Banner/Banner';

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
                        <p style={{ fontSize: 25, color: "#F9FAFBFF", wordSpacing: 3, fontWeight: 500 }}>Мое
                            <span className={styles.text_gradient}> Избранное</span></p>
                        <p style={{ fontSize: 14, color: '#BDC2CBFF' }}>Ваша персональная коллекция вдохновения</p>
                    </div>
                        
                   
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

                    <Banner icon={MdShoppingCartCheckout} color='#5269E0FF' title='Готовы к новому путешествию?' description='Не оставляйте любимых героев в одиночестве. Оформите подписку сегодня и получите дополнительный месяц бесплатно.' />





                </div>
                <SelectionFooter />
            </div>
        </>





    )
})

export default FavsF;