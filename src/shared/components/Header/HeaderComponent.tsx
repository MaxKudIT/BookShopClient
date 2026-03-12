import React, { useEffect, type FC } from "react";
import styles from './Header.module.scss'
import { PiBooks, PiFunnelBold } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Typography,
  ListItemButton
} from "@mui/material";
import { IoIosHeart, IoMdCart, IoMdSearch } from "react-icons/io";
import { IoIosHome } from "react-icons/io";
import {
  MdEmail,
  MdPerson,
  MdLibraryBooks,
  MdExitToApp
} from "react-icons/md";
import { IoColorFilterOutline } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { selectStyles, textFieldStyles } from "./MainHeader/muiStyles";
import { IoHomeOutline } from "react-icons/io5";
import { useMyBooksSearch, useSearch, type GenresDropDown } from "../../../store/context/SearchContext";
import { IoBookOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaCartShopping } from "react-icons/fa6";
import NavComponent from "../Navigation/NavComponent";
export const genresKeys: GenresDropDown[] = ['Все жанры', 'Приключения', 'Драма', 'Ужасы', 'Исторические', 'Фантастика']



const booksPlaceholder = [
  'Гарри Поттер',
  'Человек-паук',
  'Властелин колец',
  'Голодные игры',
  'Убить пересмешника',
  'Сто лет одиночества'
];

export type HeaderProps = {
  myBooksPage: boolean,
  countFav: number;
  countCart: number
}



const HeaderComponent: FC<HeaderProps> = ({ myBooksPage, countCart, countFav }) => {


  const randomPl = booksPlaceholder[Math.floor(Math.random() * booksPlaceholder.length)]



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
    <div className={styles.header_block_style}>
      <div className={styles.header_first_row}>
        <div className={styles.first_start_block_wrapper}>
          <div style={{ background: 'rgba(255,255,255, 0.2)', borderRadius: 10, padding: 5 }}>
            <IoBookOutline style={{ fontSize: 40, color: 'white' }} />
          </div>

          {myBooksPage ? (
            <div className={styles.text_wrapper}>
              <p style={{ color: 'white', fontSize: 22 }}>Мои книги</p>
              <p style={{ color: 'rgba(255,255,255, 0.5)' }}>Ваш мир литературы</p>
            </div>
          ) : (
            <div className={styles.text_wrapper}>
              <p style={{ color: 'white', fontSize: 22 }}>Книжный магазин</p>
              <p style={{ color: 'rgba(255,255,255, 0.5)' }}>Каждый найдет книгу по душе</p>
            </div>
          )}


        </div>

          <NavComponent myBooksPage={myBooksPage} countFav={countFav} countCart={countCart}/>
       

      </div>

      <div className={styles.header_second_row}>
        <TextField
          onChange={(e) => {
            if (myBooksPage) {
              setSearchingValueMy(e.target.value)
            } else {
              setsearchingValue(e.target.value)
            }


          }}
          sx={textFieldStyles}
          variant="filled"
          label="Поиск"
          placeholder={randomPl}
          slotProps={{
            input: {
              startAdornment:
                <InputAdornment position="start">
                  <IoMdSearch />
                </InputAdornment>
            },
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
          <IoColorFilterOutline color="white" size={22} />
          <FormControl sx={selectStyles.formControl}>
            <Select
              defaultValue="Все жанры"
              onChange={(e) => {
                if (myBooksPage) {
                  setGenreMy(e.target.value as GenresDropDown)
                } else {
                  setGenre(e.target.value as GenresDropDown);
                }


              }}
              sx={selectStyles.select}
              MenuProps={{
                PaperProps: {
                  sx: selectStyles.menuPaper,
                },
              }}
            >
              {genresKeys.map(genre => (
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent;