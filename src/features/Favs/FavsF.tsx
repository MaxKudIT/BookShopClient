
import { observer } from 'mobx-react-lite';

import CartView from "../../shared/components/CartView/CartView";
import { useStores } from '../../store/context/GloabalContext';
import { useCallback, useEffect } from 'react';
import FavsView from '../../shared/components/FavsView/FavsView';


const FavsF = observer(() => {

   const {
        favItemsStore: {
            getFavItems,
            getFavItemsState,
            favItemsPreview,

            deleteFavItems,
            deleteFavItemsState
        }

    } = useStores()


    useEffect(() => {
        if (!deleteFavItemsState.loading && deleteFavItemsState.error === null) {
          
            getFavItems();
        }
    }, [deleteFavItemsState.loading, deleteFavItemsState.error, getFavItems]);



    if (getFavItemsState.error || deleteFavItemsState.error) {
        return (
            <p style={{ color: 'red', marginTop: 20, fontSize: 20 }}>{getFavItemsState.error || deleteFavItemsState.error}</p>
        )
    }





    return (
        <FavsView items={favItemsPreview || []} handleDeleteItem={deleteFavItems} loading={deleteFavItemsState.loading} />
    )
})

export default FavsF;