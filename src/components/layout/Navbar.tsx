import { AppBar, Badge, fade, IconButton, InputBase, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartDrawer from './CartDrawer';
import { useShareableState } from '../utils/shareable-state';
import { createRef, FormEvent, FormEventHandler, MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';
import { useBetween } from 'use-between';
import { IRootState } from '../../reducers';
import { connect } from 'react-redux';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import AccountDropdown from './AccountDropdown';
import { useOnClickOutside } from '../utils/custom-hooks';
import { useHistory } from 'react-router';


const drawerWidth = 300;
const appBarHeight = 80
const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            width: 0,
        },
        appbar: {
            background: 'transparent',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: "0.5rem",
            height: appBarHeight,
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            border: `solid 1px ${fade(theme.palette.common.black, 0.20)}`,
            backgroundColor: fade(theme.palette.common.white, 0.70),
            // '&:hover': {
            //     border: "solid 1px #515151"
            // },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        icon: {
            color: theme.palette.primary.dark,
        },
        focus: {
            boxShadow: `${theme.palette.primary.main} 0 0 0.5rem`,
            borderRadius: theme.shape.borderRadius,
        },
        inputRoot: {
            color: theme.palette.primary.dark,
        },
        inputInput: {
            padding: theme.spacing(1.5, 1.5, 1.5, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        grow: {
            flexGrow: 1,
        },
        accountAndCart: {
            color: 'black'
        },
        cartButton: {

        },
        iconBtn: {
            position: 'relative'
        },
        emptyCartMessage: {
            position: 'absolute',
            right: 42,
            top: 70
        },
        box: {
            width: 300,
            padding: 15,
            background: 'white',
            position: 'relative',
            color: theme.palette.secondary.dark,
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
        account: {

        }
    }
}) 

export interface INavbarProp extends StateProps {

}
  
function Navbar(props: INavbarProp) {
    const classes = useStyles();
    const { open, setOpen } = useBetween(useShareableState);
    const { cartDrawerOpen, setCartDrawerOpen } = useBetween(useShareableState);
    const { numOfItems } = props;
    const [ openEmptyCartMessage, setOpenEmptyCartMessage ] = useState(false);
    const emptyCartMessage = document.getElementsByClassName('emptyCartMessage');
    const cartButton = document.getElementsByClassName('cartButton');
    const [hideDropdown, setHideDropdown] = useState(true);
    const { loginModalOpen, setLoginModalOpen } = useBetween(useShareableState);
    const { registerModalOpen, setRegisterModalOpen } = useBetween(useShareableState);
    const dropdown = useRef(null);
    const cartRef = useRef(null);
    useOnClickOutside(dropdown, () => showDropdown());
    useOnClickOutside(cartRef, () => setOpenEmptyCartMessage(false));
    const [ searchInput, setSearchInput ] = useState('');
    const history = useHistory();

    const handleDrawerOpen = () => {
        const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem('cart')!) : null;
        if(cart !== null && cart.length < 1) {
            if(!openEmptyCartMessage) {
                setOpenEmptyCartMessage(true);
            }else {
                setOpenEmptyCartMessage(false);
            }
            
        }else if(cart === null) {
            if(!openEmptyCartMessage) {
                setOpenEmptyCartMessage(true);
            }else {
                setOpenEmptyCartMessage(false);
            }
        } else {
            setCartDrawerOpen(true);
        }
    }

    const showDropdown = () => {
        setHideDropdown(!hideDropdown)
    }

    const handleLoginOpen = () => {
        setLoginModalOpen(true);
    }
    
    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(searchInput.trim().length > 0){
            history.push(`/search/${searchInput}`);
        }
       
    }
    
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon className={classes.icon}/>
                        </div>
                        <form onSubmit={handleSearch}>
                        <InputBase 
                            autoFocus={true}
                            placeholder="Search..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                                focused: classes.focus
                            }}
                            inputProps={{ 'aria-label': 'search'}}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        </form>
                    </div>
                    <div className={classes.grow}></div>
                    <div>
                        <IconButton
                            aria-haspopup="true"
                            onClick={showDropdown}
                            className={classes.iconBtn}
                            disabled={!hideDropdown}
                        >
                            <PersonOutlineIcon classes={{root: classes.accountAndCart}} fontSize="large"/>
                        </IconButton>
                        {!hideDropdown && (
                                <AccountDropdown setRef={dropdown}/>
                        )}
                        <IconButton 
                            disabled={openEmptyCartMessage} 
                            className={classes.cartButton} 
                            onClick={handleDrawerOpen}>
                            <Badge
                                badgeContent={numOfItems} 
                                color="error"
                            >
                                <ShoppingCartIcon classes={{root: classes.accountAndCart}} fontSize="large" />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
                {openEmptyCartMessage ? 
                    <div className={classes.emptyCartMessage}>
                        <div className={classes.box + ' ' + classes.arrow}>
                            <Typography variant="h6">Your cart is empty</Typography>
                        </div>
                    </div> : null}
            </AppBar>
            <LoginModal handleLoginOpen={handleLoginOpen}/>
            <RegisterModal />
            <CartDrawer setRef={cartRef} open={cartDrawerOpen} handleDrawerOpen={handleDrawerOpen}/>
        </div>
    )
}

const mapStateToProps = ({ cart }: IRootState) => ({
    numOfItems: cart.numOfItems
})

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Navbar);