import { TextField, InputAdornment } from "@mui/material";
import { IoIosSearch, IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import { textFieldStyles } from "./muiStyles";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useSearch, useMyBooksSearch } from "../../../../store/context/SearchContext";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import styles from './SelectionHeader.module.scss'
import Logo from "../../Logo/Logo";
import { IoSettingsOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";



const SelectionHeader = ({ }) => {

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
    <div className={styles.selection_header}>
      <Logo />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={styles.header_refers_active}>Главная</div>
        <div className={styles.header_refers_unactive}>Корзина</div>
        <div className={styles.header_refers_unactive}>Рекомендации</div>
        <div className={styles.header_refers_unactive}>Избранное</div>
      </div>

      <div style={{ display: 'flex', columnGap: 15, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className={styles.icon_wrapper}>
            <IoIosSearch style={{ fontSize: 22 }} className={styles.header_buttons} />
          </button>

          <button className={styles.icon_wrapper}>
            <IoSettingsOutline className={styles.header_buttons} />
          </button>
        </div>



        <div style={{
          borderRadius: 50,
          background: 'rgb(150, 10, 10)',
          width: 40,
          height: 40,
          color: '#F9FAFBFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 15
        }}>P</div>




      </div>
    </div>
  )
}

export default SelectionHeader;