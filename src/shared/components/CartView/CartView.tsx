import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton } from "@mui/material";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { IoClose, IoCheckmarkCircle, IoCartOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";


import styles from './CartView.module.scss'
import CartViewComponent from "../CartViewComponent/CartViewComponent";

import { RiDeleteBinLine } from "react-icons/ri";

import { IoMdCart } from "react-icons/io";
import type { CartItemsPreview } from "../../types";
import CartFooter from "../Footer/CartFooter";



export type CartSelectedType = {
    id: string
    price: number
}


export type RequestingState = {

    loading: boolean
    handleDeleteItem: (bookId: string[]) => void


}





const CartView: FC<{ items: CartItemsPreview[] } & RequestingState> = ({ items, loading, handleDeleteItem }) => {




    const navigate = useNavigate();

    const [dialog, setDialog] = useState(false)

    const [selectedI, setSelectedI] = useState<CartSelectedType[]>([]);
    const [allSelected, setAllSelected] = useState(false);

    useEffect(() => {
        if (selectedI.length === items.length && items.length > 0) {
            setAllSelected(true);
        } else {
            setAllSelected(false);
        }
    }, [selectedI, items]);




    const textEvent = (state: { error: string | null }): string => {

        if (state.error) {
            return 'Произошла ошибка, повторите операцию позже'
        }

        return 'Покупка была успешно произведена!'


    }


    const addItem = (selectedParam: CartSelectedType) => {
        setSelectedI(prev => {
            if (prev !== null) {
                return [...prev, selectedParam]
            }
            return [selectedParam]
        })
    }


    const deleteItem = (id: string) => {
        setSelectedI(prev => {
            if (prev !== null) {
                return prev.filter(el => el.id !== id)
            }
            return []
        })
    }


    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedI(items.map(item => ({id: item.Id, price: Math.floor(item.Price - (item.Price / 100 * item.Discount))})));
        } else {
            setSelectedI([]);
        }
    };



    const sumItems = useMemo(() => {
        if (selectedI.length > 0) {
            
            return selectedI.reduce((acc, cv) => acc + cv.price, 0)
        } 
        return items.reduce((acc, cv) => {
            const price = Math.floor(cv.Price - (cv.Price / 100 * cv.Discount));
            return acc + price
        }, 0)
        
    }, [selectedI, items])

    return (

        <div className={styles.cart_info_wrapper}>





            <div className={styles.cart_first_row}>
                <div className={styles.cart_first_block}>
                    <div style={{ background: 'linear-gradient(rgba(164, 77, 223, 0.7), #5630b1ff)', borderRadius: 10, padding: 9 }}>
                        <IoMdCart style={{ fontSize: 45, color: '#e1dbe6ff' }} />
                    </div>
                    <div style={{ color: 'white', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', rowGap: 5 }}>
                        <p style={{ fontSize: 22 }}>Корзина</p>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{items.length} товаров</p>
                    </div>
                </div>


            </div>

            <div style={{ display: 'flex', columnGap: 20, height: 45, alignItems: 'center', marginTop: 20 }}>
                <div style={{
                    background: 'rgba(71, 47, 145, 0.3)',
                    width: 140,
                    borderRadius: 15,
                    border: '1px solid rgba(112, 79, 204, 0.5)',
                    display: 'flex',
                    alignItems: 'center',

                }}>
                    <Checkbox
                        checked={allSelected}
                        onChange={(e) => {
                            handleSelectAll(e.target.checked)
                        }}
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
                    <p style={{ color: 'white', fontSize: 14 }}>Выбрать все</p>

                </div>
                <Divider sx={{ my: 2, ml: 2, borderColor: 'rgba(94, 67, 156, 1)' }} orientation="vertical" />
                <div style={{ display: 'flex', alignItems: 'center', columnGap: 20 }}>
                    <p style={{ color: 'white', fontSize: 14 }}>Выбрано: {selectedI.length}</p>
                    <button onClick={async () => {
                        const array = selectedI.map(item => item.id)
                        await handleDeleteItem(array)
                        setSelectedI([])
                    }} className={styles.clickable_wrapper}>
                        <RiDeleteBinLine style={{ color: 'red', fontSize: 16 }} />
                        <p style={{ color: 'red' }}>Удалить выбранное</p>
                    </button>
                </div>
            </div>



            <Divider sx={{ borderBottomWidth: 2, my: 2, mb: 5, borderColor: 'rgba(94, 67, 156, 1)' }} />
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', rowGap: 25 }}>
                {loading ? (<CircularProgress
                    sx={{

                        padding: 1,
                        color: 'white',
                        alignSelf: 'center'

                    }}

                />) : items.length !== 0 ?
                    <>
                        {items.map(el => (<CartViewComponent
                            addItem={addItem}
                            deleteItem={deleteItem}
                            isSelected={selectedI.some(item => item.id === el.Id)}
                            handleDeleteItem={handleDeleteItem}


                            Id={el.Id}
                            ImageUrl={el.ImageUrl}
                            Title={el.Title}
                            Author={el.Author}
                            Price={el.Price}
                            Discount={el.Discount}
                            Rate={el.Rate}


                        />))}
                         <Divider sx={{ borderBottomWidth: 2, my: 3, mb: 0, borderColor: 'rgba(94, 67, 156, 1)' }} />
                        <CartFooter sum={sumItems}/>
                    </>

                    : (
                        <div style={{
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'center'
                        }}>Корзина пуста</div>
                    )
                }



            </div >







        </div >
    )
}

export default CartView;