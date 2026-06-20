import { TextField, InputAdornment, Divider, FormControl, MenuItem, Select, Tooltip } from "@mui/material";
import { IoMdInformationCircleOutline, IoMdSearch } from "react-icons/io";
import { selectStyles, textFieldStyles } from "./muiStyles";
import type { DateDropDown, GenresDropDown } from "../../../../store/context/SearchContext";
import styles from './MainBooksFilterField.module.scss'
import { IoColorFilterOutline } from "react-icons/io5";
import { HiArrowsUpDown } from "react-icons/hi2";

export const genresKeys: GenresDropDown[] = ['Все жанры', 'Приключения', 'Драма', 'Ужасы', 'Исторические', 'Фантастика']
export const dateKeys: DateDropDown[] = ['Сначала новые', 'В алфавитном порядке']

const menuProps = {
  disableScrollLock: true,
  PaperProps: {
    sx: selectStyles.menuPaper,
  },
  MenuListProps: {
    sx: selectStyles.menuList,
  },
};

type MainBooksFilterFieldProps = {
  searchValue: string;
  selectedGenre: GenresDropDown;
  selectedSort: DateDropDown;
  onSearchChange: (value: string) => void;
  onGenreChange: (value: GenresDropDown) => void;
  onSortChange: (value: DateDropDown) => void;
}

const MainBooksFilterField = ({
  searchValue,
  selectedGenre,
  selectedSort,
  onSearchChange,
  onGenreChange,
  onSortChange,
}: MainBooksFilterFieldProps) => {
  return (
    <div className={styles.main_container}>
      <div style={{
        display: 'flex',
        width: '50%',
        columnGap: 10,
        marginRight: 20,
        alignItems: 'center'
      }}>
        <TextField
          value={searchValue}
          onChange={(e) => {
            onSearchChange(e.target.value)

          }}
          sx={textFieldStyles}
          variant="filled"

          placeholder={'Ищите книги, которые еще не попали к вам в руки...'}
          slotProps={{
            input: {
              startAdornment:
                <InputAdornment position="start">
                  <IoMdSearch />
                </InputAdornment>
            },
          }}
        />
        <Tooltip
        placement="top"
          title="Поиск книг, которых нет в избранном, корзине и среди купленных"
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: '#21252c',  
                color: '#ffffff',            
                fontSize: 12,
                lineHeight: 1.5,
                padding: '8px 12px',
                borderRadius: '8px',
               
              }
            },
            arrow: {
              sx: {
                color: '#333333',  
              }
            }
          }}
          arrow
        >
          <IoMdInformationCircleOutline style={{ color: 'rgba(206, 209, 221, 0.75)', fontSize: 20, flexShrink: 0 }} />
        </Tooltip>
      </div>


      <div style={{ display: 'flex', columnGap: 20, alignItems: 'center' }}>

        <div style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
          <FormControl sx={selectStyles.formControl}>
            <Select
              value={selectedGenre}
              onChange={(event) => onGenreChange(event.target.value as GenresDropDown)}
              renderValue={(selected) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IoColorFilterOutline style={{ fontSize: 14 }} />
                  <span style={{ fontSize: 13 }}>{selected}</span>
                </div>
              )}

              sx={selectStyles.select}
              MenuProps={menuProps}
            >
              {genresKeys.map(genre => (
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider orientation="vertical" sx={{ borderBottomWidth: 2, height: 45, ml: 2, mr: 2, borderColor: '#353746FF' }} />

          <FormControl sx={selectStyles.formControl}>
            <Select
              value={selectedSort}
              onChange={(event) => onSortChange(event.target.value as DateDropDown)}
              renderValue={(selected) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HiArrowsUpDown style={{ fontSize: 14 }} />
                  <span style={{ fontSize: 13 }}>{selected}</span>
                </div>
              )}

              sx={selectStyles.select}
              MenuProps={menuProps}
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

export default MainBooksFilterField;
