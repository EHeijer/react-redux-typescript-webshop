import { Button, Card, CardMedia, Divider, makeStyles, Theme, Typography } from "@material-ui/core";
import { ICartItem } from "../model/cart-item.model";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/Delete';
import { IRootState } from "../reducers";
import { decreaseQuantityOfItemInCart, increaseQuantityOfItemInCart, removeItemFromCart } from "../reducers/cart.reducer";
import { connect } from "react-redux";
import { useEffect, useState } from "react";


const useStyles = makeStyles((theme: Theme) => {
    return {
        itemCard: {
            width: '100%',
            position: 'relative',

        },
        removeButton: {
            position: 'absolute',
            right: -15,
            top: -10
        },
        imageAndtext: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
        },
        imageWrapper: {
            padding: '5px 7px'
        },
        image: {
            height: 100,
            width: 100,
        },
        nameAndBrand:{
            marginLeft: 10,
            width: '80%',
        },
        name: {
            
            color: theme.palette.primary.main,
            fontWeight: 'bold'
        },
        desc: {
            color: theme.palette.primary.main,
        },
        bottom: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 1px'
        },
        changeQuantity: {
            display: 'flex',
            alignItems: 'center'
        },
        changeQuantityButton: {
            padding: 0,
            minWidth: 0
        },
        add: {
            color: theme.palette.primary.main
        },
        subtract: {
            color: theme.palette.primary.light
        },
        quantityField: {
            width: 30,
            height: 30,
            border: 'solid grey 1px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 5px'
        },
        price: {

        },
        total: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        textPrice: {
            fontWeight: 600,
            marginLeft: 5
        },
        textNotBold:{
            fontWeight: 300,
            color: theme.palette.primary.main
        },
        divider: {
            border: 'none',
            height: 1,
            margin: '15px 0 0 0',
            flexShrink: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
        }
    }
})

export interface ICartItemProps extends StateProps{
    item: ICartItem,
    increaseQuantity: any,
    decreaseQuantity: any,
    removeItemFromCart: any
}

const CartItem = (props: ICartItemProps, theme: Theme) => {
    const { item } = props;
    const classes = useStyles();
    const [quantity, setQuantity] = useState(item.quantity);

    const getSumOfOrderLine = (item: ICartItem) => {
        return (item.item.price! * item.quantity).toFixed(2);
    }

    const handleDecreaseQuantity = (item: ICartItem) => {
        props.decreaseQuantity(item);
        setQuantity(item.quantity);
    }

    const handleIncreaseQuantity = (item: ICartItem) => {
        props.increaseQuantity(item);
        setQuantity(item.quantity);
    }

    const handleRemoveItem = (item: ICartItem) => {
        props.removeItemFromCart(item);
    }

    useEffect(() => {
        setQuantity(item.quantity)
    }, [item])

    return (
        <Card elevation={0} className={classes.itemCard}>
            <Button className={classes.removeButton} onClick={() => handleRemoveItem(item)}>
                <DeleteForeverIcon />
            </Button>
            <div className={classes.imageAndtext}>
                <div className={classes.imageWrapper}>
                    <CardMedia 
                        className={classes.image}
                        image={`./${item.item.imageUrl}`}
                        title="item"
                    />
                </div>
                <div className={classes.nameAndBrand}>
                    <Typography className={classes.name} variant="body1">{item.item.productName}</Typography>
                    <Typography className={classes.desc} variant="body2">{item.item.brand}</Typography>
                </div>
            </div>
            <div className={classes.bottom}>
                <div className={classes.changeQuantity}>
                    <Button className={classes.changeQuantityButton} onClick={() => handleDecreaseQuantity(item)}>
                        <RemoveCircleIcon fontSize="large" className={classes.subtract}/>
                    </Button>
                    <div className={classes.quantityField}>
                        <span>
                            <Typography variant="h6">{quantity}</Typography>
                        </span>
                    </div>
                    
                    <Button className={classes.changeQuantityButton} onClick={() => handleIncreaseQuantity(item)}>
                        <AddCircleIcon fontSize="large" className={classes.add}/>
                    </Button>
                    <div className={classes.price}>
                        <Typography variant="h6" className={classes.textPrice}>${item.item.price?.toFixed(2)}</Typography>
                    </div>
                </div>
                
                <div className={classes.total}>
                    <Typography variant="body1" className={classes.textNotBold}>Total:</Typography>
                    <Typography variant="h6" className={classes.textPrice}>${getSumOfOrderLine(item)}</Typography>
                </div>
            </div>
            
            <Divider className={classes.divider}/>
        </Card>
    )
}

const mapStateToProps = ({ cart }: IRootState) => ({
    cartItems: cart.cartItems,
    cartSum: cart.cartSum,
    numOfItems: cart.numOfItems,
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        increaseQuantity: (cartItem: ICartItem) => dispatch(increaseQuantityOfItemInCart(cartItem)),
        decreaseQuantity: (cartItem: ICartItem) => dispatch(decreaseQuantityOfItemInCart(cartItem)),
        removeItemFromCart: (cartItem: ICartItem) => dispatch(removeItemFromCart(cartItem))
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);