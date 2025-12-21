import { Helmet } from "react-helmet";
import BookPageModule from "../../modules/BookPage/BookPageModule";



const BookPage = () =>
  {
    return (
        <>
        <Helmet>
           <title>Название книги будет</title>
        </Helmet>
       <BookPageModule/>
        </>
    )
  }

  export default BookPage;