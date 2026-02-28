import styles from './CartM.module.scss'
import CartF from "../../features/Cart/CartF";
import NavMediaComponent from "../../shared/components/Navigation/MediaNavigation/NavMediaComponent";



const CartM = () => {



  return (
    <div className={styles.book_info_page_style}>
      
     
      <CartF/>
     
      <div style={{
        width: '100vw',
        height: '100px',
        background: 'rgba(170, 122, 202, 0.5)',
        position: 'absolute',
        zIndex: -1,
        bottom: 0
      }}></div>
    </div>
  )
}

export default CartM ;