import { Checkbox, CircularProgress, Divider } from "@mui/material";
import { useEffect, useMemo, useState, type FC } from "react";

import { useNavigate } from "react-router-dom";


import CartViewComponent from "../CartItem/CartItem";
import styles from './CartView.module.scss';

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



    const t = items
    const navigate = useNavigate();

    const [dialog, setDialog] = useState(false)

    const [selectedI, setSelectedI] = useState<CartSelectedType[]>([]);
    const [allSelected, setAllSelected] = useState(false);

    // useEffect(() => {
    //     if (selectedI.length === items.length && items.length > 0) {
    //         setAllSelected(true);
    //     } else {
    //         setAllSelected(false);
    //     }
    // }, [selectedI, items]);




    // const textEvent = (state: { error: string | null }): string => {

    //     if (state.error) {
    //         return 'Произошла ошибка, повторите операцию позже'
    //     }

    //     return 'Покупка была успешно произведена!'


    // }


    // const addItem = (selectedParam: CartSelectedType) => {
    //     setSelectedI(prev => {
    //         if (prev !== null) {
    //             return [...prev, selectedParam]
    //         }
    //         return [selectedParam]
    //     })
    // }


    // const deleteItem = (id: string) => {
    //     setSelectedI(prev => {
    //         if (prev !== null) {
    //             return prev.filter(el => el.id !== id)
    //         }
    //         return []
    //     })
    // }


    // const handleSelectAll = (checked: boolean) => {
    //     if (checked) {
    //         setSelectedI(items.map(item => ({id: item.Id, price: Math.floor(item.Price - (item.Price / 100 * item.Discount))})));
    //     } else {
    //         setSelectedI([]);
    //     }
    // };



    // const sumItems = useMemo(() => {
    //     if (selectedI.length > 0) {
            
    //         return selectedI.reduce((acc, cv) => acc + cv.price, 0)
    //     } 
    //     return items.reduce((acc, cv) => {
    //         const price = Math.floor(cv.Price - (cv.Price / 100 * cv.Discount));
    //         return acc + price
    //     }, 0)
        
    // }, [selectedI, items])

    return (

        <div className={styles.cart_info_wrapper}>

        </div >
    )
}

export default CartView;