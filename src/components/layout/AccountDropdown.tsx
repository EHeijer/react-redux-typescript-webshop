import { List, ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core'
import React, { MutableRefObject, RefObject, useEffect, useState } from 'react'
import { useBetween } from 'use-between';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import { useShareableState } from '../utils/shareable-state';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IRootState } from '../../reducers';
import { connect } from 'react-redux';
import { signOut } from '../../reducers/auth.reducer';
import { useHistory } from 'react-router';
import { IJwtResponse } from '../../model/jwt-response.model';

const useStyles = makeStyles((theme: Theme) => {
    return {
        dropdownContainer: {
            position: 'absolute',
            top: 58,
            right: 92
        },
        box: {
            width: 130,
            background: 'white',
            color: theme.palette.primary.main,
            position: 'relative',
            boxShadow: `${theme.palette.primary.light} 0 0 0.5rem`
        },
        arrow: {
            '&:after': {
                content: '" "',
                position: 'absolute',
                right: 10,
                top: '-10px',
                borderTop: 'none',
                borderRight: '10px solid transparent',
                borderLeft: '10px solid transparent',
                borderBottom: '10px solid white',
            }
        },
        list: {
            padding: 0 
        },
        listItem: {
          padding: '8px 10px',
          cursor: 'pointer',
          '&:hover': {
                background: theme.palette.primary.light,
          }
        },
        icon: {
            marginRight: 8
        }
    }
})

export interface IAccountDropdownProp extends StateProps{
    setRef: MutableRefObject<null>,
    logOut: any
}

function AccountDropdown(props: IAccountDropdownProp) {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState({} as IJwtResponse | null);
    const { loginModalOpen, setLoginModalOpen } = useBetween(useShareableState);
    const { registerModalOpen, setRegisterModalOpen } = useBetween(useShareableState);
    let history = useHistory();

    const handleOpenRegisterModal = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
    }

    const handleLogOut = () => {
        props.logOut();
        if(localStorage.getItem("currentUser") === null){
            history.push("/");
            window.location.reload();
        }
    }

    const toMyAccount = () => {
        history.push("/account");
    }

    const setUser = () => {
        if(localStorage.getItem("currentUser")){
            setCurrentUser(JSON.parse(localStorage.getItem('currentUser')!));
        }else {
            setCurrentUser(null)
        }
    }
    useEffect(() => {
        setUser();
    }, [])
    return (
        
        <div className={classes.dropdownContainer} ref={props.setRef}>
            <div className={classes.box + ' ' + classes.arrow}>
                {currentUser !== null ? 
                    <List className={classes.list}>
                        <ListItem onClick={toMyAccount} disabled={false} className={classes.listItem}>
                            <AccountCircleIcon className={classes.icon}/>
                            <ListItemText>My Account</ListItemText>
                        </ListItem>
                    
                        <ListItem onClick={handleLogOut} className={classes.listItem}>
                            <ExitToAppIcon className={classes.icon}/>
                            <ListItemText>Sign out</ListItemText>
                        </ListItem>
                    </List>
                    :
                    <List className={classes.list}>
                        <ListItem onClick={() => setLoginModalOpen(true)} className={classes.listItem}>
                            <ExitToAppIcon className={classes.icon}/>
                            <ListItemText>Sign in</ListItemText>
                        </ListItem>

                        <ListItem onClick={handleOpenRegisterModal} className={classes.listItem}>
                            <PersonAddIcon className={classes.icon}/>
                            <ListItemText>Register</ListItemText>
                        </ListItem>
                    </List>
                }
            </div>
        </div>
    )
}

const mapStateToProps = ({ auth }: IRootState) => ({
    currentUser: auth.loggedInUser,
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        logOut: () => dispatch(signOut())
    }
}
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(AccountDropdown);
