import { observer } from 'mobx-react-lite';
import styles from './CartF.module.scss'
import SelectionHeader from '../../shared/components/Header/SelectionHeader/SelectionHeader';
import ItemViewComponent from '../../shared/components/CartItem/CartItem';
import { FaRubleSign } from 'react-icons/fa6';
import { IoMdCard, IoMdInformationCircleOutline } from 'react-icons/io';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import SelectionFooter from '../../shared/components/Footer/SelectionFooter/SelectionFooter';
import type { FC } from 'react';
import type { IconType } from 'react-icons';
import RecommsCart from '../../shared/components/RecommsRow/RecommsCart/RecommsCart';
import type { CartItemsPreview } from '../../shared/types';
import type { CartSelectedType } from '../../shared/components/CartView/CartView';

const cartItems: CartItemsPreview[] = [
  {
    Id: 'cart-1',
    ImageUrl: 'https://img.comicbooks.ru/images/products/1/7455/945601823/VGs-GD5boU8.jpg',
    Title: 'Человек-паук',
    Author: 'Марвелпедия',
    Price: 1490,
    Discount: 12,
    Rate: 4.7
  },
  {
    Id: 'cart-2',
    ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
    Title: 'Мастер и Маргарита',
    Author: 'Михаил Булгаков',
    Price: 1200,
    Discount: 15,
    Rate: 4.9
  },
  {
    Id: 'cart-3',
    ImageUrl: 'https://imo10.labirint.ru/books/600284/cover.jpg/242-0',
    Title: 'Оно',
    Author: 'Стивен Кинг',
    Price: 1700,
    Discount: 0,
    Rate: 5
  },
  {
    Id: 'cart-4',
    ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhhoSS4VwAoCA2l9iEe1ejrGckq7QZMp1Tw&s',
    Title: 'Зеленая Миля',
    Author: 'Стивен Кинг',
    Price: 1100,
    Discount: 8,
    Rate: 4.9
  }
];

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
  const goodsTotal = cartItems.reduce((sum, item) => sum + item.Price, 0);
  const finalTotal = cartItems.reduce((sum, item) => sum + getDiscountPrice(item), 0);
  const discountTotal = goodsTotal - finalTotal;

  const noopAddItem = (_el: CartSelectedType) => undefined;
  const noopDeleteItem = (_id: string) => undefined;
  const noopDeleteItems = (_bookId: string[]) => undefined;

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
                <p className={styles.panel_subtitle}>Проверьте позиции перед оплатой</p>
              </div>
              <button className={styles.clear_button}>Очистить</button>
            </div>

            <div className={styles.cart_items_list}>
              {cartItems.map((item) => (
                <ItemViewComponent
                  key={item.Id}
                  {...item}
                  addItem={noopAddItem}
                  deleteItem={noopDeleteItem}
                  isSelected={false}
                  handleDeleteItem={noopDeleteItems}
                />
              ))}
            </div>
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

              <button className={styles.cartf_total_sum_button}>
                <IoMdCard />
                <p>Перейти к оплате</p>
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
      </main>
      <RecommsCart books={[]} />
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
