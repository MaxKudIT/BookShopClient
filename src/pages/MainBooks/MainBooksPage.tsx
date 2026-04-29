import { Helmet } from "react-helmet";
import MainBooksM from "../../modules/MainBooks/MainBooksM";


const MainBooksPage = () =>
  {
    return (
        <>
        <Helmet>
           <title>Magma</title>
        </Helmet>
        <MainBooksM/>
        </>
    )
  }

  export default MainBooksPage;