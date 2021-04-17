import { makeStyles } from '@material-ui/core';
import React from 'react'
import DrawerComponent from './DrawerComponent';
import Footer from './Footer';

import Navbar from './Navbar';

const drawerWidth = 240
const appBarHeight = 80
const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
            background: '#f4f4f4'
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
        }
    }
})

interface Props extends React.HTMLAttributes<Element> {
    // add any custom props, but don't have to specify `children`
}
  

export default function AppLayout({ children}: Props) {

    const classes = useStyles();
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
