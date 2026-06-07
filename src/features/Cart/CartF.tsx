import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import styles from './CartF.module.scss'
import SelectionHeader from '../../shared/components/Header/SelectionHeader/SelectionHeader';
import ItemViewComponent from '../../shared/components/CartItem/CartItem';
import { FaRubleSign } from 'react-icons/fa6';
import { IoMdCard, IoMdInformationCircleOutline } from 'react-icons/io';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import SelectionFooter from '../../shared/components/Footer/SelectionFooter/SelectionFooter';
import type { FC } from 'react';
import type { IconType } from 'react-icons';
import type { CartItemsPreview } from '../../shared/types';
import type { CartSelectedType } from '../../shared/components/CartView/CartView';
import { useStores } from '../../store/context/GloabalContext';
import RecommsRowWithDynamic from '../../shared/components/RecommsRow/RecommsRowWithDynamic/RecommsRowWithDynamic';
import { MdAutoAwesome } from 'react-icons/md';

const benefits = [
  {
    icon: IoShieldCheckmarkOutline,
    title: 'Безопасная оплата',
    desc: 'Защита транзакций 256-битным шифрованием'
  },
  {
    icon: IoMdInformationCircleOutline,
    title: 'Легкий возврат',
    desc: '14 дней на возврат товара без лишних вопросов'
  }
];

const getDiscountPrice = (item: CartItemsPreview) => Math.floor(item.Price - (item.Price / 100 * item.Discount));
const formatPrice = (value: number) => value.toLocaleString('ru-RU');

const CartF = observer(() => {
  const {
    cartItemsStore: {
      cartItemsPreview,
      getCartItems,
      getCartItemsState,
      deleteCartItems,
      deleteCartItemsState,
    },
    recommendationStore: {
      cartRecommendations,
      getCartRecommendations,
      getCartRecommendationsState,
    },
  } = useStores();

  const cartItems = cartItemsPreview ?? [];
  const [selectedItems, setSelectedItems] = useState<CartSelectedType[]>([]);

  useEffect(() => {
    getCartItems();
    getCartRecommendations(10);
  }, [getCartItems, getCartRecommendations]);

  useEffect(() => {
    setSelectedItems((prev) => prev.filter((item) => cartItems.some((cartItem) => cartItem.Id === item.id)));
  }, [cartItems]);

  const selectedIds = useMemo(() => selectedItems.map((item) => item.id), [selectedItems]);
  const selectedTotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const goodsTotal = cartItems.reduce((sum, item) => sum + item.Price, 0);
  const finalTotal = cartItems.reduce((sum, item) => sum + getDiscountPrice(item), 0);
  const discountTotal = goodsTotal - finalTotal;

  const addSelectedItem = (item: CartSelectedType) => {
    setSelectedItems((prev) => {
      if (prev.some((selected) => selected.id === item.id)) {
        return prev;
      }

      return [...prev, item];
    });
  };

  const deleteSelectedItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteItems = async (ids: string[]) => {
    if (ids.length === 0 || deleteCartItemsState.loading) {
      return;
    }

    await deleteCartItems(ids);
    setSelectedItems((prev) => prev.filter((item) => !ids.includes(item.id)));
    await getCartItems();
    await getCartRecommendations(10);
  };

  return (
    <div className={styles.cartf_page_style}>
      <SelectionHeader />
      <main className={styles.cartf_main_container}>
        <section className={styles.cart_header}>
          <div className={styles.cart_title_group}>
            <p className={styles.cart_title}>Моя <span className={styles.text_gradient}>Корзина</span></p>
            <p className={styles.cart_subtitle}>Товары, ожидающие оформления ({cartItems.length})</p>
          </div>
          <div className={styles.cart_header_badge}>
            <IoShieldCheckmarkOutline />
            <p>Покупка защищена</p>
          </div>
        </section>

        <section className={styles.cart_content}>
          <div className={styles.cart_items_panel}>
            <div className={styles.panel_header}>
              <div>
                <p className={styles.panel_title}>Ваши книги</p>
                <p className={styles.panel_subtitle}>
                  {selectedItems.length > 0
                    ? `Выбрано ${selectedItems.length} на сумму ${formatPrice(selectedTotal)} ₽`
                    : 'Проверьте позиции перед оплатой'}
                </p>
              </div>
              <button
                className={styles.clear_button}
                disabled={cartItems.length === 0 || deleteCartItemsState.loading}
                onClick={() => handleDeleteItems(cartItems.map((item) => item.Id))}
              >
                {deleteCartItemsState.loading ? 'Удаляем...' : 'Очистить'}
              </button>
            </div>

            {getCartItemsState.loading && (
              <div className={styles.state_block}>Загружаем корзину...</div>
            )}

            {getCartItemsState.error && (
              <div className={styles.error_block}>{getCartItemsState.error}</div>
            )}

            {deleteCartItemsState.error && (
              <div className={styles.error_block}>{deleteCartItemsState.error}</div>
            )}

            {!getCartItemsState.loading && !getCartItemsState.error && cartItems.length === 0 && (
              <div className={styles.state_block}>В корзине пока нет книг</div>
            )}

            {!getCartItemsState.loading && !getCartItemsState.error && cartItems.length > 0 && (
              <div className={styles.cart_items_list}>
                {cartItems.map((item) => (
                  <ItemViewComponent
                    key={item.Id}
                    {...item}
                    addItem={addSelectedItem}
                    deleteItem={deleteSelectedItem}
                    isSelected={selectedIds.includes(item.Id)}
                    handleDeleteItem={handleDeleteItems}
                  />
                ))}
              </div>
            )}
          </div>

          <aside className={styles.cart_sidebar}>
            <div className={styles.cartf_total_sum_block}>
              <p className={styles.summary_title}>Детали заказа</p>
              <div className={styles.summary_divider} />

              <div className={styles.summary_rows}>
                <SummaryRow label="Стоимость товаров" value={formatPrice(goodsTotal)} />
                <SummaryRow label="Скидка" value={`- ${formatPrice(discountTotal)}`} isAccent />
                <SummaryRow
                  label="Доставка"
                  value="Бесплатно"
                  icon={IoMdInformationCircleOutline}
                />
                <SummaryRow label="Налог (НДС 20%)" value="Включен" />
              </div>

              <div className={styles.summary_divider} />

              <div className={styles.total_row}>
                <p className={styles.total_label}>Итого к оплате</p>
                <div className={styles.total_value_group}>
                  <p className={styles.total_value}>
                    {formatPrice(finalTotal)}
                    <FaRubleSign />
                  </p>
                  <p className={styles.total_hint}>Итоговая сумма со всеми налогами</p>
                </div>
              </div>

              <button
                className={styles.cartf_total_sum_button}
                disabled={cartItems.length === 0 || getCartItemsState.loading}
              >
                <IoMdCard />
                <p>{cartItems.length === 0 ? 'Корзина пуста' : 'Перейти к оплате'}</p>
              </button>

              <div className={styles.secure_note}>
                <IoShieldCheckmarkOutline />
                <p>Ваши данные надежно защищены</p>
              </div>
            </div>

            <div className={styles.info_list}>
              {benefits.map((benefit) => (
                <ComponentInfoView
                  key={benefit.title}
                  icon={benefit.icon}
                  title={benefit.title}
                  desc={benefit.desc}
                />
              ))}
            </div>
          </aside>
        </section>

        <section className={styles.cart_recommendations}>
          {getCartRecommendationsState.loading ? (
            <div className={styles.state_block}>Подбираем рекомендации...</div>
          ) : getCartRecommendationsState.error ? (
            <div className={styles.error_block}>{getCartRecommendationsState.error}</div>
          ) : (
            <RecommsRowWithDynamic
              title="Вам также может понравиться"
              icon={MdAutoAwesome}
              description="Подборка книг, которые хорошо дополняют корзину"
              books={cartRecommendations}
              color="blue"
            />
          )}
        </section>
      </main>
      <SelectionFooter />
    </div>
  );
});

export default CartF;

const SummaryRow: FC<{ label: string, value: string, isAccent?: boolean, icon?: IconType }> = ({
  label,
  value,
  isAccent = false,
  icon: Icon
}) => {
  return (
    <div className={styles.summary_row}>
      <p className={styles.summary_label}>
        {label}
        {Icon && <Icon />}
      </p>
      <p className={isAccent ? styles.summary_value_accent : styles.summary_value}>
        {value}
        {!Number.isNaN(Number(value.replace(/\s|-/g, ''))) && <FaRubleSign />}
      </p>
    </div>
  )
}

const ComponentInfoView: FC<{ icon: IconType, title: string, desc: string }> = ({ icon: Icon, title, desc }) => {
  return (
    <div className={styles.view_info_block}>
      <div className={styles.view_info_icon}>
        <Icon />
      </div>
      <div className={styles.view_info_text}>
        <p className={styles.view_info_title}>{title}</p>
        <p className={styles.view_info_desc}>{desc}</p>
      </div>
    </div>
  )
}
