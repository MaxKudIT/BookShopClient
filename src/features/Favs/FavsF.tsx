
import { observer } from 'mobx-react-lite';
import { useStores } from '../../store/context/GloabalContext';
import { useCallback, useEffect } from 'react';
import FavsView from '../../shared/components/FavsView/FavsView';
import { usePost } from '../../shared/hooks/queries';
import { getAuth } from 'firebase/auth';
import NavMediaComponent from '../../shared/components/Navigation/MediaNavigation/NavMediaComponent';


const FavsF = observer(() => {

    const {
        favItemsStore: {
            getFavItems,
            getFavItemsState,
            favItemsPreview,



            deleteFavItems,
            deleteFavItemsState,

            count,
            countFavState,
            getCountFav
        },
        cartItemsStore: {
            areAllInCart,
            areAllInCartItem,
            areAllInCartState,

            count: cartCount,
            countCartState,
            getCountCart
        }

    } = useStores()



    const { loading: addLoad, error: addError, post } = usePost('/ci/some');


    const auth = getAuth();

    const handleAddToCart = useCallback(async (bookIds: string[]) => {
        try {

            const idToken = await auth.currentUser?.getIdToken();
            await post({ BookIds: bookIds }, { idToken: idToken });



        } catch (err) {
            console.error('Ошибка добавления книг в корзину:', err);
        }
    }, [post]);


    const handleResultBook = useCallback(async () => {
      

            await Promise.all([
            
                getCountFav(),
                getCountCart()
            ])


        
    }, [])

    useEffect(() => {
        handleResultBook()
    }, [handleResultBook]);


    useEffect(() => {
        const loadFavItems = async () => {
            if (!deleteFavItemsState.loading && deleteFavItemsState.error === null) {
                await getFavItems();
            }
        };

        loadFavItems();
    }, [deleteFavItemsState.loading, deleteFavItemsState.error, getFavItems]);


    useEffect(() => {
        const checkCart = async () => {
            if (!addLoad && addError === null) {
                if (favItemsPreview && favItemsPreview.length > 0) {
                    const bookIds = favItemsPreview.map(el => el.Id);
                    await areAllInCartItem(bookIds);
                }
            }

        };

        checkCart();
    }, [favItemsPreview, addLoad, addError]);


    if (getFavItemsState.error || deleteFavItemsState.error || addError || areAllInCartState.error || countFavState.error || countCartState.error) {
        return (
            <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{getFavItemsState.error || deleteFavItemsState.error || addError || areAllInCartState.error || countFavState.error || countCartState.error}</p>
        )
    }





    return (
        <>
            <NavMediaComponent countCart={cartCount} countFav={count} pageType="favs" />
            <FavsView
                items={favItemsPreview || []}

                handleDeleteItem={deleteFavItems}
                loading={deleteFavItemsState.loading}

                handleAddToCart={handleAddToCart}
                loading2={addLoad}


                areAllInCart={areAllInCart}
                loading3={areAllInCartState.loading}
            />
        </>





    )
})

export default FavsF;