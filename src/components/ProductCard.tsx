import { Button, Card, CardContent, CardHeader, CardMedia, makeStyles, Theme, Typography } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useBetween } from 'use-between';
import { ICartItem } from '../model/cart-item.model';
import { IProduct } from '../model/product.model';
import { IRootState } from '../reducers';
import { addItemToCart } from '../reducers/cart.reducer';
import { useShareableState } from './utils/shareable-state';

const useStyles = makeStyles((theme: Theme) => {
    return {
        productCard: {
            height: 400,
            width: 250,
        },
        header: {
            height: 20
        },
        image: {
            height: 200,
            backgroundSize: 200,
        },
        content: {
            height: 110,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px 30px 16px 30px',
            '&:last-child': {
                paddingBottom: 16
            }
        },
        nameAndDesc: {
            
        },
        name: {
            color: theme.palette.primary.main,
            fontWeight: 'bold'
        },
        desc: {
            color: theme.palette.primary.main,
            
        },
        priceAndBuy: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        price: {
            fontWeight: 'bold',
            color: theme.palette.primary.main,
        },
        buyButton: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            width: 120,
            borderRadius: 0,
            '&:hover': {
                color: theme.palette.secondary.dark,
                backgroundColor: theme.palette.primary.main,
            },
        },
        cartIcon: {
            marginRight: 3
        }
    }
})

export interface IProductCardProps extends StateProps{
    product: IProduct,
    addItemToCart: any
}

const ProductCard = (props: IProductCardProps) => {
    const { product } = props;
    const classes = useStyles();
    
    const handleAddToCart = (product: IProduct) => {
        props.addItemToCart(product);
    }

    return (
        <div>
            <Card elevation={0} className={classes.productCard}>
                <CardHeader className={classes.header}/>
                <CardMedia 
                    className={classes.image}
                    image={`../${product.imageUrl}`}
                    title="product name"
                />
                <CardContent classes={{root: classes.content}} >
                    <div className={classes.nameAndDesc}>
                        <Typography className={classes.name} variant="body1">{product.productName}</Typography>
                        <Typography className={classes.desc} variant="body2">{product.brand}</Typography>
                    </div>
                    
                    <div className={classes.priceAndBuy}>
                        <Typography className={classes.price} variant="h6">${product.price?.toFixed(2)}</Typography>
                        <Button className={classes.buyButton} onClick={() => handleAddToCart(product)}>
                            <ShoppingCartIcon classes={{root: classes.cartIcon}} fontSize="small" />
                            <Typography variant="body2">Add To Cart</Typography>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};

const mapStateToProps = ({ cart }: IRootState) => ({
    cartItems: cart.cartItems,
    cartSum: cart.cartSum,
    numOfItems: cart.numOfItems
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        addItemToCart: (product: IProduct) => dispatch(addItemToCart(product))
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
