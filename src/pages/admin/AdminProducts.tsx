import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {

        }
    }
    
})


function AdminProducts() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            Products
            
        </div>
    )
}

export default AdminProducts;