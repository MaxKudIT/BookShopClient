import { Checkbox } from "@mui/material";
import { MdCurrencyRuble } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import styles from './ItemViewComponent.module.scss'
import type { FC } from "react";
import { rateStars } from "../BookInfoView/BookInfoView";
import type { CartItemsPreview } from "../../types";
import type { CartSelectedType } from "../CartView/CartView";
import { IoIosHeart } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";



type TypeComponent = 'cartItem' | 'favItem'

const ItemViewComponent: FC<CartItemsPreview & {
    addItem: (el: CartSelectedType) => void,
    deleteItem: (id: string) => void,
    isSelected: boolean,
    type: TypeComponent
    
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

    addItem,
    deleteItem,

    isSelected,

    handleDeleteItem,

    type


}) => {

        const DiscountPrice = Math.floor(Price - (Price / 100 * Discount))

        return (
            <div className={styles.item_view_compo_wrapper}>



                <div style={{ height: '100%', display: 'flex', columnGap: 12 }}>
                    <Checkbox
                        checked={isSelected}
                        onChange={(e) => {
                            if (e.target.checked) {
                                addItem({id: Id, price: Math.floor(Price - (Price / 100 * Discount))})
                            } else {
                                deleteItem(Id)
                            }
                        }}
                        style={{ alignSelf: 'flex-start' }}
                        sx={{
                            color: 'white',
                            '& .MuiSvgIcon-root': {
                                fontSize: 20,
                            },
                            '&.Mui-checked': {
                                color: '#d8b3f0ff',
                            },
                        }}
                    />

                    <img
                        alt=""
                        src={ImageUrl}
                        style={{
                            width: '115px',
                            height: '100%',

                        }}
                    />

                    <div style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',

                        padding: '5px 0'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
                            <p style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>{Title}</p>
                            <p style={{ color: 'rgba(255,255,255,0.8', fontSize: 14 }}>{Author}</p>

                        </div>
                        <div style={{ display: 'flex', columnGap: 2 }}>
                            {rateStars(Rate)}
                        </div>
                    </div>

                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', paddingRight: 10, paddingBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
                        {Price === 0 ? (
                            <p style={{ fontSize: 22, color: '#c386ebff', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>Бесплатно</p>
                        ) : (
                            Discount !== 0 ? (
                                <>
                                    <p style={{ fontSize: 22, color: '#c386ebff', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
                                        {DiscountPrice}
                                        <MdCurrencyRuble color='#c386ebff' style={{ fontSize: 22 }} />
                                    </p>
                                    <p style={{
                                        fontSize: 14,
                                        color: 'gray',
                                        textDecoration: 'line-through',
                                        textDecorationColor: '#a7a7adff'
                                    }}>-{Price}</p>
                                    <div style={{
                                        padding: '4px 6px',
                                        fontSize: 13,
                                        borderRadius: 8,
                                        background: '#0b9128ff',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        -{Discount}%
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p style={{ fontSize: 22, color: '#c386ebff', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
                                        {Price}
                                        <MdCurrencyRuble color='#c386ebff' style={{ fontSize: 22 }} />
                                    </p>
                                </>
                            )
                        )}
                        <button onClick={() => {
                            handleDeleteItem([Id])
                            deleteItem(Id)
                        }} className={styles.clickable_wrapper}>
                            {type === 'cartItem' ? (
                                 <RiDeleteBinLine style={{ color: 'red', fontSize: 20 }} />
                            ) : (
                                 <FaHeart style={{ color: 'red', fontSize: 20 }} />
                            )}
                           
                        </button>

                    </div>

                </div>
            </div>
        )


    }



export default ItemViewComponent;