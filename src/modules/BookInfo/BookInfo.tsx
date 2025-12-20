import React from "react";
import { BookInfo } from "../../features/BookInfo/BookInfo";
import styles from './BookInfo.module.scss'
import { Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import { MdEmail, MdExitToApp, MdLibraryBooks, MdOutlineAccountCircle, MdPerson } from "react-icons/md";
import { PiBooks } from "react-icons/pi";
const BookInfoModule = () =>
  {
    return (
      <div className={styles.book_info_page_style}>
           <div style={{position: 'fixed', right: 40, top: 20, display: 'flex', alignItems: 'center', columnGap: 15, zIndex: 2}}>
                <PiBooks style={{ fontSize: 35, color: 'white' }} />
                 <Tooltip
                          title={
                            <Box sx={{ p: 1, minWidth: 250 }}>
                          
                              <List dense disablePadding>
                                <ListItem disablePadding sx={{ mb: 1 }}>
                                  <ListItemIcon sx={{ minWidth: 36 }}>
                                    <MdEmail fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography variant="body2" color="text.secondary">
                                        Email
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                        Maks@gmail.com
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                
                
                                <ListItem  disablePadding sx={{ mb: 2 }}>
                                  <ListItemIcon sx={{ minWidth: 36 }}>
                                    <MdPerson fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography variant="body2" color="text.secondary">
                                        Логин
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                        test11
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                
                                <Divider sx={{ my: 1 }} />
                
                                <ListItem 
                                  disablePadding
                                 
                                  onClick={() => console.log('Переход к моим книгам')}
                                  sx={{
                                    borderRadius: 1,
                                    '&:hover': { backgroundColor: 'action.hover' }
                                  }}
                                >
                                  <ListItemIcon sx={{ minWidth: 36 }}>
                                    <MdLibraryBooks fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary="Мои книги"
                                    secondary={`5 книг`}
                                  />
                                </ListItem>
                
                        
                                <ListItem 
                                  disablePadding
                                
                                  onClick={() => console.log('Выход')}
                                  sx={{
                                    borderRadius: 1,
                                    mt: 1,
                                    '&:hover': { backgroundColor: 'action.hover' }
                                  }}
                                >
                                  <ListItemIcon sx={{ minWidth: 36 }}>
                                    <MdExitToApp fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary="Выйти"
                                    primaryTypographyProps={{
                                      color: 'error.main'
                                    }}
                                  />
                                </ListItem>
                              </List>
                            </Box>
                          }
                          placement="bottom-end"
                          arrow
                          componentsProps={{
                            tooltip: {
                              sx: {
                                backgroundColor: 'white',
                                color: 'text.primary',
                                boxShadow: 3,
                                '& .MuiTooltip-arrow': {
                                  color: 'white',
                                }
                              }
                            }
                          }}
                        >
                          <IconButton sx={{ p: 0 }}>
                            <MdOutlineAccountCircle 
                              style={{ 
                                fontSize: 32, 
                                color: 'white', 
                                borderRadius: 10,
                                cursor: 'pointer'
                              }} 
                            />
                          </IconButton>
                        </Tooltip>
           </div>

        <BookInfo/>
         <div style={{
        width: '100vw',
        height: '100px',
        background: 'rgba(35, 6, 88, 0.5)',
            position: 'absolute',
        zIndex: -1,
        bottom: 0
      }}></div>
      </div>
    )
  }

  export {BookInfoModule};