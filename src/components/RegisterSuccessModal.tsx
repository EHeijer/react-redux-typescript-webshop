import { Avatar, Button, Dialog, DialogContent, DialogTitle, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useBetween } from "use-between";
import { IRootState } from "../reducers";
import { signUp } from "../reducers/auth.reducer";
import { useShareableState } from "./utils/shareable-state";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';


const useStyles = makeStyles((theme: Theme) => {
    return {
        paper: {
            backgroundColor: 'rgb(184 184 184 / 92%)',
            color: 'white',
        },
        dialogContent: {
            width: 400,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        iconWrapper: {
            display: 'flex',
            justifyContent: 'center'
        },
        personIcon: {
            fontSize: 80
        },
        button: {
            width: 110,
            margin: '20px auto 0 auto',
            color: 'white',
            border: 'solid white 2px',
            borderRadius: 30,
            background: 'transparent',
            '&:hover':{
                color: theme.palette.secondary.dark,
                background: 'inherit',
            }
        }
        
    }
})


export interface IRegisterSuccessModalProps extends StateProps{
}

const RegisterModal = (props: IRegisterSuccessModalProps) => {
    const { successMessage, successModalOpen } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const { loginModalOpen, setLoginModalOpen } = useBetween(useShareableState);

    const handleClose = () => {
        setOpen(false)
    }

    const handleToLogin = () => {
        handleClose();
        setLoginModalOpen(true);
    }

    useEffect(() => {
        if(successMessage) { 
            setOpen(true);
        }
    }, [successMessage])

    return (
        <Dialog classes={{paper: classes.paper}} open={open} onClose={handleClose}>
            <DialogContent className={classes.dialogContent}>
                <div className={classes.iconWrapper}>
                    <PersonOutlineIcon classes={{root: classes.personIcon}}/>
                </div>
                <div>
                    <Typography variant="h6" align="center">{successMessage}</Typography>
                </div>
                <Button
                    onClick={handleToLogin} 
                    variant="outlined"
                    className={classes.button}
                >To Login?</Button>
            </DialogContent>
        </Dialog>
    )
}

const mapStateToProps = ({ auth }: IRootState) => ({
    successMessage: auth.successMessage,
    successModalOpen: auth.successModalOpen
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        register: (username: string, email: string, password: string, confirmPassword: string) => {
            dispatch(signUp(username, email, password, confirmPassword));
        }
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);