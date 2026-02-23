import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton } from "@mui/material";
import { useCallback, useEffect, useState, type FC } from "react";
import { IoClose, IoCheckmarkCircle, IoCartOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";


import styles from './CartView.module.scss'
import CartViewComponent from "../CartViewComponent/CartViewComponent";

import { RiDeleteBinLine } from "react-icons/ri";

import { IoMdCart } from "react-icons/io";
import type { CartItemsPreview } from "../../types";



export type RequestingState = {

    loading: boolean,
    error: string | null,
    handleDeleteItem: (bookId: string[]) => void


}





const CartView: FC<{ items: CartItemsPreview[] } & RequestingState> = ({ items, loading, error, handleDeleteItem }) => {




    const navigate = useNavigate();

    const [dialog, setDialog] = useState(false)

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [allSelected, setAllSelected] = useState(false);

    useEffect(() => {
        if (selectedIds.length === items.length && items.length > 0) {
            setAllSelected(true);
        } else {
            setAllSelected(false);
        }
    }, [selectedIds, items]);



    const textEvent = (state: { error: string | null }): string => {

        if (state.error) {
            return 'Произошла ошибка, повторите операцию позже'
        }

        return 'Покупка была успешно произведена!'


    }


    const addItem = (checkedId: string) => {
        setSelectedIds(prev => {
            if (prev !== null) {
                return [...prev, checkedId]
            }
            return [checkedId]
        })
    }


    const deleteItem = (checkedId: string) => {
        setSelectedIds(prev => {
            if (prev !== null) {
                return prev.filter(el => el !== checkedId)
            }
            return [checkedId]
        })
    }


    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(items.map(item => item.Id));
        } else {
            setSelectedIds([]);
        }
    };



    

    return (

        <div className={styles.cart_info_wrapper}>



            <Dialog
                onClose={() => { setDialog(false); navigate('/mybooks') }}
                open={dialog}
                slotProps={{
                    paper: {
                        sx: {
                            outline: 'none',
                            background: `
                                linear-gradient(145deg, 
                                rgba(20, 39, 131, 1) 0%, 
                                rgba(37, 58, 180, 1) 30%, 
                                rgba(98, 38, 211, 1) 70%
                                )
                            `,
                            color: 'white',
                            borderRadius: 3,

                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                        }
                    },
                    backdrop: {
                        sx: {
                            backdropFilter: 'blur(3px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        }
                    }
                }}
                fullWidth
            >
                <DialogTitle>
                    Результат покупки
                    <IconButton
                        onClick={() => { setDialog(false); navigate('/mybooks') }}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'white',

                        }}
                    >
                        <IoClose />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <p>ss</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setDialog(false); navigate('/mybooks') }} sx={{ color: 'white' }}>Продолжить</Button>

                </DialogActions>
            </Dialog>


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
                    <p style={{ color: 'white', fontSize: 14 }}>Выбрано: {selectedIds.length}</p>
                    <button onClick={async () => {
                        await handleDeleteItem(selectedIds)
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

                />) :
                    items.map(el => (<CartViewComponent
                        addItem={addItem}
                        deleteItem={deleteItem}
                        isSelected={selectedIds.includes(el.Id)}
                        handleDeleteItem={handleDeleteItem}


                        Id={el.Id}
                        ImageUrl={el.ImageUrl}
                        Title={el.Title}
                        Author={el.Author}
                        Price={el.Price}
                        Discount={el.Discount}
                        Rate={el.Rate}




                    />))
                }



            </div>







        </div>
    )
}

export default CartView;