import { Helmet } from "react-helmet";

import FavsM from "../../modules/Favs/FavsM";


const Favs = () =>
  {
    return (
        <>
        <Helmet>
           <title>MaxBook</title>
        </Helmet>
        <FavsM/> 
        </>
    )
  }

  export default Favs;