import { Helmet } from "react-helmet";
import Home from "../../modules/Home/Home";


const HomePage = () =>
  {
    return (
        <>
        <Helmet>
           <title>Magma</title>
        </Helmet>
        <Home/>
        </>
    )
  }

  export default HomePage;