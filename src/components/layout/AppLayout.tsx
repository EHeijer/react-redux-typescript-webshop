import { makeStyles } from '@material-ui/core';
import { LocalGasStation } from '@material-ui/icons';
import React from 'react'
import { useLocation } from 'react-router';
import ErrorPage from '../../pages/ErrorPage';
import OrderConfirm from '../../pages/OrderConfirm';
import DrawerComponent from './DrawerComponent';
import Footer from './Footer';
import Account from '../../routes';
import Navbar from './Navbar';
import { GetAuthorities, GetCurrentUser } from '../../shared/autentication';
import { RoleType } from '../../model/role.model';
import AdminPage from '../../pages/admin/AdminPage';
import EmployeePage from '../../pages/EmployeePage';
import CustomerPage from '../../pages/CustomerPage';
import AdminNavbar from './AdminNavbar';
import AdminDashboard from './AdminDashboard';

const drawerWidth = 240
const sideboardWidth = 120
const appBarHeight = 80
const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
            background: '#f4f4f4'
        },
        accountRoot: {
            background: theme.palette.primary.main,
        },
        flex: {
            display: 'flex',
            flexDirection: 'column',
            width: `calc(100% - ${drawerWidth}px)`,
            flexGrow: 1,
            
        },
        page: {
            minHeight: '90vh',
            paddingBottom: 30
        },
        sideAndPages: {
            display: 'flex',
            width: '100%'
        },
        accountPages: {
            width: `calc(100% - ${sideboardWidth}px)`,
            
        }
    }
})

interface Props extends React.HTMLAttributes<Element> {
    // add any custom props, but don't have to specify `children`
}
  

export default function AppLayout({ children}: Props) {
    const location = useLocation();
    const classes = useStyles();

    function RenderPage() {
        if(location.pathname === '/order-confirm'){
            return <OrderConfirm />
        } else if(location.pathname === '/error-page') {
            return <ErrorPage />
        } else if(location.pathname.startsWith('/account')) {
            return <Account/>
        } else {
            return <RootComponent />
        }
    }
    function Account() {
        const roles = GetAuthorities();
        const user = GetCurrentUser();
        
        if(user) {
            if(roles.includes(RoleType.ROLE_ADMIN)) {
                return <AdminComponent/>
            }else if(roles.includes(RoleType.ROLE_EMPLOYEE) && !roles.includes(RoleType.ROLE_ADMIN)){
                return <EmployeePage currentUser={user} />
            } else if(roles.includes(RoleType.ROLE_CUSTOMER) && !roles.includes(RoleType.ROLE_ADMIN) && !roles.includes(RoleType.ROLE_EMPLOYEE)) {
                return <CustomerPage currentUser={user} />
            }else {
                <ErrorPage />
            }
        }
        return <div>...Loading</div>
    }

    function AdminComponent() {
        return (
            <div className={classes.accountRoot}>
            <AdminNavbar />
            <div className={classes.sideAndPages}>
                <AdminDashboard />
                <div className={classes.accountPages}>{children}</div>
            </div>
        </div>
        )
    }

    function RootComponent() {
        return (
            <div className={classes.root}>
                <DrawerComponent />
                <Navbar />
                <div className={classes.flex}>
                    <div className={classes.page}> { children } </div>
                    <Footer />
                </div>
            </div>
        ) 
    }

    return (
        <div>
            <RenderPage />
        </div>
    )
}
