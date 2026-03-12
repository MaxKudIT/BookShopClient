import { IoBookOutline } from 'react-icons/io5';
import styles from './Sidebar.module.scss'
import { MdOutlineGridView } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdExitToApp } from "react-icons/md";
import { RxExit } from "react-icons/rx";
const SideBar = () => {
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
                    <IoBookOutline style={{ fontSize: 18, color: '#161A22FF' }} />
                </div>
                <p className={styles.title}>MaxLib</p>
            </div>
            <div style={{ marginBottom: 65 }}>
                <div className={styles.title_menu_container}>
                    <p className={styles.title_menu}>МЕНЮ НАВИГАЦИИ</p>
                </div>

                <div style={{ width: 250, display: 'flex', flexDirection: 'column', rowGap: 17 }}>
                    <button className={styles.button_sidebar_unactive}>
                        <MdOutlineGridView style={{ fontSize: 15 }} />
                        <p>Обзор</p>
                    </button>

                    <button className={styles.button_sidebar_active}>
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
                <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
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
                    }}>M</div>
                    <p style={{ color: '#F9FAFBFF', fontSize: 14 }}>Макс Кудинов</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', columnGap: 25}}>
                    <button className={styles.button_settings}>
                        <IoSettingsOutline style={{ fontSize: 16 }} />
                        <p>Настройки</p>
                    </button>
                    <RxExit style={{ fontSize: 20, color: '#BAC1CEFF', cursor: 'pointer' }}/>
                </div>

            </div>
        </div>
    )
}

export default SideBar;