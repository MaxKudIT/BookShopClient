import { Helmet } from "react-helmet";
import { Auth } from "../../modules/Auth/Auth";

const AuthPage = () =>
  {
    return (
        <>
        <Helmet>
           <title>Magma</title>
        </Helmet>
        <Auth/>
        </>
    )
  }

  export default AuthPage;