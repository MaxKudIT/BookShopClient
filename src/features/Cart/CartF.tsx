import { observer } from 'mobx-react-lite';
import styles from './CartF.module.scss'
import SelectionHeader from '../../shared/components/Header/SelectionHeader/SelectionHeader';
import CartView, { type CartSelectedType } from '../../shared/components/CartView/CartView';
import ItemViewComponent from '../../shared/components/CartItem/CartItem';
import { Divider } from '@mui/material';
import { FaRubleSign, FaSackDollar } from 'react-icons/fa6';
import { IoMdCard, IoMdInformationCircleOutline } from 'react-icons/io';
import { IoCartOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';

import SelectionFooter from '../../shared/components/Footer/SelectionFooter/SelectionFooter';
import type { FC } from 'react';
import type { IconType } from 'react-icons';
import RecommsRow from '../../shared/components/RecommsRow/RecommsRow';
import RecommsCart from '../../shared/components/RecommsRow/RecommsCart/RecommsCart';

import { TbReportMoney } from "react-icons/tb";
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
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
          <p style={{ 
            fontSize: 25, 
            color: "#F9FAFBFF", 
            wordSpacing: 3, 
            display: 'flex', 
            alignItems: 'center', 
            columnGap: 10,
            fontWeight: 500
            }}>Моя
            <span className={styles.text_gradient}> Корзина</span>
          </p>
          <p style={{ fontSize: 14, color: '#BDC2CBFF' }}>Товары, ожидающие оформления (3)</p>
        </div>
        <div style={{ display: 'flex', columnGap: 50 }}>
          <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 20
          }}>
            <ItemViewComponent Id={''} ImageUrl={''} Title={''} Author={''} Price={0} Discount={0} Rate={0} addItem={function (el: CartSelectedType): void {
              throw new Error('Function not implemented.');
            }} deleteItem={function (id: string): void {
              throw new Error('Function not implemented.');
            }} isSelected={false} handleDeleteItem={function (bookId: string[]): void {
              throw new Error('Function not implemented.');
            }} />
            <ItemViewComponent Id={''} ImageUrl={''} Title={''} Author={''} Price={1000} Discount={15} Rate={0} addItem={function (el: CartSelectedType): void {
              throw new Error('Function not implemented.');
            }} deleteItem={function (id: string): void {
              throw new Error('Function not implemented.');
            }} isSelected={false} handleDeleteItem={function (bookId: string[]): void {
              throw new Error('Function not implemented.');
            }} />
            <ItemViewComponent Id={''} ImageUrl={''} Title={''} Author={''} Price={500} Discount={0} Rate={0} addItem={function (el: CartSelectedType): void {
              throw new Error('Function not implemented.');
            }} deleteItem={function (id: string): void {
              throw new Error('Function not implemented.');
            }} isSelected={false} handleDeleteItem={function (bookId: string[]): void {
              throw new Error('Function not implemented.');
            }} />
            <ItemViewComponent Id={''} ImageUrl={''} Title={''} Author={''} Price={500} Discount={0} Rate={0} addItem={function (el: CartSelectedType): void {
              throw new Error('Function not implemented.');
            }} deleteItem={function (id: string): void {
              throw new Error('Function not implemented.');
            }} isSelected={false} handleDeleteItem={function (bookId: string[]): void {
              throw new Error('Function not implemented.');
            }} />
          </div>

          <div style={{
            width: 600,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 40
          }}>
            <div className={styles.cartf_total_sum_block}>
              <p style={{ color: '#F9FAFBFF', fontSize: 21, fontWeight: 500, fontFamily: 'MTSWide' }}>Детали заказа</p>
              <Divider sx={{ borderBottomWidth: 2, my: 2, mb: 4, borderColor: '#44506866' }} />
              <div style={{ display: 'flex', flexDirection: 'column', rowGap: 8 }}>
                <div style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <p style={{ fontSize: 14, color: 'rgb(165, 174, 189)' }}>Стоимость товаров</p>
                  <p style={{
                    fontSize: 14,
                    color: '#F9FAFBFF',
                    display: 'flex',
                    columnGap: 2,
                    alignItems: 'center',
                    fontWeight: 500
                  }}>
                    5 490
                    <FaRubleSign style={{ fontSize: 14, }} />
                  </p>
                </div>

                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: 14, color: '#F9FAFBFF' }}>Скидка</p>
                  <p style={{
                    fontSize: 14,
                    color: '#F9FAFBFF',
                    display: 'flex',
                    columnGap: 2,
                    alignItems: 'center',
                    fontWeight: 500
                  }}>
                    - 670
                    <FaRubleSign style={{ fontSize: 14 }} />
                  </p>
                </div>

                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{
                    fontSize: 14,
                    color: 'rgb(165, 174, 189)',
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: 5
                  }}>
                    Доставка
                    <IoMdInformationCircleOutline style={{ color: 'rgb(138, 145, 158)', fontSize: 14, flexShrink: 0 }} />
                  </p>
                  <p style={{
                    fontSize: 14,
                    color: '#F9FAFBFF',
                    display: 'flex',
                    columnGap: 2,
                    alignItems: 'center',
                    fontWeight: 500
                  }}>
                    Бесплатно
                  </p>
                </div>

                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{
                    fontSize: 14,
                    color: 'rgb(165, 174, 189)',
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: 5
                  }}>
                    Налог (НДС 20%)

                  </p>
                  <p style={{
                    fontSize: 14,
                    color: '#F9FAFBFF',
                    display: 'flex',
                    columnGap: 2,
                    alignItems: 'center',
                    fontWeight: 500
                  }}>
                    Включен
                  </p>
                </div>
              </div>
              <Divider sx={{ borderBottomWidth: 2, my: 4, mb: 6, borderColor: '#44506866' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 }}>
                <p style={{ color: '#F9FAFBFF', fontSize: 20, fontWeight: 600, width: '20%' }}>Итого к оплате</p>
                <div style={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: 5
                }}>
                  <p style={{
                    display: 'flex',
                    columnGap: 2,
                    alignItems: 'center',
                    fontSize: 24,
                    color: '#6379e9',
                    fontWeight: 500
                  }}>
                    5 430
                    <FaRubleSign style={{ fontSize: 24, marginBottom: 2 }} />
                  </p>
                  <p style={{ fontSize: 14, color: 'rgb(165, 174, 189)' }}>(Итоговая сумма со всеми налогами)</p>
                </div>

              </div>
              <button className={styles.cartf_total_sum_button}>

                <p>Перейти к оплате</p>
              </button>
              <div style={{
                marginTop: 30,
                display: 'flex',
                columnGap: 7,
                alignItems: 'center',
                color: 'rgb(165, 174, 189)',
                fontSize: 14,
                justifyContent: 'center'
              }}>
                <IoShieldCheckmarkOutline style={{ fontSize: 17, marginBottom: 1 }} />
                <p>Ваши данные надежно защищены</p>
              </div>
            </div>
            <div style={{ display: 'flex', rowGap: 15, flexDirection: 'column', }}>
              <ComponentInfoView icon={IoShieldCheckmarkOutline} title='Безопасная оплата' desc='Защита транзакций 256-битным шифрованием' />
              <ComponentInfoView icon={IoMdInformationCircleOutline} title='Легкий возврат' desc='14 дней на возврат товара без лишних вопросов' />

            </div>
          </div>
        </div>


      </div>
      <RecommsCart books={[]} />
      <SelectionFooter />
    </div>


  );
});

export default CartF;


const ComponentInfoView: FC<{ icon: IconType, title: string, desc: string }> = ({ icon: Icon, title, desc }) => {
  return (
    <div className={styles.view_info_block}>
      <Icon style={{ fontSize: 22, marginBottom: 1, flexShrink: 0, color: '#F9FAFBFF' }} />
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
        <p style={{ color: '#F9FAFBFF', fontSize: 14, fontWeight: 500 }}>{title}</p>
        <p style={{ color: 'rgb(165, 174, 189)', fontSize: 12 }}>{desc}</p>
      </div>
    </div>
  )
}
