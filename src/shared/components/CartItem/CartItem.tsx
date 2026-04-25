import { Checkbox } from "@mui/material";
import { MdCurrencyRuble } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import styles from './CartItem.module.scss'
import type { FC } from "react";
import { rateStars } from "../BookInfoView/BookInfoView";
import type { CartItemsPreview } from "../../types";
import type { CartSelectedType } from "../CartView/CartView";
import { IoIosHeart } from "react-icons/io";
import { FaHeart, FaMinus, FaPlus, FaRubleSign } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";




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

    addItem,
    deleteItem,

    isSelected,

    handleDeleteItem,




}) => {

        const DiscountPrice = Math.floor(Price - (Price / 100 * Discount))

        return (
            <div className={styles.item_view_compo_wrapper}>



                <div style={{ height: '100%', display: 'flex', columnGap: 20 }}>
                    {/* <Checkbox
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
                    /> */}

                    <img
                        alt=""
                        src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPTPFv3U6ZVvZh0GYlNFWntSw0PJjFvqNwMA&s'}
                        style={{
                            width: '130px',
                            height: '100%',
                            opacity: 0.9

                        }}
                    />

                    <div style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',

                        padding: '5px 0'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 10 }}>
                            {/* <p style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>{Title}</p>
                            <p style={{ color: 'rgba(255,255,255,0.8', fontSize: 14 }}>{Author}</p> */}
                            <div className={styles.genre_wrapper}>Фантастика</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{ color: '#FFFFFFFF', fontSize: 20, fontWeight: 600 }}>Человек-паук</p>
                                <p style={{ color: '#BAC1CEFF', fontSize: 14, fontWeight: 500 }}>Марвелпедия</p>
                            </div>

                        </div>

                        <div className={styles.quality_wrapper}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FaMinus style={{ color: '#555D6DFF' }} />
                            </div>
                            <p>1</p>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FaPlus />
                            </div>

                        </div>

                    </div>

                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    paddingRight: 10,
                    alignItems: 'flex-end',
                 

                }}>
                    <button onClick={() => {
                        handleDeleteItem([Id])
                        deleteItem(Id)
                    }} className={styles.icon_wrapper}>
                        <FaRegTrashAlt className={styles.trash_button} />
                    </button>


                    {Discount !== 0 ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 5, alignItems: 'center' }}>
                                <p style={{
                                    fontSize: 14,
                                    color: 'gray',
                                    textDecoration: 'line-through',
                                    textDecorationColor: '#a7a7adff',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    -{Price}
                                    <MdCurrencyRuble style={{ fontSize: 14 }} />
                                </p>
                                <p style={{
                                    fontSize: 22,
                                    color: '#6379e9',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    columnGap: 2
                                }}>
                                    {Price}
                                    <MdCurrencyRuble style={{ fontSize: 22 }} />
                                </p>
                            </div>


                        </>
                    ) : (
                        <>
                            <p style={{
                                fontSize: 22,
                                color: '#6379e9',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                columnGap: 2

                            }}>
                                {Price}
                                <FaRubleSign style={{ fontSize: 18 }} />
                            </p>
                        </>
                    )
                    }


                </div>
            </div>
        )


    }



export default CartItem;