import { Button, Divider, Drawer, IconButton, List, ListItem, makeStyles, Theme, Typography, useTheme } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import React, { MutableRefObject, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { useBetween } from 'use-between';
import { ICartItem } from '../../model/cart-item.model';
import { IJwtResponse } from '../../model/jwt-response.model';
import { IOrder } from '../../model/order.model';
import { IOrderline } from '../../model/orderline.model';
import { IRootState } from '../../reducers';
import { getAllCartItems } from '../../reducers/cart.reducer';
import { sendOrder } from '../../reducers/order.reducer';
import CartItem from '../CartItem';
import { useShareableState } from '../utils/shareable-state';

const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) => {
    return {
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            textAlign:'center',
            padding: theme.spacing(0 , 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start',
            position: 'relative'
        },
        cartList: {
            flexGrow: 1
        },
        listItem: {
            // padding: '25px 5px'
        },
        text: {
            padding: 10,
            fontWeight: 'bold'
        },
        closeButton: {
            position: 'absolute',
            right: 5
        },
        sum: {
            margin: 'auto',
            width: '97%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        boldText: {
            fontWeight: 900
        },
        buttonWrapper: {
            width: '97%',
            margin: 'auto',
            padding: '17px 0 10px 0'
        },
        checkoutButton: {
            borderRadius: 0,
            '&:hover': {
                color: theme.palette.secondary.dark,
                background: theme.palette.primary.main,
            },
        },
        cartBottom: {
            background: '#f4f4f4',
            padding: '15px 10px',
            marginTop: 10
        },
        
    }
})

export interface ICartProp extends StateProps{
    handleDrawerOpen: any,
    open: boolean,
    getAllCartItems: any,
    sendOrder: any,
    setRef: MutableRefObject<null>
}

function CartDrawer(props: ICartProp) {
    const classes = useStyles();
    const { open, setOpen} = useBetween(useShareableState);
    const { cartDrawerOpen, setCartDrawerOpen } = useBetween(useShareableState);
    const { loginModalOpen, setLoginModalOpen } = useBetween(useShareableState);
    const [sum, setSum] = useState('');
    const { cartItems, cartSum, numOfItems, order, setRef, errorMessage} = props;
    const history = useHistory();
    const [ orderId, setOrderId ] = useState(0);
  
    const handleDrawerClose = () => {
        setCartDrawerOpen(false);
    }

    const handleSendOrder = (cart: ICartItem[]) => {
        const currentUser: IJwtResponse = JSON.parse(localStorage.getItem('currentUser')!);
        if(currentUser){
            const currentUserId = currentUser.id;
            let orderlines = [] as Array<IOrderline>;
            cart.map(item => {
                const orderline: IOrderline = {
                    quantity: item.quantity,
                    sumOfOrderline: item.quantity * item.item.price!,
                    product: item.item
                };
                return orderlines = [...orderlines, orderline];
            })
            let newOrder: IOrder = {
                userId: currentUserId,
                orderSum: cartSum,
                orderlines: orderlines,
                dateCreated: moment()
            }
            props.sendOrder(newOrder, currentUser.accessToken);
        } else {
            setLoginModalOpen(true);
        }
    }

    useEffect(() => {
        props.getAllCartItems();
    }, [sum])

    useEffect(() => {
        if(order.id){
            setOrderId(order.id);
            history.push(`/order-confirm`);
        }
    }, [order])

    useEffect(() => {
        if(errorMessage !== null) {
            history.push('/error-page')
        }
    }, [errorMessage])

    return (
        <Drawer 
            ref={setRef}
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={cartDrawerOpen}
            classes={{
                paper: classes.drawerPaper,
            }}    
            >
                <div className={classes.drawerHeader}>
                    <div >
                        <Typography color="primary" className={classes.text} variant="h4">Your Cart</Typography>
                    </div>
                    <IconButton className={classes.closeButton} onClick={handleDrawerClose}>
                        <CloseIcon fontSize="large"/>
                    </IconButton>
                </div>
                <Divider />
                <List className={classes.cartList}>
                    {cartItems && cartItems.map((item, i) => (
                        <ListItem className={classes.listItem} key={`item-${i}`}>
                            <CartItem item={item}/>
                        </ListItem>
                        
                    ))}
                </List>
                <div className={classes.cartBottom}>
                    <div className={classes.sum}>
                        <Typography variant="body1">Sum:</Typography>
                        <Typography className={classes.boldText} variant="h6">${cartSum === 0 ? '0.00' : cartSum.toFixed(2)}</Typography>
                    </div>
                    <div className={classes.buttonWrapper}>
                        <Button 
                            size="large"  
                            variant="contained" 
                            fullWidth 
                            color="primary" 
                            className={classes.checkoutButton}
                            onClick={() => handleSendOrder(cartItems)}
                        >
                            <Typography variant="h6">Checkout</Typography>
                        </Button>
                    </div>
                    
                </div>
        </Drawer>
    )
}

const mapStateToProps = ({ cart, order }: IRootState) => ({
    cartItems: cart.cartItems,
    cartSum: cart.cartSum,
    numOfItems: cart.numOfItems,
    order: order.order,
    errorMessage: order.errorMessage
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        getAllCartItems: () => dispatch(getAllCartItems()),
        sendOrder: (order: IOrder, token: string) => dispatch(sendOrder(order, token))
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CartDrawer);