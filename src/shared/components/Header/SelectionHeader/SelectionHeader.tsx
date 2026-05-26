import { TextField, InputAdornment } from "@mui/material";
import { IoIosSearch, IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import { textFieldStyles } from "./muiStyles";
import { getAuth } from "firebase/auth";
import { useEffect, type FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearch, useMyBooksSearch } from "../../../../store/context/SearchContext";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import styles from './SelectionHeader.module.scss'
import Logo from "../../Logo/Logo";
import { IoSettingsOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";


type SelectionHeaderProps = {
  paddingSides?: number
}

type NavItem = {
  title: string;
  path: string;
}






const SelectionHeader: FC<SelectionHeaderProps> = ({ paddingSides }) => {


  const navigationMenu: NavItem[] = [
    {
      title: 'Главная',
      path: '/'
    },
    {
      title: 'Корзина',
      path: '/cart'
    },
    {
      title: 'Избранное',
      path: '/favs'
    },
    {
      title: 'Рекомендации',
      path: '/recomms'
    },
  ]



  const { setsearchingValue, setGenre } = useSearch()
  const { logout } = useFirebaseAuth()
  const navigate = useNavigate();
  const location = useLocation();
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
    <div style={paddingSides ? { padding: `0 ${paddingSides}px` } : { padding: '0 240px' }} className={styles.selection_header}>
      <Logo />

      <div className={styles.header_refs_container}>
        {navigationMenu.map(el => (
          <div onClick={() => navigate(el.path)} className={location.pathname === el.path ? styles.header_refers_active : styles.header_refers_unactive}>{el.title}</div>
        ))}

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