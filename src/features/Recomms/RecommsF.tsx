
import { observer } from 'mobx-react-lite';
import styles from './RecommsF.module.scss'
import SelectionHeader from '../../shared/components/Header/SelectionHeader/SelectionHeader';

import SelectionFooter from '../../shared/components/Footer/SelectionFooter/SelectionFooter';
import { BsMagic } from 'react-icons/bs';
import RecommsRowWithDynamic from '../../shared/components/RecommsRow/RecommsRowWithDynamic/RecommsRowWithDynamic';
import { AiOutlineRise } from 'react-icons/ai';
import { RiShoppingBag4Line, RiTimerFlashLine } from 'react-icons/ri';
import Banner from '../../shared/components/Banner/Banner';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useStores } from '../../store/context/GloabalContext';

const RecommsF = observer(() => {
    const {
        recommendationStore: {
            recommendationsPage,
            getRecommendationsPage,
            getRecommendationsPageState,
        },
    } = useStores();

    useEffect(() => {
        getRecommendationsPage(10);
    }, [getRecommendationsPage]);

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


            <div className={styles.recomm_page_style_inc}>
                <SelectionHeader />
                <div className={styles.recomm_main_container}>
                    {getRecommendationsPageState.loading ? (
                        <CircularProgress sx={{ color: '#8da6ff', alignSelf: 'center', mt: 4 }} />
                    ) : getRecommendationsPageState.error ? (
                        <p style={{ color: '#ff8f8f', fontSize: 16 }}>{getRecommendationsPageState.error}</p>
                    ) : (
                        <>
                            <RecommsRowWithDynamic
                                color='purple'
                                icon={BsMagic}
                                title='Персонально для вас'
                                description='На основе ваших интересов и недавних покупок'
                                books={recommendationsPage?.forYou ?? []}
                            />

                            <RecommsRowWithDynamic
                                
                                color='pink'
                                icon={AiOutlineRise}
                                title='Сейчас в тренде'
                                description='Книги, которые обсуждают все прямо сейчас'
                                books={recommendationsPage?.trend ?? []}
                            />

                            <RecommsRowWithDynamic
                                color='blue'
                                icon={RiTimerFlashLine}
                                title='Свежие поступления'
                                description='Только что из печати, специально для нашей библиотеки'
                                books={recommendationsPage?.fresh ?? []}
                            />
                        </>
                    )}

                    <Banner icon={RiShoppingBag4Line} color='#3470df' title='Что скрывают следующие страницы?' description='Книги ждут своего часа. Не дайте историям оборваться.  Подпишитесь сейчас — откроется доступ ко всем новинкам, а первый месяц за наш счёт.' />


                </div>
                <SelectionFooter />
            </div>
        </>





    )
})

export default RecommsF;
