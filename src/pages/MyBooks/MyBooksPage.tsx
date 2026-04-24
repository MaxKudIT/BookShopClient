import { Helmet } from "react-helmet";

import MyBooks from "../../modules/MyBooks/MyBooks";


const MyBooksPage = () =>
  {
    return (
        <>
        <Helmet>
           <title>Magma</title>
        </Helmet>
        <MyBooks/>
        </>
    )
  }

  export default MyBooksPage;