import { Helmet } from "react-helmet";
import { BookInfoModule } from "../../modules/BookInfo/BookInfo";


const BookInfo = () =>
  {
    return (
        <>
        <Helmet>
           <title>MaxBook</title>
        </Helmet>
        <BookInfoModule/> 
        </>
    )
  }

  export default BookInfo;