import { TextField, InputAdornment } from "@mui/material";
import { IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import { textFieldStyles } from "./muiStyles";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useSearch, useMyBooksSearch } from "../../../../store/context/SearchContext";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import styles from './MainHeader.module.scss'
import { IoSettingsOutline } from "react-icons/io5";



const MainHeader = ({ }) => {

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
    <div className={styles.main_header}>
      <TextField
        onChange={(e) => {
          setsearchingValue(e.target.value)

        }}
        sx={textFieldStyles}
        variant="filled"
        label="Поиск"
        placeholder={'Ищите книги, авторов и коллекции...'}
        slotProps={{
          input: {
            startAdornment:
              <InputAdornment position="start">
                <IoMdSearch />
              </InputAdornment>
          },
        }}
      />
      {/* <button className={styles.button_view}>
        <GrOverview style={{ fontSize: 16 }} />
        <p >Смотреть каталог</p>
      </button> */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={styles.icon_wrapper}>
          <IoMdNotificationsOutline style={{ fontSize: 22 }} className={styles.header_buttons} />
        </div>
        <div className={styles.icon_wrapper}>
          <IoSettingsOutline className={styles.header_buttons} />
        </div>
      </div>

    </div>
  )
}

export default MainHeader;