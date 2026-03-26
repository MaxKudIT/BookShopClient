import { Helmet } from "react-helmet";
import CartM from "../../modules/Cart/CartM";


const Cart = () => {
  return (
    <>
      <Helmet>
        <title>Magma</title>
      </Helmet>
      <CartM />
    </>
  )
}

export default Cart;