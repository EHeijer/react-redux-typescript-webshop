import { Button, Card, CardContent, CardHeader, CardMedia, makeStyles, Theme, Typography } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IProduct } from '../model/product.model';


const useStyles = makeStyles((theme: Theme) => {
    return {
        productCard: {
            height: 400,
            width: '100%',
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

export interface IProductCard {
    product: IProduct;
}

const ProductCard = (props: IProductCard) => {
    const { product } = props;
    const classes = useStyles();
    return (
        <div>
            <Card elevation={0} className={classes.productCard}>
                <CardHeader className={classes.header}/>
                <CardMedia 
                    className={classes.image}
                    image={`./c4.jpg`}
                    title="product name"
                />
                <CardContent classes={{root: classes.content}} >
                    <div className={classes.nameAndDesc}>
                        <Typography className={classes.name} variant="body1">Product Name</Typography>
                        <Typography className={classes.desc} variant="body2">Product description blablabl blalbalba albalbabn</Typography>
                    </div>
                    
                    <div className={classes.priceAndBuy}>
                        <Typography className={classes.price} variant="h6">$29.90</Typography>
                        <Button className={classes.buyButton}>
                            <ShoppingCartIcon classes={{root: classes.cartIcon}} fontSize="small" />
                            Add To Cart</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};
export default ProductCard;
