
import { observer } from 'mobx-react-lite';

import CartView from "../../shared/components/CartView/CartView";
import { useStores } from '../../store/context/GloabalContext';
import { useCallback, useEffect } from 'react';


const CartF = observer(() => {

 


    const {

        cartItemsStore: {
            getCartItems,
            getCartItemsState,
            cartItemsPreview,


            deleteCartItems,
            deleteCartItemsState
        },

    } = useStores()


    useEffect(() => {
        if (!deleteCartItemsState.loading && deleteCartItemsState.error === null) {
          
            getCartItems();
        }
    }, [deleteCartItemsState.loading, deleteCartItemsState.error, getCartItems]);



    if (getCartItemsState.error || deleteCartItemsState.error) {
        return (
            <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{getCartItemsState.error || deleteCartItemsState.error}</p>
        )
    }





    return (
        <CartView items={cartItemsPreview || []} handleDeleteItem={deleteCartItems} loading={getCartItemsState.loading} />
    )
})

export default CartF;