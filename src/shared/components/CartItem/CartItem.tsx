import { Checkbox } from "@mui/material";
import { MdCurrencyRuble } from "react-icons/md";
import styles from './CartItem.module.scss'
import type { FC } from "react";
import type { CartItemsPreview } from "../../types";
import type { CartSelectedType } from "../CartView/CartView";
import { FaMinus, FaPlus, FaRegStar, FaRubleSign } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

const fallbackImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPTPFv3U6ZVvZh0GYlNFWntSw0PJjFvqNwMA&s';

const CartItem: FC<CartItemsPreview & {
    addItem: (el: CartSelectedType) => void,
    deleteItem: (id: string) => void,
    isSelected: boolean,
} & {
    handleDeleteItem: (bookId: string[]) => void
}> = ({
    Id,
    Title,
    Author,
    Price,
    Rate,
    Discount,
    ImageUrl,
    Format,
    addItem,
    deleteItem,
    isSelected,
    handleDeleteItem,
}) => {
        const discountPrice = Math.floor(Price - (Price / 100 * Discount));

        return (
            <article className={styles.item_view_compo_wrapper}>
                <div className={styles.item_main}>
                    <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                            if (event.target.checked) {
                                addItem({ id: Id, price: discountPrice })
                            } else {
                                deleteItem(Id)
                            }
                        }}
                        sx={{
                            color: 'rgba(219, 231, 255, 0.7)',
                            alignSelf: 'flex-start',
                            p: 0.5,
                            '& .MuiSvgIcon-root': {
                                fontSize: 22,
                            },
                            '&.Mui-checked': {
                                color: '#8da6ff',
                            },
                        }}
                    />

                    <div className={styles.image_wrapper}>
                        <img
                            className={styles.book_image}
                            alt={Title || 'Книга'}
                            src={ImageUrl || fallbackImage}
                        />
                    </div>

                    <div className={styles.item_content}>
                        <div className={styles.item_text}>
                            <div className={styles.meta_row}>
                                <div className={styles.genre_wrapper}>{Format || 'Печатная книга'}</div>
                                <div className={styles.rate_wrapper}>
                                    <FaRegStar />
                                    <p>{Rate || 4.7}</p>
                                </div>
                            </div>
                            <div className={styles.title_group}>
                                <p className={styles.item_title}>{Title || 'Человек-паук'}</p>
                                <p className={styles.item_author}>{Author || 'Марвелпедия'}</p>
                            </div>
                        </div>

                        <div className={styles.quality_wrapper}>
                            <button aria-label="Уменьшить количество" className={styles.quantity_button}>
                                <FaMinus />
                            </button>
                            <p>1</p>
                            <button aria-label="Увеличить количество" className={styles.quantity_button}>
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.item_actions}>
                    <button
                        onClick={() => {
                            handleDeleteItem([Id])
                            deleteItem(Id)
                        }}
                        className={styles.icon_wrapper}
                    >
                        <FaRegTrashAlt className={styles.trash_button} />
                    </button>

                    <div className={styles.price_block}>
                        {Discount !== 0 && (
                            <p className={styles.old_price}>
                                {Price}
                                <MdCurrencyRuble />
                            </p>
                        )}
                        <p className={styles.current_price}>
                            {Discount !== 0 ? discountPrice : Price}
                            <FaRubleSign />
                        </p>
                    </div>
                </div>
            </article>
        )
    }

export default CartItem;
