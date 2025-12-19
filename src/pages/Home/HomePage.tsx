import { Helmet } from "react-helmet";
import Home from "../../modules/Home/Home";


const HomePage = () =>
  {
    return (
        <>
        <Helmet>
           <title>MaxBook</title>
        </Helmet>
        <Home/>
        </>
    )
  }

  export default HomePage;