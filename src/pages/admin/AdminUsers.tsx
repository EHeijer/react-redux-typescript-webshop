import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {

        }
    }
    
})


function AdminUsers() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            Users
            
        </div>
    )
}

export default AdminUsers;