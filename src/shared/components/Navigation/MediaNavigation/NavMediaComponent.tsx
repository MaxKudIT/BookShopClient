import { Tooltip, Box, ListItem, ListItemIcon, ListItemText, Typography, Divider, ListItemButton, IconButton } from "@mui/material"
import { IoIosHeart, IoMdCart, IoIosHome } from "react-icons/io"
import { MdEmail, MdPerson, MdLibraryBooks, MdExitToApp, MdAccountCircle } from "react-icons/md"
import { RiShoppingBag4Fill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { getAuth } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import styles from './NavMediaComponent.module.scss'
import type { FC, JSX } from "react"
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth"




export type PageType = 'bookinfo' | 'cart' | 'favs'


const NavMediaComponent: FC<{ pageType: PageType }> = ({ pageType }) => {

    const { logout } = useFirebaseAuth()
    const navigate = useNavigate();



    const auth = getAuth();

    const [user] = useAuthState(auth)


    const CalculateButtonByType = (pageType: PageType): JSX.Element => {
        if (pageType === 'bookinfo') {
            return <>
                <button onClick={() => { navigate('/favs') }} className={styles.clickable_wrapper}>
                    <IoIosHeart style={{ fontSize: 25, color: 'rgba(255,255,255,0.9)' }} />
                    <p style={{ color: 'white', opacity: 0.9, fontSize: 13 }}>Избранное</p>
                </button>
                <button onClick={() => { navigate('/cart') }} className={styles.clickable_wrapper}>
                    <IoMdCart style={{ fontSize: 25, color: 'rgba(255,255,255,0.9)' }} />
                    <p style={{ color: 'white', opacity: 0.9, fontSize: 13 }}>Корзина</p>
                </button>
            </>
        }

        if (pageType === 'cart') {
            return <button onClick={() => { navigate('/favs') }} className={styles.clickable_wrapper}>
                <IoIosHeart style={{ fontSize: 25, color: 'rgba(255,255,255,0.9)' }} />
                <p style={{ color: 'white', opacity: 0.9, fontSize: 13 }}>Избранное</p>
            </button>
        }

        if (pageType === 'favs') {
            return  <button onClick={() => { navigate('/cart') }} className={styles.clickable_wrapper}>
                <IoMdCart style={{ fontSize: 25, color: 'rgba(255,255,255,0.9)' }} />
                <p style={{ color: 'white', opacity: 0.9, fontSize: 13 }}>Корзина</p>
            </button>
        }
        return <></>
    }



    return (
        <div style={{ position: 'fixed', right: 40, top: 20, display: 'flex', alignItems: 'center' }}>
          

            {CalculateButtonByType(pageType)}
            <button onClick={() => { navigate('/mybooks') }} className={styles.clickable_wrapper}>
                <IoIosHome style={{ fontSize: 25, color: 'rgba(255,255,255,0.9)' }} />
                <p style={{ color: 'white', opacity: 0.9, fontSize: 13 }}>Домашняя</p>
            </button>





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


                        <ListItem sx={{ pl: 1.5, pr: 1.5 }} disablePadding>
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


                        <ListItem sx={{ pl: 1.5, pr: 1.5 }} disablePadding>
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
                        {true && (
                            <>
                                <ListItemButton

                                    onClick={() => { navigate('/mybooks') }}
                                    sx={{

                                        pt: 0,
                                        pb: 0,
                                        pl: 1.5,
                                        pr: 1.5,
                                        height: 45,
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

                            </>

                        )}




                        <ListItemButton

                            onClick={() => { logout(); navigate('/auth') }}
                            sx={{

                                pb: 0,
                                pt: 0,
                                pl: 1.5,
                                pr: 1.5,
                                height: 45,
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
                    <div className={styles.clickable_wrapper} style={{ cursor: 'default' }}>
                        <MdAccountCircle
                            style={{
                                fontSize: 27,
                                color: 'rgba(255,255,255,0.9)',
                                borderRadius: 10,

                            }}
                        />
                        <p style={{ color: 'white', opacity: 0.9, fontSize: 13 }}>Профиль</p>
                    </div>

                </IconButton>
            </Tooltip>
        </div>
    )
}

export default NavMediaComponent;