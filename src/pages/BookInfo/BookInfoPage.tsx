import { Helmet } from "react-helmet";
import { BookInfoModule } from "../../modules/BookInfo/BookInfo";


const HomePage = () =>
  {
    return (
        <>
        <Helmet>
           <title>Название книги будет</title>
        </Helmet>
        <BookInfoModule/> 
        </>
    )
  }

  export default HomePage;