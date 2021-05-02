import { AppBar, Badge, fade, IconButton, InputBase, makeStyles, Theme, Toolbar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartDrawer, { useShareableState } from './CartDrawer';
import { useState } from 'react';
import { useBetween } from 'use-between';


const drawerWidth = 300;
const appBarHeight = 80
const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            width: 0,
        },
        appbar: {
            background: 'transparent',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: "0.5rem",
            height: appBarHeight
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            border: `solid 1px ${fade(theme.palette.common.black, 0.20)}`,
            backgroundColor: fade(theme.palette.common.white, 0.70),
            // '&:hover': {
            //     border: "solid 1px #515151"
            // },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        icon: {
            color: theme.palette.primary.dark,
        },
        focus: {
            boxShadow: `${theme.palette.primary.main} 0 0 0.5rem`,
            borderRadius: theme.shape.borderRadius,
        },
        inputRoot: {
            color: theme.palette.primary.dark,
        },
        inputInput: {
            padding: theme.spacing(1.5, 1.5, 1.5, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        grow: {
            flexGrow: 1,
        },
        accountAndCart: {
            color: theme.palette.primary.dark
        }
    }
}) 
 
export default function Navbar() {
    const classes = useStyles();
    const { open, setOpen } = useBetween(useShareableState);

    const handleDrawerOpen = () => {
        setOpen(true);
        console.log(open)
    }
    return (
        <div className={classes.root}>
        <AppBar className={classes.appbar} elevation={0}>
            <Toolbar>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon className={classes.icon}/>
                    </div>
                    <InputBase 
                        autoFocus={true}
                        placeholder="Search..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                            focused: classes.focus
                        }}
                        inputProps={{ 'aria-label': 'search'}}
                    />
                </div>
                <div className={classes.grow}></div>
                <div>
                    <IconButton
                        aria-haspopup="true"
                    >
                        <PersonOutlineIcon classes={{root: classes.accountAndCart}} fontSize="large"/>
                    </IconButton>
                    <IconButton onClick={handleDrawerOpen}>
                        <Badge
                            badgeContent={2} 
                            color="error"
                        >
                            <ShoppingCartIcon classes={{root: classes.accountAndCart}} fontSize="large" />
                        </Badge>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        <CartDrawer open={open} handleDrawerOpen={handleDrawerOpen}/>
        </div>
    )
}
