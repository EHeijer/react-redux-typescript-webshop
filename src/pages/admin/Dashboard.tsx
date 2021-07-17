import { List, ListItem, makeStyles, Theme, Typography } from "@material-ui/core";
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import OrderTable from "../../components/OrderTable";

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            padding: '30px 30px'
        },
        title: {
            color: 'white',
            
        },
        statistics: {
            display: 'flex',
            width: '90%',
            margin: 'auto',
            justifyContent: 'space-evenly',
            padding: '50px 0'
        },
        listItem: {
            display: 'flex',
            flexDirection: 'column',
            padding: '10px 20px',
            alignItems: 'flex-start',
            color: 'white',
            width: 400
        },
        listItemOrderStatus: {
            display: 'flex',
            flexDirection: 'column',
            padding: '10px 20px',
            alignItems: 'flex-start',
            color: 'white',
            width: 400
        },
        icon: {
            position: 'absolute',
            left: -30,
            top: 25,
            width: 40,
            height: 40,
            color: theme.palette.primary.light
        },
        price: {
            color: '#48f16f'
        },
        status: {
            display: 'flex',
            width: '50%',
            justifyContent: 'space-between'
        },
        statusName: {

        },
        statusInfo: {
            color: '#48f16f'
        },
        ordersToHandle: {
            display:'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: '50px 0'
        },
        barContainer: {
            background: theme.palette.primary.dark,
            width: '85%',
            height: 20,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center'
        },
        bar: {
            background: '#48f16f',
            width: '90%',
            height: 20,
            borderRadius: 10,
            padding: '0 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
        }
    }
    
})


function Dashboard() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h4">Dashboard</Typography>
            <List className={classes.statistics}>
                <ListItem className={classes.listItem}>
                    <MonetizationOnOutlinedIcon className={classes.icon}/>
                    <Typography variant="h6">Sales income latest month</Typography>
                    <Typography variant="h6" className={classes.price}>$256,000</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <AssignmentTurnedInRoundedIcon className={classes.icon}/>
                    <Typography variant="h6">Purchased orders latest month</Typography>
                    <Typography variant="h6" className={classes.price}>15</Typography>
                </ListItem>
                <ListItem className={classes.listItemOrderStatus}>
                    <EqualizerOutlinedIcon className={classes.icon}/>
                    <Typography variant="h6">Order Status</Typography>
                    <div className={classes.status}>
                        <Typography variant="body1" className={classes.statusName}>In Progress</Typography>
                        <Typography variant="body1" className={classes.statusInfo}>5</Typography>
                    </div>
                    <div className={classes.status}>
                        <Typography variant="body1" className={classes.statusName}>Completed</Typography>
                        <Typography variant="body1" className={classes.statusInfo}>10</Typography>
                    </div>
                    
                </ListItem>
                
            </List>
            <div className={classes.ordersToHandle}>
                <Typography className={classes.title} variant="h6">Handled Orders</Typography>
                <div className={classes.barContainer}>
                    <span className={classes.bar}>
                        <Typography variant="body1">90% Completed</Typography>
                    </span>
                </div>
            </div>
            {/* <OrderTable /> */}
        </div>
    )
}

export default Dashboard;