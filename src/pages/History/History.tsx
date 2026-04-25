import { Helmet } from "react-helmet";
import HistoryM from "../../modules/History/HistoryM";



const History = () =>
  {
    return (
        <>
        <Helmet>
           <title>Magma</title>
        </Helmet>
        <HistoryM/>
        </>
    )
  }

  export default History;