import styles from './Sidebar.module.scss'
import { MdAdminPanelSettings, MdOutlineGridView, MdOutlineShoppingCart, MdOutlineHistory, MdAutoAwesome } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { useEffect, useState, type FC, type ReactNode } from 'react';
import { Tooltip } from '@mui/material';
import Logo from '../Logo/Logo';
import { LuLibraryBig } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';
import Profile from '../../../features/Profile/Profile';
import { useAdminAccess } from '../../hooks/useAdminAccess';

export type SideBarType = {
    handleLogout: () => void,
    user: {
        login: string;
        email: string;
        avatarUrl?: string;
    }
}

type NavItem = {
    icon: ReactNode;
    title: string;
    path: string;
    meta?: string;
}

const SideBar: FC<SideBarType> = ({ handleLogout, user }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profileOpen, setProfileOpen] = useState(false);
    const [profileUser, setProfileUser] = useState(user);
    const { isAdmin } = useAdminAccess();

    const navigationMenu: NavItem[] = [
        { icon: <MdOutlineGridView style={{ fontSize: 16 }} />, title: 'Главная', path: '/' },
        { icon: <FaRegCompass style={{ fontSize: 15 }} />, title: 'Исследовать', path: '/mainbooks' },
        { icon: <LuLibraryBig style={{ fontSize: 17, marginBottom: 1 }} />, title: 'Моя полка', path: '/mybooks' },
    ];

    const libraryMenu: NavItem[] = [
        { icon: <MdAutoAwesome style={{ fontSize: 15 }} />, title: 'Рекомендации', path: '/recomms', meta: 'Для вас' },
        { icon: <FaRegBookmark style={{ fontSize: 14 }} />, title: 'Избранное', path: '/favs', meta: '24' },
        { icon: <MdOutlineShoppingCart style={{ fontSize: 15 }} />, title: 'Корзина', path: '/cart', meta: '3' },
        { icon: <MdOutlineHistory style={{ fontSize: 16 }} />, title: 'История чтения', path: '/history', meta: 'Новое' },
    ];

    const adminMenu: NavItem[] = isAdmin
        ? [{ icon: <MdAdminPanelSettings style={{ fontSize: 17 }} />, title: 'Админ', path: '/admin', meta: 'Panel' }]
        : [];

    const menuSections = [
        { title: 'ОСНОВНОЕ', items: navigationMenu },
        { title: 'ПЕРСОНАЛЬНОЕ', items: libraryMenu },
        ...(adminMenu.length ? [{ title: 'УПРАВЛЕНИЕ', items: adminMenu }] : []),
    ];

    useEffect(() => {
        setProfileUser(user);
    }, [user]);

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
                            {section.items.map((item) => {
                                const isActive = location.pathname === item.path;

                                return (
                                    <button
                                        key={item.title}
                                        type="button"
                                        className={isActive ? styles.button_sidebar_active : styles.button_sidebar_unactive}
                                        onClick={() => navigate(item.path)}
                                    >
                                        <span className={styles.nav_icon}>{item.icon}</span>
                                        <p>{item.title}</p>
                                        {item.meta && <span className={styles.meta_badge}>{item.meta}</span>}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.footer_sidebar}>
                <div className={styles.footer_glow}></div>

                <div className={styles.footer_top}>
                    <button
                        className={styles.button_profile}
                        type="button"
                        onClick={() => setProfileOpen(true)}
                    >
                        <div className={styles.avatar_circle}>
                            {profileUser.avatarUrl ? (
                                <img className={styles.avatar_image} src={profileUser.avatarUrl} alt={profileUser.login} />
                            ) : (
                                profileUser.login[0]
                            )}
                        </div>
                        <div className={styles.profile_info}>
                            <p className={styles.profile_name}>{profileUser.login}</p>
                            <span className={styles.profile_email}>{profileUser.email}</span>
                        </div>
                    </button>

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
            <Profile open={profileOpen} onClose={() => setProfileOpen(false)} onProfileUpdated={setProfileUser} user={profileUser} />
        </div>
    )
}

export default SideBar;
