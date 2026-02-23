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
import NavComponent from "../../Navigation/NavComponent";




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
                <NavComponent myBooksPage={false}/>
            </div>

        </div>



    )


}
export default BPHeader;