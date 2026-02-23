
import { observer } from 'mobx-react-lite';
import { usePost } from "../../shared/hooks/queries";
import { getAuth } from "firebase/auth";
import CartView from "../../shared/components/CartView/CartView";
import { useStores } from '../../store/context/GloabalContext';
import { useCallback, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const CartF = observer(() => {

    const auth = getAuth();


    const {

        cartItemsStore: {
            getCartItems,
            getCartItemsState,
            cartItemsPreview,

            deleteCartItems,
            deleteCartItemsState
        }
    } = useStores()



    const handleResultCart = useCallback(async () => {
        await getCartItems();
    }, [getCartItems])


    useEffect(() => {
        handleResultCart();
    }, [handleResultCart]); 
    

    if (getCartItemsState.loading) {
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

    if (getCartItemsState.error || deleteCartItemsState.error) {
        return (
            <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{getCartItemsState.error || deleteCartItemsState.error}</p>
        )
    }


   


    return (
        <CartView items={cartItemsPreview || []} handleDeleteItem={deleteCartItems} loading={deleteCartItemsState.loading} error={deleteCartItemsState.error} />
    )
})

export default CartF;