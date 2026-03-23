import { Helmet } from "react-helmet";
import Home from "../../modules/Home/Home";


const HomePage = () =>
  {
    return (
        <>
        <Helmet>
           <title>MaxLib</title>
        </Helmet>
        <Home/>
        </>
    )
  }

  export default HomePage;