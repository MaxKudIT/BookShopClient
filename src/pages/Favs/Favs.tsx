import { Helmet } from "react-helmet";

import FavsM from "../../modules/Favs/FavsM";


const Favs = () =>
  {
    return (
        <>
        <Helmet>
           <title>Magma</title>
        </Helmet>
        <FavsM/> 
        </>
    )
  }

  export default Favs;