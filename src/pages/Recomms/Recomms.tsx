import { Helmet } from "react-helmet";
import RecommsM from "../../modules/Recomms/RecommsM";



const Recomms = () =>
  {
    return (
        <>
        <Helmet>
           <title>Magma</title>
        </Helmet>
        <RecommsM/>
        </>
    )
  }

  export default Recomms;