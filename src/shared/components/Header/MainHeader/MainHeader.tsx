import { TextField, InputAdornment } from "@mui/material";
import { IoMdSearch } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import { textFieldStyles } from "./muiStyles";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useSearch, useMyBooksSearch } from "../../../../store/context/SearchContext";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import styles from './MainHeader.module.scss'



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
        placeholder={'Ищите книги, авторов и коллецкии...'}
        slotProps={{
          input: {
            startAdornment:
              <InputAdornment position="start">
                <IoMdSearch />
              </InputAdornment>
          },
        }}
      />
      <button className={styles.button_view}>
        <GrOverview style={{fontSize: 16}}/>
        <p >Смотреть каталог</p>
      </button>
    </div>
  )
}

export default MainHeader;