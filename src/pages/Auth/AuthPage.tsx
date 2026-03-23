import { Helmet } from "react-helmet";
import { Auth } from "../../modules/Auth/Auth";

const AuthPage = () =>
  {
    return (
        <>
        <Helmet>
           <title>MaxLib</title>
        </Helmet>
        <Auth/>
        </>
    )
  }

  export default AuthPage;