import type { FC } from "react";
import type { CartItemsPreview } from "../../types";
import styles from './CartView.module.scss';

export type CartSelectedType = {
    id: string
    price: number
}

export type RequestingState = {
    loading: boolean
    handleDeleteItem: (bookId: string[]) => void
}

const CartView: FC<{ items: CartItemsPreview[] } & RequestingState> = ({ items, loading }) => {
    return (
        <div className={styles.cart_info_wrapper}>
            {loading ? 'Загрузка корзины...' : `Товаров в корзине: ${items.length}`}
        </div>
    )
}

export default CartView;
