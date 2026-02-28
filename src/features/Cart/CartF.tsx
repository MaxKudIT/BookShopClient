
import { observer } from 'mobx-react-lite';

import CartView from "../../shared/components/CartView/CartView";
import { useStores } from '../../store/context/GloabalContext';
import { useCallback, useEffect } from 'react';
import NavMediaComponent from '../../shared/components/Navigation/MediaNavigation/NavMediaComponent';


const CartF = observer(() => {

 


    const {
        favItemsStore: {
           

            count,
            countFavState,
            getCountFav
        },
        cartItemsStore: {
            getCartItems,
            getCartItemsState,
            cartItemsPreview,


            deleteCartItems,
            deleteCartItemsState,

            count: cartCount,
            countCartState,
            getCountCart
        },

    } = useStores()


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
        if (!deleteCartItemsState.loading && deleteCartItemsState.error === null) {
          
            getCartItems();
        }
    }, [deleteCartItemsState.loading, deleteCartItemsState.error, getCartItems]);



    if (getCartItemsState.error || deleteCartItemsState.error || countFavState.error || countCartState.error) {
        return (
            <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{getCartItemsState.error || deleteCartItemsState.error || countFavState.error || countCartState.error}</p>
        )
    }





    return (
        <>
         <NavMediaComponent countCart={cartCount} countFav={count} pageType="cart"/>
           <CartView items={cartItemsPreview || []} handleDeleteItem={deleteCartItems} loading={getCartItemsState.loading} />
        </>
      
    )
})

export default CartF;