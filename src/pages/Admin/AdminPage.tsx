import { Helmet } from "react-helmet";
import AdminM from "../../modules/Admin/AdminM";

const AdminPage = () => {
    return (
        <>
            <Helmet>
                <title>Magma Admin</title>
            </Helmet>
            <AdminM />
        </>
    );
};

export default AdminPage;
