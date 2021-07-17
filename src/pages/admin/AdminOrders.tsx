import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {

        }
    }
    
})


function AdminOrders() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            Orders
            
        </div>
    )
}

export default AdminOrders;