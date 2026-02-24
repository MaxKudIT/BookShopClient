import { Helmet } from "react-helmet";
import CartM from "../../modules/Cart/CartM";


const Cart = () => {
  return (
    <>
      <Helmet>
        <title>MaxBook</title>
      </Helmet>
      <CartM />
    </>
  )
}

export default Cart;