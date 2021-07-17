import { Card, CardContent, Divider, ExtendButtonBase, IconButton, IconButtonTypeMap, InputBase, makeStyles, Theme, Typography } from "@material-ui/core";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';
import { IUser } from "../model/user.model";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "./utils/custom-hooks";
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../reducers/user.reducer";
import { IJwtResponse } from "../model/jwt-response.model";
import { IRootState } from "../reducers";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme: Theme) => {
    return {
        profileCard: {
            width: 350,
            height: 420,
            background: '#fafafa',
            border: `solid 3px ${theme.palette.primary.light}`
        },
        cardContent: {
            padding: 0,
            height: 420,
            display: 'flex',
            flexDirection: 'column',
        },
        inputRoot: {
            fontFamily: 'Dosis'
        },
        input: {
            fontSize: 22,
            width: 200,
            borderBottom: `solid 1px ${theme.palette.primary.light}`
        },
        focus: {

        },
        top: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 30,
            flexGrow: 1
        },
        iconWrapper: {
            border: `solid 3px ${theme.palette.primary.main}`,
            borderRadius: '50%',
            marginBottom: 10
        },
        profileIcon: {
            fontSize: 120,
        },
        usernameWrapper: {

        },
        username: {
            color: theme.palette.primary.main
        },
        info: {
            background: 'white'
        },
        mail: {
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            padding: 15,
            position: 'relative',
            height: 40
        },
        password: {
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            padding: 15,
            position: 'relative',
            height: 40
        },
        saveBtn: {
            position: 'absolute',
            right: 10,
            top: 11,
        },
        saveIcon: {
            fontSize: 30
        },
        editBtn: {
            position: 'absolute',
            right: 10,
            top: 11,
        },
        editIcon: {
            fontSize: 30
        },
        icon: {
            marginRight: 7
        }
    }
})

export interface IProfileCardProp  {
    user: IUser
}

type PasswordValues = {
    newPassword: string
}

type EmailValues = {
    newEmail: string
}

const ProfileCard = (props: IProfileCardProp) => {
    const classes = useStyles();
    const { user } = props;
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    useOnClickOutside(emailRef, () => showOrHideEmailInput());
    useOnClickOutside(passwordRef, () => showOrHidePasswordInput());
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState(user.email as string);
    const { register, handleSubmit, reset, formState: {errors} } = useForm<EmailValues>();
    const { 
        register: registerPassword, 
        handleSubmit: handleSubmitPassword, 
        reset: resetPassword, 
        formState: {errors: errorsPassword} } = useForm<PasswordValues>();

    const showOrHideEmailInput = () => {
        setEditEmail(!editEmail);
    }

    const showOrHidePasswordInput = () => {
        setEditPassword(!editPassword);
    }
    const handleEditEmail = (data: EmailValues, e: any) => {
        e.preventDefault()
        console.log(data)
        const userToUpdate: IUser = {
            ...user,
            email: data.newEmail,
        }
        const currentUser: IJwtResponse = JSON.parse(localStorage.getItem('currentUser')!);
        if(currentUser){
            const token: string = currentUser.accessToken!;
            dispatch(updateUser(userToUpdate, currentUser, token))
        }
        reset({});
        showOrHideEmailInput();
    }

    const handleEditPassword = (data: PasswordValues, e: any) => {
        e.preventDefault()
        console.log(data)
        const userToUpdate: IUser = {
            ...user,
            password: data.newPassword
        }
        const currentUser: IJwtResponse = JSON.parse(localStorage.getItem('currentUser')!);
        if(currentUser){
            const token: string = currentUser.accessToken!;
            dispatch(updateUser(userToUpdate, currentUser, token))
        }
        resetPassword({});
        showOrHidePasswordInput();
        
    }

    useEffect(() => {
       setUserEmail(user.email as string)
    }, [user])

    return (
        
        <Card elevation={0} className={classes.profileCard}>
            <CardContent className={classes.cardContent}>
                <div className={classes.top}>
                    <div className={classes.iconWrapper}>
                        <PersonOutlineIcon color="primary" className={classes.profileIcon} />
                    </div>
                    <div className={classes.usernameWrapper}>
                        <Typography variant="h6" className={classes.username}>{user.username}</Typography>
                    </div>
                </div>
                <Divider />
                
                    <div className={classes.info}>
                        <div className={classes.mail}>
                            <MailOutlineIcon className={classes.icon} color="primary" fontSize="large" />
                            {!editEmail ? (
                                <div>
                                    <Typography variant="h6">{userEmail}</Typography>
                                    <IconButton 
                                        onClick={showOrHideEmailInput} 
                                        className={classes.editBtn}
                                        disabled={editEmail}
                                    >
                                        <EditIcon color="primary" className={classes.editIcon}/>
                                    </IconButton>
                                </div>
                                
                            ):
                                <div ref={emailRef}>
                                    <form key={1} onSubmit={handleSubmit(handleEditEmail)}>
                                        <InputBase 
                                            autoFocus={true}
                                            placeholder={userEmail}
                                            required
                                            id="email"
                                            type="email"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.input,
                                                focused: classes.focus
                                            }}
                                            {...register('newEmail')}
                                        />
                                        <IconButton
                                            className={classes.saveBtn}
                                            ref={emailRef}
                                            type="submit"
                                        >
                                            <SaveIcon className={classes.saveIcon} color="primary" />
                                        </IconButton>
                                    </form>
                                </div>
                            }
                            
                        </div>
                        <Divider />
                        <div className={classes.password}>
                            <LockIcon className={classes.icon} color="primary" fontSize="large" />
                            {!editPassword ? (
                                <div>
                                    <Typography variant="h6">******</Typography>
                                    <IconButton 
                                        onClick={showOrHidePasswordInput} 
                                        className={classes.editBtn} 
                                        disabled={editPassword}
                                    >
                                        <EditIcon color="primary" className={classes.editIcon}/>
                                    </IconButton>
                                </div>
                            ):
                                <div ref={passwordRef}>
                                    <form key={2} onSubmit={handleSubmitPassword(handleEditPassword)}>
                                        <InputBase 
                                            autoFocus
                                            placeholder="******"
                                            type="password"
                                            id="password"
                                            required
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.input,
                                                focused: classes.focus
                                            }}
                                            aria-invalid={errorsPassword.newPassword ? "true" : "false"}
                                            {...registerPassword('newPassword', {
                                                minLength: 6,
                                            })}
                                        />
                                        <IconButton
                                            className={classes.saveBtn}
                                            ref={passwordRef}
                                            type="submit"
                                        >
                                            <SaveIcon className={classes.saveIcon} color="primary" />
                                        </IconButton>
                                        {errorsPassword.newPassword && errorsPassword.newPassword.type === "minLength" && (
                                            <Typography variant="body2" align="center" color="error">Password should be at least 6 characters</Typography>
                                        )}
                                    </form>
                                </div>
                            }
                        </div>
                    </div>
            </CardContent>
        </Card>
    )
}

export default ProfileCard;