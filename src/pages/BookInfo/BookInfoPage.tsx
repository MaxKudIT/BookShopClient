import { Helmet } from "react-helmet";
import { BookInfoModule } from "../../modules/BookInfo/BookInfo";


const BookInfo = () =>
  {
    return (
        <>
        <Helmet>
           <title>MaxLib</title>
        </Helmet>
        <BookInfoModule/> 
        </>
    )
  }

  export default BookInfo;