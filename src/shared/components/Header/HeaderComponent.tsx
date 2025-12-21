import React, { type FC } from "react";
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
  Typography
} from "@mui/material";
import { IoMdSearch } from "react-icons/io";
import { 
  MdEmail, 
  MdPerson, 
  MdLibraryBooks,
  MdExitToApp 
} from "react-icons/md";
import { selectStyles, textFieldStyles } from "./muiStyles";
import type { Genres } from "../../types";
import { useSearch, type GenresDropDown } from "../../../store/context/SearchContext";
import { IoBookOutline } from "react-icons/io5";
export const genresKeys: GenresDropDown[] = ['Все жанры', 'Приключения', 'Драма', 'Ужасы', 'Исторические', 'Фантастика']

export type HeaderProps = {
  myBooksPage: boolean
}


const HeaderComponent: FC<HeaderProps> = ({myBooksPage}) => {
  const { setsearchingValue, setGenre } = useSearch()
  
  // Данные пользователя (можно вынести в контекст/стейт)
  const userData = {
    email: "user@example.com",
    login: "ivan_ivanov",
    booksCount: 5
  }

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
          <div style={{display: 'flex', alignItems: 'center', columnGap: 15}}>
              <PiBooks style={{ fontSize: 35, color: 'white' }} />
             <Tooltip
          title={
            <Box sx={{ p: 1, minWidth: 250 }}>
          
              <List dense disablePadding>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <MdEmail fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {userData.email}
                      </Typography>
                    }
                  />
                </ListItem>


                <ListItem  disablePadding sx={{ mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <MdPerson fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="body2" color="text.secondary">
                        Логин
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {userData.login}
                      </Typography>
                    }
                  />
                </ListItem>

                <Divider sx={{ my: 1 }} />
                {!myBooksPage && (
                   <ListItem 
                  disablePadding
                 
                  onClick={() => console.log('Переход к моим книгам')}
                  sx={{
                    borderRadius: 1,
                    '&:hover': { backgroundColor: 'action.hover' }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <MdLibraryBooks fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Мои книги"
                    secondary={`${userData.booksCount} книг`}
                  />
                </ListItem>
                )}
               

        
                <ListItem 
                  disablePadding
                
                  onClick={() => console.log('Выход')}
                  sx={{
                    borderRadius: 1,
                    mt: 1,
                    '&:hover': { backgroundColor: 'action.hover' }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <MdExitToApp fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Выйти"
                    primaryTypographyProps={{
                      color: 'error.main'
                    }}
                  />
                </ListItem>
              </List>
            </Box>
          }
          placement="bottom-end"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: 'white',
                color: 'text.primary',
                boxShadow: 3,
                '& .MuiTooltip-arrow': {
                  color: 'white',
                }
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
          onChange={(e) => {setsearchingValue(e.target.value)}}
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

        <div style={{display: 'flex', alignItems: 'center', columnGap: 10}}>
          <PiFunnelBold color="white" size={22} />
          <FormControl sx={selectStyles.formControl}>
            <Select
              defaultValue="Все жанры"
              onChange={(e) => {setGenre(e.target.value as GenresDropDown); }}
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