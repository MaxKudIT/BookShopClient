import { TextField, InputAdornment } from "@mui/material";
import { getAuth } from "firebase/auth";
import { observer } from "mobx-react-lite";
import { IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";
import { textFieldStyles } from "./muiStyles";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSearch, useMyBooksSearch } from "../../../../store/context/SearchContext";
import styles from './MainHeader.module.scss'
import { IoSparklesOutline } from "react-icons/io5";
import { useStores } from "../../../../store/context/GloabalContext";

type NotificationItem = {
  id: string;
  title: string;
  text: string;
  time: string;
  isNew?: boolean;
}

const notifications: NotificationItem[] = [
  {
    id: 'welcome',
    title: 'Добро пожаловать',
    text: 'Мы рады приветствовать вас. Здесь будут отображаться новинки, новости и важные уведомления.',
    time: 'Сейчас',
    isNew: true,
  },
];

const MainHeader = observer(() => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const {
    subscriptionStore: {
      activePlan,
      getStatus,
    },
  } = useStores();

  const { setsearchingValue } = useSearch()

  const { setsearchingValue: setSearchingValueMy } = useMyBooksSearch()


  useEffect(() => {



    return () => {
      setsearchingValue('');


      setSearchingValueMy('')


    };
  }, []);

  useEffect(() => {
    if (!notificationsOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsOpen]);

  useEffect(() => {
    if (user) {
      getStatus();
    }
  }, [user, getStatus]);

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
    <div className={styles.main_header}>
      <div className={styles.search_shell}>
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
      </div>

      <div className={styles.header_actions}>
        <div className={`${styles.premium_chip} ${subscriptionView.className}`}>
          <IoSparklesOutline />
          <p>{subscriptionView.label}</p>
        </div>

        <div ref={notificationsRef} className={styles.notifications_area}>
          <button
            className={`${styles.icon_wrapper} ${notificationsOpen ? styles.icon_wrapper_active : ''}`}
            type="button"
            aria-label="Уведомления"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((prev) => !prev)}
          >
            <IoMdNotificationsOutline style={{ fontSize: 22 }} className={styles.header_buttons} />
            {notifications.some((item) => item.isNew) && <span className={styles.notification_dot}></span>}
          </button>

          {notificationsOpen && (
            <section className={styles.notifications_panel} aria-label="Уведомления">
              <div className={styles.notifications_header}>
                <div>
                  <p className={styles.notifications_title}>Уведомления</p>
                  <p className={styles.notifications_subtitle}>Новости библиотеки и важные обновления</p>
                </div>
                <span className={styles.notifications_count}>{notifications.length}</span>
              </div>

              <div className={styles.notifications_list}>
                {notifications.map((item) => (
                  <article key={item.id} className={styles.notification_item}>
                    <div className={styles.notification_icon}>
                      <IoSparklesOutline />
                    </div>

                    <div className={styles.notification_content}>
                      <div className={styles.notification_top}>
                        <p className={styles.notification_title}>{item.title}</p>
                        <span>{item.time}</span>
                      </div>
                      <p className={styles.notification_text}>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* <button className={styles.icon_wrapper} type="button" aria-label="Настройки">
          <IoSettingsOutline className={styles.header_buttons} />
        </button> */}
      </div>

    </div>
  )
})

export default MainHeader;
