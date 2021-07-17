import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from "@material-ui/core";
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import {GiClothes} from 'react-icons/gi';
import {FaUserFriends, FaRegChartBar} from 'react-icons/fa'
import { useHistory, useLocation } from "react-router";
const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            width: 120,
            minHeight: '100vh',
            height: '100%',
            background: theme.palette.primary.dark
        },
        logoWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100
        },
        logo: {
            width: 70,
            height: 70,
        },
        divider: {
            background: theme.palette.primary.light,
        },
        iconWrapper: {
            display: 'flex',
            justifyContent: 'center'
        },
        active: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#48f16f',
            padding: '30px 20px',
            borderRight: '7px solid #48f16f'
            // '&:hover': {
            //     color: theme.palette.secondary.dark,
            //     background: theme.palette.primary.main
            // },
        },
        activeIcon: {
            width: 40,
            height: 40,
            color: '#48f16f'
        },
        listItem: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#f6f8f9',
            padding: '30px 20px'
        },
        icon: {
            width: 40,
            height: 40,
            color: '#f1f4f6'
        }
        
    }
})

export default function AdminDashboard() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    return (
        <div className={classes.root}>
            <div className={classes.logoWrapper}>
                <Avatar src="/barbell-svgrepo-com.svg" className={classes.logo}/>
            </div>
            
            <List>
                <ListItem 
                    onClick={() => history.push('/account')} 
                    className={location.pathname === '/account' ? classes.active : classes.listItem} 
                    button
                >
                    <ListItemIcon className={classes.iconWrapper}>
                        <DashboardRoundedIcon className={location.pathname === '/account' ? classes.activeIcon : classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <ListItem 
                    onClick={() => history.push('/account/products')} 
                    className={location.pathname === '/account/products' ? classes.active : classes.listItem}  
                    button
                >
                    <ListItemIcon className={classes.iconWrapper}>
                        <GiClothes className={location.pathname === '/account/products' ? classes.activeIcon : classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary="Products"/>
                </ListItem>
                <ListItem 
                    onClick={() => history.push('/account/orders')} 
                    className={location.pathname === '/account/orders' ? classes.active : classes.listItem}   
                    button
                >
                    <ListItemIcon className={classes.iconWrapper}>
                        <AssignmentTurnedInRoundedIcon className={location.pathname === '/account/orders' ? classes.activeIcon : classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary="Orders"/>
                </ListItem>
                <ListItem 
                    onClick={() => history.push('/account/users')} 
                    className={location.pathname === '/account/users' ? classes.active : classes.listItem}   
                    button
                >
                    <ListItemIcon className={classes.iconWrapper}>
                        <FaUserFriends className={location.pathname === '/account/users' ? classes.activeIcon : classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary="Users"/>
                </ListItem>
                <ListItem 
                    onClick={() => history.push('/account/statistics')} 
                    className={location.pathname === '/account/statistics' ? classes.active : classes.listItem}   
                    button
                >
                    <ListItemIcon className={classes.iconWrapper}>
                        <FaRegChartBar className={location.pathname === '/account/statistics' ? classes.activeIcon : classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary="Statistics"/>
                </ListItem>
            </List>
        </div>
    )
}