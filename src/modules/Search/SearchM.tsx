import SearchF from '../../features/Search/SearchF';
import styles from './SearchM.module.scss';

const SearchM = () => {
    return (
        <div className={styles.search_container}>
            <SearchF />
        </div>
    );
};

export default SearchM;
