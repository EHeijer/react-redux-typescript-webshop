import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {

        }
    }
    
})


function Statistics() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            Statistics
            
        </div>
    )
}

export default Statistics;