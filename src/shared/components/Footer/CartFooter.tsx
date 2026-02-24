import type { FC } from 'react';
import styles from './CartFooter.module.scss'
import { Button, CircularProgress, Divider } from '@mui/material';
import { buttonStyles } from './muiStyles';
import { MdCurrencyRuble } from 'react-icons/md';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const CartFooter: FC<{ sum: number }> = ({ sum }) => {

    return (

        <div className={styles.cart_footer}>
            <div style={{
                display: 'flex',
                columnGap: 10,
                alignItems: 'center',
                background: 'rgb(50, 90, 199, 0.2)',
                padding: '10px 20px',

                borderRadius: 15,
                border: '1px solid rgba(112, 79, 204, 0.5)',

            }}>
                <p style={{ color: 'white', fontSize: 19, letterSpacing: 0.5, fontWeight: '500' }}>Итого:</p>
                <p style={{ fontSize: 22, color: '#c386ebff', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
                    {sum}
                    <MdCurrencyRuble color='#c386ebff' style={{ fontSize: 22 }} />
                </p>

            </div>
            <Divider sx={{ ml: 4, mr: 3, borderColor: 'rgba(94, 67, 156, 1)' }} orientation="vertical" />
            <Button
                onClick={async () => {


                }}
                sx={buttonStyles}
                variant="contained"

            >
                <RiMoneyDollarCircleLine style={{ fontSize: 20 }} />
                <p>Купить сейчас</p>

            </Button>
        </div>
    )

}

export default CartFooter;