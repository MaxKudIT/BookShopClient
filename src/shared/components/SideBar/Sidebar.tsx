import styles from './Sidebar.module.scss'
import { MdOutlineGridView, MdOutlineShoppingCart, MdOutlineHistory, MdAutoAwesome } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import type { FC, ReactNode } from 'react';
import { Tooltip } from '@mui/material';
import Logo from '../Logo/Logo';
import { LuLibraryBig } from 'react-icons/lu';

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
    const navigationMenu: NavItem[] = [
        { icon: <MdOutlineGridView style={{ fontSize: 16 }} />, title: 'Главная', active: true },
        { icon: <FaRegCompass style={{ fontSize: 15 }} />, title: 'Исследовать' },
        { icon: <MdAutoAwesome style={{ fontSize: 15 }} />, title: 'Рекомендации', meta: 'Для вас' },
    ];

    const libraryMenu: NavItem[] = [
        { icon: <LuLibraryBig style={{ fontSize: 17, marginBottom: 1 }} />, title: 'Моя полка' },
        { icon: <FaRegBookmark style={{ fontSize: 14 }} />, title: 'Избранное', meta: '24' },
        { icon: <MdOutlineShoppingCart style={{ fontSize: 15 }} />, title: 'Корзина', meta: '3' },
        { icon: <MdOutlineHistory style={{ fontSize: 16 }} />, title: 'История чтения', meta: 'Новое' },
    ];

    const menuSections = [
        { title: 'НАВИГАЦИЯ', items: navigationMenu },
        { title: 'МОЯ БИБЛИОТЕКА', items: libraryMenu },
    ];

    return (
        <div className={styles.sidebar_main}>
            <div className={styles.logo_block}>
                <Logo />
            </div>

            <div className={styles.sidebar_body}>
                {menuSections.map((section) => (
                    <div key={section.title} className={styles.menu_card}>
                        <div className={styles.title_menu_container}>
                            <p className={styles.title_menu}>{section.title}</p>
                        </div>

                        <div className={styles.menu_list}>
                            {section.items.map((item) => (
                                <button
                                    key={item.title}
                                    className={item.active ? styles.button_sidebar_active : styles.button_sidebar_unactive}
                                >
                                    <span className={styles.nav_icon}>{item.icon}</span>
                                    <p>{item.title}</p>
                                    {item.meta && <span className={styles.meta_badge}>{item.meta}</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
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
