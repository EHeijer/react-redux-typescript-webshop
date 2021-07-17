import { Button, Container, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { IOrder } from "../model/order.model";
import { IRootState } from "../reducers";
import { getAllCartItems } from "../reducers/cart.reducer";
import { sendOrder } from "../reducers/order.reducer";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ErrorPage from "./ErrorPage";

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            background: '#f4f4f4',
            minHeight: '100vh',
            padding: '50px 0'
        },
        backButton: {
            position: 'absolute',
            top: 30,
            left: 30
        },
        orderConfirmContainer: {
            padding: '60px 60px',
            background: 'white',
            borderRadius: 7,
            position: 'relative'
        },
        orderConfirmTop: {
            marginBottom: 20
        },
        paper: {
            boxShadow: 'none',
            width: '90%',
            margin: 'auto'
        },
        itemHeader: {
            width: 400,
            borderBottom: '1px solid rgba(224, 224, 224, 1)'
        },
        imageWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
        },
        checkImage: {
            width: 80,
            fill: 'green'
        },
        productImageWrapper: {
            padding: '0 25px 0 15px'
        },
        productImage: {
            width: 100
        },
        itemColumn: {
            display: 'flex',
            alignItems: 'center',
            border: 'none'
        },
        column: {
            border: 'none'
        },
        boldText: {
            fontWeight: 700,
            color: theme.palette.primary.main
        },
        sum: {
            padding: '20px 18px',
            textAlign: 'right'
        },
        boldTextRed: {
            fontWeight: 700,
            color: 'red'
        }
    }
    
})

export interface IOrderConfirmProp extends StateProps{
    
}

function OrderConfirm(props: IOrderConfirmProp) {
    const classes = useStyles();
    const { cartItems, cartSum, numOfItems, order, errorMessage} = props;
    return (
        errorMessage ? (
            <ErrorPage />
        ) : (
        <div className={classes.root}>
            <Container className={classes.orderConfirmContainer}>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.backButton}
                    startIcon={<KeyboardBackspaceIcon />}
                    href="/"
                >Continue Shopping</Button>
                <section className={classes.orderConfirmTop}>
                    <Typography align="center" variant="h5">We just received your order. Thank you!</Typography>
                    <div className={classes.imageWrapper}>
                        <img className={classes.checkImage} src="./check-circle-solid.svg" alt=""/>
                    </div>
                    <Typography variant="h5" align="center">Order number: #{order.id}</Typography>
                </section>
                <TableContainer className={classes.paper} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.itemHeader} align="center">
                                    <Typography color="primary" variant="body2">Item</Typography>
                                </TableCell>
                                <TableCell className={classes.itemHeader} align="center">
                                    <Typography color="primary" variant="body2">Price</Typography>
                                </TableCell>
                                <TableCell className={classes.itemHeader} align="center">
                                    <Typography color="primary" variant="body2">Quantity</Typography>
                                </TableCell>
                                <TableCell className={classes.itemHeader} align="right">
                                    <Typography color="primary" variant="body2">Total</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                    {order && order.orderlines && order.orderlines.map((orderline, i) => (
                        <TableRow key={`orderline-${i}`}>
                            <TableCell padding="none" className={classes.itemColumn}>
                                <div className={classes.productImageWrapper}>
                                    <img className={classes.productImage} src={`./${orderline.product?.imageUrl}`} alt=""/>
                                </div>
                                <Typography className={classes.boldText} variant="body1">{orderline.product?.productName}</Typography>
                            </TableCell>
                            <TableCell align="center"className={classes.column}>
                                <Typography className={classes.boldText} >${orderline.product?.price?.toFixed(2)}</Typography>
                            </TableCell>
                            <TableCell align="center" className={classes.column}>
                                <Typography className={classes.boldText} >{orderline.quantity}</Typography>
                            </TableCell>
                            <TableCell align="right" className={classes.column}>
                                <Typography className={classes.boldText} >${orderline.sumOfOrderline?.toFixed(2)}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                        </TableBody>
                    </Table>
                    <div className={classes.sum}>
                        <Typography variant="h6" className={classes.boldTextRed}>Sum of order: ${order.orderSum?.toFixed(2)}</Typography>
                    </div>
                </TableContainer>
            </Container>
        </div>
    ))
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
        getAllCartItems: () => dispatch(getAllCartItems())
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirm);