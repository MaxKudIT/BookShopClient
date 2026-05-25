import type { FC } from "react";
import type { CartItemsPreview } from "../../types";
import styles from './FavsView.module.scss'

export type CartSelectedType = {
    id: string
    price: number
}

export type RequestingState = {
    loading: boolean
    handleDeleteItem: (bookId: string[]) => void,
    loading2: boolean,
    handleAddToCart: (bookIds: string[]) => void,
    loading3: boolean,
    areAllInCart: boolean
}

const FavsView: FC<{ items: CartItemsPreview[] } & RequestingState> = ({ items, loading }) => {
    return (
        <div className={styles.fav_info_wrapper}>
            {loading ? 'Загрузка избранного...' : `Избранных книг: ${items.length}`}
        </div>
    )
}

export default FavsView;
