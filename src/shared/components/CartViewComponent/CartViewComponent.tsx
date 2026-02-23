import { Checkbox } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { MdCurrencyRuble } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import styles from './CartViewComponent.module.scss'
import type { FC } from "react";
import { rateStars } from "../BookInfoView/BookInfoView";
import type { CartItemsPreview } from "../../types";





const CartViewComponent: FC<CartItemsPreview & {
    addItem: (id: string) => void, 
    deleteItem: (id: string) => void, 
    isSelected: boolean
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

    handleDeleteItem


}) => {

    const DiscountPrice = Math.floor(Price - (Price / 100 * Discount))

    return (
        <div className={styles.cart_view_compo_wrapper}>



            <div style={{ height: '100%', display: 'flex', columnGap: 12 }}>
                <Checkbox
                    checked={isSelected}
                    onChange={(e) => {
                        if (e.target.checked) {
                            addItem(Id)
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
                <div style={{ display: 'flex', alignItems: 'center', columnGap: 30 }}>
                    <p style={{ fontSize: 22, color: '#d8b3f0ff', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
                        {DiscountPrice}
                        <MdCurrencyRuble color='#d8b3f0ff' style={{ fontSize: 22 }} />
                    </p>
                    <button onClick={() => {handleDeleteItem([Id])}} className={styles.clickable_wrapper}>
                        <RiDeleteBinLine style={{ color: 'red', fontSize: 20 }} />
                    </button>

                </div>

            </div>
        </div>
    )


}



export default CartViewComponent;