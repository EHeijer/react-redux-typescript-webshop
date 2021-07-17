import { Button, Dialog, DialogContent, DialogTitle, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import styled from "styled-components";
import { useBetween } from "use-between";
import { IRootState } from "../reducers";
import { signUp } from "../reducers/auth.reducer";
import RegisterSuccessModal from "./RegisterSuccessModal";
import { useShareableState } from "./utils/shareable-state";


const useStyles = makeStyles((theme: Theme) => {
    return {
        registerModal: {

        },
        dialogContent: {
            width: 350,
            height: 430
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
        },
        
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
    register: any
}

type FormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterModal = (props: IRegisterModalProps) => {
    const { successMessage, errorMessage, registerSuccess } = props;
    const classes = useStyles();
    const { registerModalOpen, setRegisterModalOpen } = useBetween(useShareableState);
    const { register, handleSubmit, reset, formState: {errors}, clearErrors } = useForm<FormValues>();
    const [hideMessage, setHideMessage] = useState(false);

    const handleClose = () => {
        setRegisterModalOpen(false);
        setHideMessage(true)
        reset({})
    }

    const registerUser = (data: FormValues, e: any) => {
        e.preventDefault()
        props.register(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value);
        reset({})
        
    }

    const onchange = () => {
        setHideMessage(true)
    }

    useEffect(() => {
        if(successMessage) {
            setHideMessage(true);
            setRegisterModalOpen(false);
        }
    }, [successMessage])

    useEffect(() => {
        if(errorMessage) {
            setHideMessage(false);
        }
    },[errorMessage])

    return (
        <div>
            <Dialog classes={{paper: classes.paper}} open={registerModalOpen} onClose={handleClose} className={classes.registerModal}>
                <DialogTitle disableTypography>
                    <Typography variant="h4" align="center">Sign Up</Typography>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <form className={classes.form} onSubmit={handleSubmit(registerUser)} onChange={onchange}>
                        <StyledTextField
                            label="USERNAME"
                            required
                            fullWidth
                            id="username"
                            autoFocus
                            margin="normal"
                            aria-invalid={errors.username ? "true" : "false"}
                            {...register('username',{
                                minLength: 3
                            })}
                        />
                        {errors.username && errors.username.type === "minLength" && (
                            <Typography variant="body2" align="center" color="error">Username should be at least 3 characters</Typography>
                        )}
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
                            aria-invalid={errors.password ? "true" : "false"}
                            {...register('password', {
                                minLength: 6
                            })}
                        />
                        {errors.password && errors.password.type === "minLength" && (
                            <Typography variant="body2" align="center" color="error">Password should be at least 6 characters</Typography>
                        )}
                        <StyledTextField
                            label="CONFIRM PASSWORD"
                            required
                            fullWidth
                            type="password"
                            id="confirmPassword"
                            autoFocus
                            margin="normal"
                            aria-invalid={errors.confirmPassword ? "true" : "false"}
                            {...register('confirmPassword', {
                                minLength: 6
                            })}
                        />
                        {errors.confirmPassword && errors.confirmPassword.type === "minLength" && (
                            <Typography variant="body2" align="center" color="error">Confirm password should be at least 6 characters</Typography>
                        )}
                        {errorMessage && errorMessage !== null ? 
                            <Typography style={{display: hideMessage ? 'none' : 'block'}} variant="body2" align="center" color="error">{errorMessage}</Typography>
                            : null                    
                        }
                        <Button 
                            type="submit" 
                            variant="outlined"
                            className={classes.submitButton}
                        >Sign Up</Button>
                    </form>
                </DialogContent>
            </Dialog>
            {successMessage && successMessage !== null ? 
                <RegisterSuccessModal />
                : null
            }
            
        </div>
    )
}

const mapStateToProps = ({ auth }: IRootState) => ({
    successMessage: auth.successMessage,
    errorMessage: auth.registerErrorMessage,
    registerSuccess: auth.registerSuccess
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