import { Button, makeStyles, Theme, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { IRootState } from "../reducers";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useHistory } from "react-router";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            background: '#f4f4f4',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        },
        iconWrapper: {
            display: 'flex',
            justifyContent: 'center',
            padding: '100px 20px 30px 20px'
        },
        error: {
            width: 300,
            height: 300
        },
        heading: {
          marginBottom: 35  
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            height: '20vh'
        },
        flex: {
            flexGrow: 1
            
        },
        errorDetail: {
            color: theme.palette.primary.main
        },
        btnWrapper: {
            display: 'flex',
            justifyContent: 'center',
            
        },
        backBtn: {
            width: 150,
            height: 60,
            background: theme.palette.primary.main
        },
        backIcon: {
            color: 'white'
        },
        btnText: {
            fontSize: 24,
            marginLeft: 5,
            color: 'white'
        }
        
    }
    
})

export interface IErrorPageProp extends StateProps{
    
}

function ErrorPage(props: IErrorPageProp) {
    const classes = useStyles();
    const {errorMessage} = props;
    const history = useHistory();
    return (
        <div className={classes.root}>
            <div className={classes.iconWrapper}>
                <ErrorOutlineIcon className={classes.error} color="error"/>
            </div>
            <Typography 
                align="center" 
                color="primary" 
                variant="h1"
                className={classes.heading}
            >An error has occurred!
            </Typography>
            {errorMessage !== null ? 
                <Typography className={classes.errorDetail} align="center" variant="h4">{errorMessage}</Typography>
                :
                <Typography className={classes.errorDetail} align="center" variant="h4">Error detail not sent by server.</Typography>
            }
            <div className={classes.wrapper}>
            <div className={classes.flex}></div>
            <div className={classes.btnWrapper}>
                <Button 
                    className={classes.backBtn} 
                    variant="contained"
                    onClick={() => history.push('/')}
                >
                    <KeyboardBackspaceIcon className={classes.backIcon}/>
                    <Typography className={classes.btnText} variant="h6">To Home</Typography>
                </Button>
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ order }: IRootState) => ({
    errorMessage: order.errorMessage
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);