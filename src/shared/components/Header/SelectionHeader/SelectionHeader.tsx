import { TextField, InputAdornment } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import { textFieldStyles } from "./muiStyles";
import { getAuth } from "firebase/auth";
import { useEffect, useRef, useState, type FC } from "react";
import { observer } from "mobx-react-lite";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSearch, useMyBooksSearch } from "../../../../store/context/SearchContext";
import styles from './SelectionHeader.module.scss'
import Logo from "../../Logo/Logo";
import { IoClose, IoSearchOutline, IoSparklesOutline } from "react-icons/io5";
import Profile from "../../../../features/Profile/Profile";
import { useStores } from "../../../../store/context/GloabalContext";
import { useAdminAccess } from "../../../hooks/useAdminAccess";


type SelectionHeaderProps = {
  paddingSides?: number
}

type NavItem = {
  title: string;
  path: string;
}

const SelectionHeader: FC<SelectionHeaderProps> = observer(({ paddingSides }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileOverride, setProfileOverride] = useState<{
    login: string;
    email: string;
    avatarUrl: string;
  } | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const {
    subscriptionStore: {
      activePlan,
      getStatus,
    },
  } = useStores();
  const { isAdmin } = useAdminAccess();

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
  ];

  const visibleNavigationMenu = isAdmin
    ? [...navigationMenu, { title: 'Админ', path: '/admin' }]
    : navigationMenu;

  const { setsearchingValue } = useSearch()
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';
  const { setsearchingValue: setSearchingValueMy } = useMyBooksSearch()

  const auth = getAuth();

  const [user] = useAuthState(auth)
  const profileUser = profileOverride ?? {
    login: user?.displayName || user?.email?.split('@')[0] || 'Profile',
    email: user?.email || 'none',
    avatarUrl: user?.photoURL || '',
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
      window.requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [location.pathname, searchOpen, searchQuery]);

  useEffect(() => {
    if (location.pathname === '/search') {
      setSearchValue(searchQuery);
      setSearchOpen(Boolean(searchQuery));
    }
  }, [location.pathname, searchQuery]);

  useEffect(() => {
    if (user) {
      getStatus();
      setProfileOverride(null);
    }
  }, [user, getStatus]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setsearchingValue(value);
    setSearchingValueMy(value);

    const nextParams = location.pathname === '/search'
      ? new URLSearchParams(searchParams)
      : new URLSearchParams();

    if (value.trim()) {
      nextParams.set('q', value);
    } else {
      nextParams.delete('q');
    }

    navigate({
      pathname: '/search',
      search: nextParams.toString() ? `?${nextParams.toString()}` : '',
    }, { replace: location.pathname === '/search' });
  };

  const closeSearch = () => {
    setSearchValue('');
    setsearchingValue('');
    setSearchingValueMy('');

    if (location.pathname === '/search') {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('q');
      navigate({
        pathname: '/search',
        search: nextParams.toString() ? `?${nextParams.toString()}` : '',
      }, { replace: true });
    }

    setSearchOpen(false);
  };

  const subscriptionView = (() => {
    if (!activePlan) {
      return {
        className: styles.subscription_chip_standard,
        label: 'Standard',
      };
    }

    if (activePlan.DurationDays >= 365) {
      return {
        className: styles.subscription_chip_year,
        label: 'Premium 365',
      };
    }

    return {
      className: styles.subscription_chip_month,
      label: 'Premium 30',
    };
  })();

  return (
    <>
      <div style={paddingSides ? { padding: `0 ${paddingSides}px` } : { padding: '0 240px' }} className={styles.selection_header}>
        <Logo />

        {searchOpen ? (
          <div className={styles.search_shell}>
            <TextField
              value={searchValue}
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
            {visibleNavigationMenu.map(el => (
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
          <div className={`${styles.subscription_chip} ${subscriptionView.className}`}>
            <IoSparklesOutline />
            <p>{subscriptionView.label}</p>
          </div>

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
            {profileUser.avatarUrl ? (
              <img className={styles.avatar_image} src={profileUser.avatarUrl} alt={profileUser.login} />
            ) : (
              avatarLetter
            )}
          </button>
        </div>
      </div>

      {profileOpen && (
        <Profile
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
          onProfileUpdated={setProfileOverride}
          user={profileUser}
        />
      )}
    </>
  )
})

export default SelectionHeader;
