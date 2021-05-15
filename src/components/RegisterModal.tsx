import { Button, Dialog, DialogContent, DialogTitle, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import styled from "styled-components";
import { useBetween } from "use-between";
import { IRootState } from "../reducers";
import { useShareableState } from "./utils/shareable-state";


const useStyles = makeStyles((theme: Theme) => {
    return {
        registerModal: {

        },
        dialogContent: {
            width: 340,
            height: 400
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        check: {
            color: 'white'
        },
        checked: {
            color: 'white!important'
        },
        submitButton: {
            width: 110,
            margin: '30px auto 0 auto',
            color: 'white',
            border: 'solid white 2px',
            borderRadius: 30,
            background: 'transparent',
            '&:hover':{
                color: theme.palette.secondary.dark,
                background: 'inherit',
            }
        },
        paper: {
            backgroundColor: 'rgb(184 184 184 / 92%)',
            color: 'white',
            
        },
        bottomContainer: {
            padding: '15px 0'
        }       
        
    }
})

const StyledTextField = styled(TextField)`
    label {
        color: white;
        font-size: 16px;
    }
    label.Mui-focused {
        color: white;
    }
    .MuiInputBase-root {
        color: white;    
    }
    .MuiInputBase-input {
        margin-bottom: 3px;
    }
    .MuiInput-underline:after {
      border-color: white;
    }
    .MuiInput-underline:before {
        border-color: white;
    }
    .MuiInput-underline:hover:not(.Mui-disabled):before {
        border-color: white;
    }

` as typeof TextField;

export interface IRegisterModalProps extends StateProps{
}

type FormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterModal = (props: IRegisterModalProps) => {
    const classes = useStyles();
    const { registerModalOpen, setRegisterModalOpen } = useBetween(useShareableState);
    const { register, handleSubmit } = useForm<FormValues>();

    const handleClose = () => {
        setRegisterModalOpen(false);
    }

    const registerUser = (data: any) => {
        console.log(data);
    }

    return (
        <Dialog classes={{paper: classes.paper}} open={registerModalOpen} onClose={handleClose} className={classes.registerModal}>
            <DialogTitle>
                <Typography variant="h4" align="center">Sign Up</Typography>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <form className={classes.form} onSubmit={handleSubmit(registerUser)}>
                    <StyledTextField
                        label="USERNAME"
                        required
                        fullWidth
                        id="username"
                        autoFocus
                        margin="normal"
                        {...register('username')}
                    />
                    <StyledTextField
                        label="E-MAIL"
                        required
                        fullWidth
                        id="email"
                        type="email"
                        autoFocus
                        margin="normal"
                        {...register('email')}
                    />
                    <StyledTextField
                        label="PASSWORD"
                        required
                        fullWidth
                        type="password"
                        id="password"
                        autoFocus
                        margin="normal"
                        {...register('password')}
                    />
                    <StyledTextField
                        label="CONFIRM PASSWORD"
                        required
                        fullWidth
                        type="password"
                        id="confirmPassword"
                        autoFocus
                        margin="normal"
                        {...register('confirmPassword')}
                    />
                    <Button 
                        type="submit"
                        variant="outlined"
                        className={classes.submitButton}
                    >Sign Up</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

const mapStateToProps = ({  }: IRootState) => ({

})

const mapDispatchToProps = (dispatch: any) => {
    return {
        
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);