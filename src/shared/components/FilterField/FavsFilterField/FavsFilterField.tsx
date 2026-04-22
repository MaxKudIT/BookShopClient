import { TextField, InputAdornment, Divider, FormControl, MenuItem, Select } from "@mui/material";
import { IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import { selectStyles, textFieldStyles } from "./muiStyles";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useSearch, useMyBooksSearch, type GenresDropDown, type DateDropDown } from "../../../../store/context/SearchContext";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import styles from './FavsFilterField.module.scss'
import { IoColorFilterOutline, IoSettingsOutline } from "react-icons/io5";
import { PiSortAscending } from "react-icons/pi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { LuFilter } from "react-icons/lu";

export const genresKeys: GenresDropDown[] = ['Все жанры', 'Приключения', 'Драма', 'Ужасы', 'Исторические', 'Фантастика']
export const dateKeys: DateDropDown[] = ['Сначала новые', 'В алфавитном порядке']

const FavsFilterField = ({ }) => {

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
    <div className={styles.main_container}>
      <div style={{ display: 'flex', width: '50%', columnGap: 20, marginRight: 20 }}>
        <TextField
          onChange={(e) => {
            setsearchingValue(e.target.value)

          }}
          sx={textFieldStyles}
          variant="filled"

          placeholder={'Ищите книги в избранном...'}
          slotProps={{
            input: {
              startAdornment:
                <InputAdornment position="start">
                  <IoMdSearch />
                </InputAdornment>
            },
          }}
        />
       
      </div>


      <div style={{ display: 'flex', columnGap: 20, alignItems: 'center' }}>

        <div style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
          <FormControl sx={selectStyles.formControl}>
            <Select
              defaultValue="Все жанры"
              renderValue={(selected) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <IoColorFilterOutline style={{fontSize: 14}}/>
                  <span style={{fontSize: 13}}>{selected}</span> 
                </div>
              )}

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

          <Divider orientation="vertical" sx={{ borderBottomWidth: 2, height: 45, ml: 2, mr: 2, borderColor: '#353746FF' }} />

          <FormControl sx={selectStyles.formControl}>
            <Select
              defaultValue="Сначала новые"
              renderValue={(selected) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HiArrowsUpDown style={{fontSize: 14}}/>
                  <span style={{fontSize: 13}}>{selected}</span> 
                </div>
              )}

              sx={selectStyles.select}
              MenuProps={{
                PaperProps: {
                  sx: selectStyles.menuPaper,
                },
              }}
            >
              {dateKeys.map(genre => (
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

    </div>
  )
}

export default FavsFilterField;