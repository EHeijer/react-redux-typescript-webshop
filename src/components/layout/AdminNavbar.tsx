import { AppBar, Avatar, Divider, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import Link from '@material-ui/core/Link';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const sidebarWidth = 120;
const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            position: 'absolute',
        },
        navbar: {
            width: `calc(100% - ${sidebarWidth}px)`,
            background: 'transparent'
        },
        toolbar: {
            height: 100
        },
        avatar: {
            width: 42,
            height: 42,
            marginTop: 7,
            background: theme.palette.primary.dark
        },
        title: {
            padding: 0,
            color: theme.palette.primary.contrastText,
            fontSize: 30,
            fontFamily: 'Dosis',
            fontWeight: 600,
            marginRight: 15,
            '&:hover': {
                color: theme.palette.secondary.dark
            },
        },
        grow: {
            flexGrow: 1,
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
        },
        username: {
            marginRight: 12,
            color: '#48f16f',
        },
        icon: {
            color: '#48f16f',
        },
        divider: {
            background: theme.palette.primary.light,
        }
    }
})

export default function AdminNavbar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.navbar} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.grow}></div>
                    <div className={classes.userInfo}>
                        <Typography className={classes.username} variant="h5">Admin</Typography>
                        <Avatar className={classes.avatar}>
                            <PersonOutlineIcon className={classes.icon} fontSize="large" />
                        </Avatar>
                        <KeyboardArrowDownIcon className={classes.icon}/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
