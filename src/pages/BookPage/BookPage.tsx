import { Helmet } from "react-helmet";
import BookPageModule from "../../modules/BookPage/BookPageModule";
import { useStores } from "../../store/context/GloabalContext";
import { observer } from "mobx-react-lite";



const BookPage = observer(() =>
  {
    const {
      bookInfoStore: {
        book
      }
    } = useStores()
    
    return (
        <>
        <Helmet>
           <title>{book?.Title}</title>
        </Helmet>
       <BookPageModule/>
        </>
    )
  })

  export default BookPage;