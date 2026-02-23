import React from "react";
import BookInfo from "../../features/BookInfo/BookInfo";
import styles from './CartM.module.scss'
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import { MdAccountCircle, MdEmail, MdExitToApp, MdLibraryBooks, MdOutlineAccountCircle, MdPerson } from "react-icons/md";
import { PiBooks } from "react-icons/pi";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFirebaseAuth } from "../../shared/hooks/useFirebaseAuth";
import { useNavigate } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { RiShoppingBag4Fill } from "react-icons/ri";
import CartF from "../../features/Cart/CartF";
import NavComponent from "../../shared/components/Navigation/NavComponent";
import NavMediaComponent from "../../shared/components/Navigation/MediaNavigation/NavMediaComponent";



const CartM = () => {


  const navigate = useNavigate()
  const auth = getAuth();

  const [user] = useAuthState(auth)
  const { logout } = useFirebaseAuth()

  return (
    <div className={styles.book_info_page_style}>
      <NavMediaComponent pageType="cart"/>

      <CartF/>
      <div style={{
        width: '100vw',
        height: '100px',
        background: 'rgba(170, 122, 202, 0.5)',
        position: 'absolute',
        zIndex: -1,
        bottom: 0
      }}></div>
    </div>
  )
}

export { CartM };