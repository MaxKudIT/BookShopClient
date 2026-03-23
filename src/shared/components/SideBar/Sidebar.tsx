
import styles from './Sidebar.module.scss'
import { MdOutlineGridView, MdOutlineLocalLibrary } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import type { FC } from 'react';
import { Tooltip } from '@mui/material';


export type SideBarType = {
    handleLogout: () => void,
    user: {
        login: string;
        email: string;
    }
}


const SideBar: FC<SideBarType> = ({ handleLogout, user }) => {




    return (
        <div className={styles.sidebar_main}>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 8,
                marginBottom: 35
            }}>
                <div style={{
                    background: '#6379E9FF',
                    borderRadius: 50,
                    padding: 7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <MdOutlineLocalLibrary style={{ color: '#161A22FF', fontSize: 18 }} />

                </div>
                <p className={styles.title}>MaxLib</p>
            </div>
            <div style={{ marginBottom: 65 }}>
                <div className={styles.title_menu_container}>
                    <p className={styles.title_menu}>МЕНЮ НАВИГАЦИИ</p>
                </div>

                <div style={{ width: 250, display: 'flex', flexDirection: 'column', rowGap: 17 }}>
                    <button className={styles.button_sidebar_active}>
                        <MdOutlineGridView style={{ fontSize: 15 }} />
                        <p>Обзор</p>
                    </button>

                    <button className={styles.button_sidebar_unactive}>
                        <FaRegCompass style={{ fontSize: 15 }} />
                        <p>Исследовать</p>
                    </button>

                    <button className={styles.button_sidebar_unactive}>
                        <GiBookshelf style={{ fontSize: 15 }} />
                        <p>Моя полка</p>
                    </button>
                </div>
            </div>

            <div>
                <div className={styles.title_menu_container}>
                    <p className={styles.title_menu}>ВАШИ ПОДБОРКИ</p>
                </div>
                <div style={{ width: 250, display: 'flex', flexDirection: 'column', rowGap: 20 }}>
                    <button className={styles.button_sidebar_unactive}>
                        <FaRegBookmark style={{ fontSize: 14 }} />
                        <p>Избранное</p>
                    </button>
                    <button className={styles.button_sidebar_unactive}>
                        <MdOutlineShoppingCart style={{ fontSize: 15 }} />
                        <p>Корзина</p>
                    </button>
                </div>
            </div>

            <div className={styles.footer_sidebar}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className={styles.button_profile}>
                        <div style={{
                            borderRadius: 50,
                            background: 'rgb(150, 10, 10)',
                            width: 35,
                            height: 35,
                            color: '#F9FAFBFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: 15
                        }}>{user.login[0]}</div>
                        <p style={{ color: '#F9FAFBFF', fontSize: 14, fontWeight: 500 }}>{user.login}</p>
                    </div>
                    <Tooltip slotProps={{
                        tooltip: {
                            sx: {
                              
                                color: '#F9FAFBFF',   
                                fontWeight: 500
                              
                            }
                        },
                     
                    }} title="Выйти из аккаунта" placement="top">
                        <RxExit onClick={handleLogout} className={styles.button_exit} />
                    </Tooltip>
                </div>

            </div>
        </div>
    )
}

export default SideBar;