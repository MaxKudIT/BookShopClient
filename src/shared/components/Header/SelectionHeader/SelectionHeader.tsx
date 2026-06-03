import { TextField, InputAdornment } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import { textFieldStyles } from "./muiStyles";
import { getAuth } from "firebase/auth";
import { useEffect, useRef, useState, type FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearch, useMyBooksSearch } from "../../../../store/context/SearchContext";
import styles from './SelectionHeader.module.scss'
import Logo from "../../Logo/Logo";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import Profile from "../../../../features/Profile/Profile";


type SelectionHeaderProps = {
  paddingSides?: number
}

type NavItem = {
  title: string;
  path: string;
}

const SelectionHeader: FC<SelectionHeaderProps> = ({ paddingSides }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const { setsearchingValue } = useSearch()
  const navigate = useNavigate();
  const location = useLocation();
  const { setsearchingValue: setSearchingValueMy } = useMyBooksSearch()

  const auth = getAuth();

  const [user] = useAuthState(auth)
  const profileUser = {
    login: user?.displayName || user?.email?.split('@')[0] || 'Profile',
    email: user?.email || 'none',
  };
  const avatarLetter = profileUser.login[0]?.toUpperCase() || 'P';

  useEffect(() => {
    return () => {
      setsearchingValue('');
      setSearchingValueMy('')
    };
  }, [setSearchingValueMy, setsearchingValue]);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const handleSearchChange = (value: string) => {
    setsearchingValue(value);
    setSearchingValueMy(value);
  };

  const closeSearch = () => {
    handleSearchChange('');
    setSearchOpen(false);
  };

  return (
    <>
      <div style={paddingSides ? { padding: `0 ${paddingSides}px` } : { padding: '0 240px' }} className={styles.selection_header}>
        <Logo />

        {searchOpen ? (
          <div className={styles.search_shell}>
            <TextField
              inputRef={searchInputRef}
              onChange={(event) => handleSearchChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  closeSearch();
                }
              }}
              sx={textFieldStyles}
              variant="filled"
              label="Поиск"
              placeholder="Ищите книги, авторов и коллекции..."
              slotProps={{
                input: {
                  startAdornment:
                    <InputAdornment position="start">
                      <IoSearchOutline />
                    </InputAdornment>,
                  endAdornment:
                    <InputAdornment position="end">
                      <button className={styles.search_close_button} type="button" aria-label="Закрыть поиск" onClick={closeSearch}>
                        <IoClose />
                      </button>
                    </InputAdornment>
                },
              }}
            />
          </div>
        ) : (
          <div className={styles.header_refs_container}>
            {navigationMenu.map(el => (
              <button
                key={el.path}
                type="button"
                onClick={() => navigate(el.path)}
                className={location.pathname === el.path ? styles.header_refers_active : styles.header_refers_unactive}
              >
                {el.title}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', columnGap: 15, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              className={`${styles.icon_wrapper} ${searchOpen ? styles.icon_wrapper_active : ''}`}
              type="button"
              aria-label={searchOpen ? 'Закрыть поиск' : 'Открыть поиск'}
              onClick={() => {
                if (searchOpen) {
                  closeSearch();
                  return;
                }

                setSearchOpen(true);
              }}
            >
              <IoIosSearch style={{ fontSize: 22 }} className={styles.header_buttons} />
            </button>
          </div>

          <button className={styles.avatar_button} type="button" aria-label="Открыть профиль" onClick={() => setProfileOpen(true)}>
            {avatarLetter}
          </button>
        </div>
      </div>

      {profileOpen && <Profile open={profileOpen} onClose={() => setProfileOpen(false)} user={profileUser} />}
    </>
  )
}

export default SelectionHeader;
