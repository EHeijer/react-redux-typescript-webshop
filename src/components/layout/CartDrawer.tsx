import { Divider, Drawer, IconButton, List, makeStyles, Theme, useTheme } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { useState } from 'react'
import { useBetween } from 'use-between';

const drawerWidth = 350;

const useStyles = makeStyles((theme: Theme) => {
    return {
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0 , 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start',
        },
    }
})

export const useShareableState = () => {
    const [open, setOpen] = useState(false);
    return {
        open,
        setOpen
    }
}

export default function CartDrawer({handleDrawerOpen}:any) {
    const classes = useStyles();
    const theme = useTheme();
    const { open, setOpen} = useBetween(useShareableState);
    
    const handleDrawerClose = () => {
        setOpen(false);
        console.log(open);
    }
    return (
        <Drawer 
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}    
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>

                </List>
        </Drawer>
    )
}
