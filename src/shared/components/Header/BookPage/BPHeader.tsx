import { Box, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineShopping } from "react-icons/ai";
import { MdAccountCircle, MdEmail, MdExitToApp, MdLibraryBooks, MdOutlineAccountCircle, MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import styles from './BPHeader.module.scss'
import { IoBookOutline } from "react-icons/io5";
import type { FC } from "react";
import type { Genres } from "../../../types";
import { ColorChoiceFunc, ColorChoiceFuncForBookInfo } from "../../../helpers/colorChoice";
import { RiShoppingBag4Fill } from "react-icons/ri";




export const BPHeader: FC<{ title: string, author: string, genre: Genres }> = ({ title, author, genre }) => {
    const navigate = useNavigate();

    const auth = getAuth();

    const [user] = useAuthState(auth)
    const { logout } = useFirebaseAuth()

    return (

        <div className={styles.book_page_header}>
            <div className={styles.book_page_header_inner}>
                <div className={styles.header_first_block}>
                    <div style={{
                        padding: 5,
                        background: ColorChoiceFunc(genre),
                        borderRadius: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <IoBookOutline style={{ fontSize: 30, color: 'white' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                        <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.9)' }}>{title || 'Значения потеряны'}</p>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{author}</p>
                    </div>
                </div>
                <div className={styles.header_second_block}>
                    <div onClick={() => { navigate('/') }} className={styles.clickable_wrapper}>
                        <RiShoppingBag4Fill style={{ fontSize: 25, color: 'rgba(255,255,255,0.9)' }} />
                        <p style={{ color: 'white', opacity: 0.9, fontSize: 13 }}>Библиотека</p>
                    </div>
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
            </div>

        </div>



    )


}
export default BPHeader;