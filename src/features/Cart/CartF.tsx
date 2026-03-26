import { observer } from 'mobx-react-lite';
import styles from './CartF.module.scss'
import SelectionHeader from '../../shared/components/Header/SelectionHeader/SelectionHeader';
import CartView, { type CartSelectedType } from '../../shared/components/CartView/CartView';
import ItemViewComponent from '../../shared/components/ItemViewComponent/ItemViewComponent';

const CartF = observer(() => {
  // const {
  //   favItemsStore: { count: favCount, getCountFav, countFavState },
  //   cartItemsStore: {
  //     getCartItems,
  //     getCartItemsState,
  //     cartItemsPreview,
  //     deleteCartItems,
  //     deleteCartItemsState,
  //     count: cartCount,
  //     getCountCart,
  //     countCartState
  //   }
  // } = useStores();


  // const pageLoading = useMemo(() => 
  //   countFavState.loading || countCartState.loading || getCartItemsState.loading,
  //   [countFavState.loading, countCartState.loading, getCartItemsState.loading]
  // );


  // const pageError = useMemo(() => 
  //   countFavState.error || countCartState.error || getCartItemsState.error,
  //   [countFavState.error, countCartState.error, getCartItemsState.error]
  // );


  // useEffect(() => {
  //   const loadCounters = async () => {
  //     await Promise.all([
  //       getCountFav(),
  //       getCountCart()
  //     ]);
  //   };
  //   loadCounters();
  // }, [getCountFav, getCountCart]);

  // useEffect(() => {
  //   getCartItems();
  // }, [getCartItems]);


  // useEffect(() => {
  //   if (!deleteCartItemsState.loading && !deleteCartItemsState.error) {
  //     getCartItems();
  //   }
  // }, [deleteCartItemsState.loading, deleteCartItemsState.error, getCartItems]);

  return (
    //   <LoadingErrorWrapper loading={pageLoading} error={pageError}>
    //     <NavMediaComponent 
    //       countCart={cartCount ?? 0} 
    //       countFav={favCount ?? 0} 
    //       pageType="cart" 
    //     />


    //     <CartView 
    //       items={cartItemsPreview || []} 
    //       handleDeleteItem={deleteCartItems} 
    //       loading={getCartItemsState.loading}

    //     />
    //   </LoadingErrorWrapper>
    <div className={styles.cartf_page_style}>
      <SelectionHeader />
      <div className={styles.cartf_main_container}>
        <div style={{display: 'flex', columnGap: 10, alignItems: 'center', marginBottom: 30}}>
          <p style={{fontSize: 25, color: "#F9FAFBFF", fontFamily: 'MTSWide'}}>Ваша корзина</p>
          <p style={{fontSize: 16, color: '#BDC2CBFF'}}>(3 товара)</p>
        </div>
        <ItemViewComponent Id={''} ImageUrl={''} Title={''} Author={''} Price={0} Discount={0} Rate={0} addItem={function (el: CartSelectedType): void {
          throw new Error('Function not implemented.');
        } } deleteItem={function (id: string): void {
          throw new Error('Function not implemented.');
        } } isSelected={false} type={'cartItem'} handleDeleteItem={function (bookId: string[]): void {
          throw new Error('Function not implemented.');
        } }/> 
      </div>
    </div>


  );
});

export default CartF;