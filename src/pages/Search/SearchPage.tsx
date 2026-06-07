import { Helmet } from 'react-helmet';
import SearchM from '../../modules/Search/SearchM';

const SearchPage = () => {
    return (
        <>
            <Helmet>
                <title>Magma - поиск</title>
            </Helmet>
            <SearchM />
        </>
    );
};

export default SearchPage;
