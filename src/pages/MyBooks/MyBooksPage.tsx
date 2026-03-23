import { Helmet } from "react-helmet";
import Home from "../../modules/Home/Home";
import MyBooks from "../../modules/MyBooks/MyBooks";


const MyBooksPage = () =>
  {
    return (
        <>
        <Helmet>
           <title>MaxLib</title>
        </Helmet>
        <MyBooks/>
        </>
    )
  }

  export default MyBooksPage;