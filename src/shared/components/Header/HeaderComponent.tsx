import React, { useEffect, type FC } from "react";
import styles from './Header.module.scss'
import { PiBooks, PiFunnelBold } from "react-icons/pi";
import { MdOutlineAccountCircle } from "react-icons/md";
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
import { IoMdSearch } from "react-icons/io";
import {
  MdEmail,
  MdPerson,
  MdLibraryBooks,
  MdExitToApp
} from "react-icons/md";
import { selectStyles, textFieldStyles } from "./muiStyles";
import { IoHomeOutline } from "react-icons/io5";
import { useMyBooksSearch, useSearch, type GenresDropDown } from "../../../store/context/SearchContext";
import { IoBookOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
export const genresKeys: GenresDropDown[] = ['Все жанры', 'Приключения', 'Драма', 'Ужасы', 'Исторические', 'Фантастика']

export type HeaderProps = {
  myBooksPage: boolean
}


const HeaderComponent: FC<HeaderProps> = ({ myBooksPage }) => {
  const { setsearchingValue, setGenre } = useSearch()
  const { logout } = useFirebaseAuth()
  const navigate = useNavigate();

  const { setsearchingValue: setSearchingValueMy, setGenre: setGenreMy } = useMyBooksSearch()

  const auth = getAuth();

  const [user] = useAuthState(auth)


  useEffect(() => {



    return () => {
      setsearchingValue('');
      setGenre('Все жанры');

      setSearchingValueMy('')
      setGenreMy('Все жанры')

    };
  }, []);



  return (
    <div className={styles.header_block_style}>
      <div className={styles.header_first_row}>
        <div className={styles.first_start_block_wrapper}>
          <div style={{ background: 'rgba(255,255,255, 0.2)', borderRadius: 10, padding: 5, }}>
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
        <div style={{ display: 'flex', alignItems: 'center', columnGap: 25 }}>
          {myBooksPage ? (
            <AiOutlineShopping onClick={() => {navigate('/')}} style={{ fontSize: 35, color: 'white', cursor: 'pointer' }} />
          ) : (
            <IoHomeOutline onClick={() => {navigate('/mybooks')}} style={{ fontSize: 30, color: 'white', cursor: 'pointer' }} />
          )}

          <Tooltip

            title={
              <Box sx={{
                borderRadius: 2,
                pb: 1, pt: 1, background: 'rgba(95, 97, 134, 1)',
                '& svg': {
                  color: 'rgba(153, 154, 179, 1)',
                  fontSize: '20px',

                }


              }}>


                <ListItem sx={{pl: 1.5, pr: 1.5}} disablePadding>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <MdEmail fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontSize={14} color='rgba(211, 211, 221, 1)'>
                        Email
                      </Typography>
                    }
                    secondary={
                      <Typography fontSize={14} sx={{ fontWeight: 'medium' }}>
                        {user?.email}
                      </Typography>
                    }
                  />
                </ListItem>


                <ListItem sx={{pl: 1.5, pr: 1.5}} disablePadding>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <MdPerson fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontSize={14} color='rgba(211, 211, 221, 1)'>
                        Логин
                      </Typography>
                    }
                    secondary={
                      <Typography fontSize={14} sx={{ fontWeight: 'medium' }}>
                        {user?.displayName}
                      </Typography>
                    }
                  />
                </ListItem>

                <Divider sx={{ my: 1 }} />
                {!myBooksPage && (
                  <ListItemButton

                    onClick={() => {navigate('/mybooks')}}
                    sx={{
                  
                      mt: 1,
                      pt: 0,
                      pb: 0,
                      pl: 1.5,
                      pr: 1.5,
                      height: 40,
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <MdLibraryBooks fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: 14,
                        },
                  
                      }}
                      primary="Мои книги"


                    />
                  </ListItemButton>
                )}


                <Divider sx={{ my: 1 }} />

                <ListItemButton
            
                  onClick={() => { logout(); navigate('/auth') }}
                  sx={{
                   
                    mt: 1,
                    pb: 0,
                    pt: 0,
                    pl: 1.5,
                    pr: 1.5,
                    height: 40,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <MdExitToApp fontSize="small" />
                  </ListItemIcon>
                  <ListItemText sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: 14,
                    }
                  }} primary="Выйти" />
                </ListItemButton>

              </Box>
            }
            placement="bottom-end"
            arrow
            slotProps={{
              tooltip: {
                sx: {

                  backgroundColor: 'transparent',
                  padding: 0,
                  boxShadow: 'none',
                  maxWidth: 'none',
                  '& .MuiTooltip-arrow': {
                    color: 'rgba(153, 154, 179, 1)',
                  },

                }
              }
            }}
          >
            <IconButton sx={{ p: 0 }}>
              <MdOutlineAccountCircle
                style={{
                  fontSize: 32,
                  color: 'white',
                  borderRadius: 10,
                  cursor: 'pointer'
                }}
              />
            </IconButton>
          </Tooltip>
        </div>

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
          placeholder="Гарри Поттер"
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
          <PiFunnelBold color="white" size={22} />
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