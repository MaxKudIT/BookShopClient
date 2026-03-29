
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useSearch, useMyBooksSearch } from "../../../../store/context/SearchContext";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import styles from './SelectionFooter.module.scss'



const SelectionFooter = ({ }) => {

    const { setsearchingValue, setGenre } = useSearch()
    const { logout } = useFirebaseAuth()
    const navigate = useNavigate();

    const { setsearchingValue: setSearchingValueMy, setGenre: setGenreMy } = useMyBooksSearch()

    const auth = getAuth();

    const [user] = useAuthState(auth)


    useEffect(() => {



        return () => {
            setsearchingValue('');


            setSearchingValueMy('')


        };
    }, []);




    return (
        <div className={styles.selection_footer}>
            <div style={{display: 'flex', columnGap: 30}}>
                <a href='https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BC%D0%BE%D1%89%D1%8C' style={{ fontSize: 12, color: 'rgb(107, 111, 117)', fontWeight: 500 }}>Помощь</a>
                <a href={'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8C'} style={{ fontSize: 12, color: 'rgb(107, 111, 117)', fontWeight: 500 }}>Конфиденциальность</a>
                <a href='https://ru.wikipedia.org/wiki/%D0%A3%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F_%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F' style={{ fontSize: 12, color: 'rgb(107, 111, 117)', fontWeight: 500 }}>Условия</a>
                <a href='https://ru.wikipedia.org/wiki/%D0%90%D0%B2%D1%82%D0%BE%D1%80' style={{ fontSize: 12, color: 'rgb(107, 111, 117)', fontWeight: 500 }}>Для авторов</a>
            </div>
              <p style={{color: 'rgb(107, 111, 117)', fontSize: 13}}>© 2026 MaxLib. Все права защищены.</p>
        </div>
    )
}

export default SelectionFooter;