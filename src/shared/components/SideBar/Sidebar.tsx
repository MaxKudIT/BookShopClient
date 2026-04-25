import styles from './Sidebar.module.scss'
import { MdOutlineGridView, MdOutlineShoppingCart, MdOutlineHistory, MdAutoAwesome } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { FaRegBookmark } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import type { FC, ReactNode } from 'react';
import { Tooltip } from '@mui/material';
import Logo from '../Logo/Logo';

export type SideBarType = {
    handleLogout: () => void,
    user: {
        login: string;
        email: string;
    }
}

type NavItem = {
    icon: ReactNode;
    title: string;
    meta?: string;
    active?: boolean;
}

const SideBar: FC<SideBarType> = ({ handleLogout, user }) => {
    const mainMenu: NavItem[] = [
        { icon: <MdOutlineGridView style={{ fontSize: 16 }} />, title: 'Главная', active: true },
        { icon: <FaRegCompass style={{ fontSize: 15 }} />, title: 'Исследовать' },
        { icon: <GiBookshelf style={{ fontSize: 16 }} />, title: 'Моя полка' },
    ];

    const collections: NavItem[] = [
        { icon: <FaRegBookmark style={{ fontSize: 14 }} />, title: 'Избранное', meta: '24' },
        { icon: <MdOutlineShoppingCart style={{ fontSize: 15 }} />, title: 'Корзина', meta: '3' },
        { icon: <MdOutlineHistory style={{ fontSize: 15 }} />, title: 'История чтения', meta: 'Новое' },
        { icon: <MdAutoAwesome style={{ fontSize: 15 }} />, title: 'Рекомендации', meta: 'Для вас' },
    ];

    return (
        <div className={styles.sidebar_main}>
            <div className={styles.logo_block}>
                <Logo />
            </div>

            <div className={styles.sidebar_body}>
                <div className={styles.menu_card}>
                    <div className={styles.title_menu_container}>
                        <p className={styles.title_menu}>БЫСТРЫЙ ДОСТУП</p>
                      
                    </div>

                    <div className={styles.menu_list}>
                        {mainMenu.map((item) => (
                            <button
                                key={item.title}
                                className={item.active ? styles.button_sidebar_active : styles.button_sidebar_unactive}
                            >
                                <span className={styles.nav_icon}>{item.icon}</span>
                                <p>{item.title}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.collections_card}>
                    <div className={styles.title_menu_container}>
                        <p className={styles.title_menu}>ПЕРСОНАЛЬНЫЙ РАЗДЕЛ</p>
                      
                    </div>

                    <div className={styles.menu_list}>
                        {collections.map((item) => (
                            <button key={item.title} className={styles.button_sidebar_unactive}>
                                <span className={styles.nav_icon}>{item.icon}</span>
                                <p>{item.title}</p>
                                {item.meta && <span className={styles.meta_badge}>{item.meta}</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.footer_sidebar}>
                <div className={styles.footer_glow}></div>

                <div className={styles.footer_top}>
                    <div className={styles.button_profile}>
                        <div className={styles.avatar_circle}>{user.login[0]}</div>
                        <div className={styles.profile_info}>
                            <p className={styles.profile_name}>{user.login}</p>
                            <span className={styles.profile_email}>{user.email}</span>
                        </div>
                    </div>

                    <Tooltip
                        slotProps={{
                            tooltip: {
                                sx: {
                                    color: '#F9FAFBFF',
                                    fontWeight: 500
                                }
                            },
                        }}
                        title="Выйти из аккаунта"
                        placement="top"
                    >
                        <RxExit onClick={handleLogout} className={styles.button_exit} />
                    </Tooltip>
                </div>

             
            </div>
        </div>
    )
}

export default SideBar;
