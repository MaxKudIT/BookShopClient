import styles from './CartM.module.scss'
import CartF from "../../features/Cart/CartF";
import NavMediaComponent from "../../shared/components/Navigation/MediaNavigation/NavMediaComponent";



const CartM = () => {



  return (
    <div className={styles.cart_page}>
      
     
      <CartF/>
     
 
    </div>
  )
}

export default CartM ;