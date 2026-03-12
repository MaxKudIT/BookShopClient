import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo } from 'react';
import { useStores } from '../../store/context/GloabalContext';

import CartView from '../../shared/components/CartView/CartView';
import LoadingErrorWrapper from '../../shared/components/LoadingErrorWrapper/LoadingErrorWrapper';
import NavMediaComponent from '../../shared/components/Navigation/MediaNavigation/NavMediaComponent';


const CartF = observer(() => {
  const {
    favItemsStore: { count: favCount, getCountFav, countFavState },
    cartItemsStore: {
      getCartItems,
      getCartItemsState,
      cartItemsPreview,
      deleteCartItems,
      deleteCartItemsState,
      count: cartCount,
      getCountCart,
      countCartState
    }
  } = useStores();


  const pageLoading = useMemo(() => 
    countFavState.loading || countCartState.loading || getCartItemsState.loading,
    [countFavState.loading, countCartState.loading, getCartItemsState.loading]
  );


  const pageError = useMemo(() => 
    countFavState.error || countCartState.error || getCartItemsState.error,
    [countFavState.error, countCartState.error, getCartItemsState.error]
  );


  useEffect(() => {
    const loadCounters = async () => {
      await Promise.all([
        getCountFav(),
        getCountCart()
      ]);
    };
    loadCounters();
  }, [getCountFav, getCountCart]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

 
  useEffect(() => {
    if (!deleteCartItemsState.loading && !deleteCartItemsState.error) {
      getCartItems();
    }
  }, [deleteCartItemsState.loading, deleteCartItemsState.error, getCartItems]);

  return (
    <LoadingErrorWrapper loading={pageLoading} error={pageError}>
      <NavMediaComponent 
        countCart={cartCount ?? 0} 
        countFav={favCount ?? 0} 
        pageType="cart" 
      />
      
      
      <CartView 
        items={cartItemsPreview || []} 
        handleDeleteItem={deleteCartItems} 
        loading={getCartItemsState.loading}
    
      />
    </LoadingErrorWrapper>
  );
});

export default CartF;