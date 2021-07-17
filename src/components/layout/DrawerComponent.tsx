import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { Avatar, Divider, List, ListItem, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import { menuItems } from './MenuItems';
import { useHistory, useLocation } from 'react-router-dom'
import Link from '@material-ui/core/Link';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) => {
    return {
        drawer: {
            width: drawerWidth,
            
            height: '100vh'
        },
        drawerPaper: {
            paddingTop: '70px',
            background: theme.palette.primary.dark,
            width: drawerWidth,
            color: 'white',
            textAlign: 'center'
        },
        avatar: {
            margin: 'auto',
            width: theme.spacing(7),
            height: theme.spacing(7)
        },
        title: {
            padding: 0,
            color: theme.palette.primary.contrastText,
            fontSize: 30,
            fontFamily: 'Dosis',
            fontWeight: 600,
            '&:hover': {
                color: theme.palette.secondary.dark
            },
        },
        listItem: {
            '&:hover': {
                color: theme.palette.secondary.dark
            },
        },
        active: {
            background: theme.palette.primary.main,
            '&:hover': {
                color: theme.palette.secondary.dark,
                background: theme.palette.primary.main
            },
        },
        itemText: {
            textAlign: 'center',
        },
        primaryText: {
            fontWeight: 600,
            fontSize: 22
        },
        hr: {
            background: theme.palette.primary.main,
            width: '40%',
            margin: " 30px auto 0 auto"
        },
        list: {
            paddingTop: 30
        }
    }
})

export default function DrawerComponent() {
    const classes = useStyles();
    const listOfMenuItems = menuItems;
    const history = useHistory();
    const location = useLocation()
    return (
        
        <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper}}
            
        >
            <div>
                <Avatar src="/barbell-svgrepo-com.svg" className={classes.avatar}/>
                <Link href="/" underline="none" color="primary" className={classes.title}>Supplement Store</Link>
            </div>
            <Divider variant="middle" className={classes.hr}/>
            <List className={classes.list}>
                {listOfMenuItems.map(item => (
                    <ListItem
                        button 
                        key={item.text}
                        onClick={() => history.push(item.path)}
                        className={location.pathname === item.path ? classes.active : classes.listItem}
                    >
                        <ListItemText className={classes.itemText} classes={{ primary: classes.primaryText}} primary={item.text}></ListItemText>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
