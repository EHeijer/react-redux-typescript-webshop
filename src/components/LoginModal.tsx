import { Button, Card, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, makeStyles, Modal, TextField, Theme, Typography } from "@material-ui/core";
import { BaseSyntheticEvent, FormEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useBetween } from "use-between";
import { IRootState } from "../reducers";
import { useShareableState } from "./utils/shareable-state";
import {useForm, Controller} from 'react-hook-form';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import { getAllUsers, signIn } from "../reducers/auth.reducer";
import { calendarFormat } from "moment";
import { GetAuthorities, GetCurrentUser } from "../shared/autentication";
import { IJwtResponse } from "../model/jwt-response.model";
import { RoleType } from "../model/role.model";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) => {
    return {
        loginModal: {

        },
        dialogContent: {
            width: 300,
            height: 350
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
            margin: '40px auto 0 auto',
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
            padding: '15px 0',
        },
        link: {
            cursor: 'pointer'
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

export interface ILoginModalProps extends StateProps{
    handleLoginOpen: any,
    login: any,
}

type FormValues = {
    email: '';
    password: '';
    remember: false;
}

const LoginModal = (props: ILoginModalProps) => {
    const { loginSuccess, errorMessage, currentUser} = props;
    const [user, setUser] = useState({} as IJwtResponse)
    const classes = useStyles();
    const { loginModalOpen, setLoginModalOpen } = useBetween(useShareableState);
    const { registerModalOpen, setRegisterModalOpen } = useBetween(useShareableState);
    const {register, handleSubmit, control, reset } = useForm<FormValues>();
    const history = useHistory();
    const handleClose = () => {
        setLoginModalOpen(false);
    }

    const handleOpenRegisterModal = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
    }

    const loginUser = (data: FormValues, e: any) => {
        e.preventDefault()
        /*Normally I would use data(FormValues), but there's a bug when register a
        new user and then try to log in after that. data is empty*/
        props.login(e.target[0].value, e.target[1].value, e.target[2].value);
        reset({})
        
    }
    useEffect(() => {
        if(currentUser){
            setLoginModalOpen(false)
            setUser(currentUser);
            if(user.roles) {
                if(user.roles?.includes(RoleType.ROLE_ADMIN)){
                    history.push('/account')
                }
            }
        }
    }, [currentUser, user])

    return (
        <Dialog classes={{paper: classes.paper}} open={loginModalOpen} onClose={handleClose} className={classes.loginModal}>
            <DialogTitle disableTypography>
                <Typography variant="h4" align="center">Sign In</Typography>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <form className={classes.form} onSubmit={handleSubmit(loginUser)}>
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
                    <FormControlLabel 
                        control={
                            <Controller
                                name="remember"
                                control={control}
                                defaultValue={false}
                                render={({field}) => (
                                    <Checkbox 
                                        {...field}
                                        classes={{root: classes.check, colorSecondary: classes.checked}} />
                                )}
                            />
                        }
                        label="Remember me"
                    />
                    {errorMessage && errorMessage !== null ?
                        <Typography variant="body1" align="center" color="error">{errorMessage}</Typography>
                        : null
                    }
                    <Button 
                        type="submit"
                        variant="outlined"
                        className={classes.submitButton}
                    >Sign In</Button>
                    <Grid container className={classes.bottomContainer}>
                        <Grid item xs>
                            <Link color="inherit" className={classes.link}>
                                <Typography variant="body2">Forgot password?</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link className={classes.link} onClick={() => handleOpenRegisterModal()} color="inherit">
                                <Typography variant="body2">Don't have an account? Sign Up</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    )
}

const mapStateToProps = ({ auth }: IRootState) => ({
    errorMessage: auth.loginErrorMessage,
    currentUser: auth.loggedInUser,
    loginSuccess: auth.loginSuccess,
    isAuthenticated: auth.isAuthenticated,
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (email: string, password: string, remember: boolean) => dispatch(signIn(email, password, remember)),
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);