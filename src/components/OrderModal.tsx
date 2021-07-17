import { Dialog, DialogContent, DialogTitle, Divider, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from "@material-ui/core";
import { useState } from "react";
import { useBetween } from "use-between";
import { IOrder } from "../model/order.model";
import { IRootState } from "../reducers";
import { useShareableState } from "./utils/shareable-state";

const useStyles = makeStyles((theme: Theme) => {
    return {
        
        dialogContent: {
        },
        paper: {
            paddingBottom: 40
        },
        tableContainer: {
            boxShadow: 'none',
            width: '90%',
            margin: 'auto'
        },
        itemHeader: {
            width: 400,
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
        },
        productImageWrapper: {
            padding: '3px 25px 0 15px'
        },
        productImage: {
            width: 100
        },
        itemColumn: {
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            marginBottom: 10,
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
            color: theme.palette.secondary.dark
        }
        
    }
})


export interface IOrderModalProps {
    order: IOrder
}

const OrderModal = (props: IOrderModalProps) => {
    const { order } = props;
    const { orderModalOpen, setOrderModalOpen } = useBetween(useShareableState);
    const classes = useStyles();

    const handleClose = () => {
        setOrderModalOpen(false);
    }

    return (
        <Dialog 
            classes={{paper: classes.paper}} 
            open={orderModalOpen} 
            onClose={handleClose}
            maxWidth="lg"
        >
            <DialogTitle disableTypography>
                <Typography color="primary" variant="h4" align="center">Order number #{order.id}</Typography>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <TableContainer className={classes.tableContainer} component={Paper}>
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
                        {order.orderlines && order.orderlines.map((orderline, i) => (
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
                        <Divider />
                        <div className={classes.sum}>
                            <Typography variant="h6" className={classes.boldTextRed}>Sum of order: ${order.orderSum?.toFixed(2)}</Typography>
                        </div>
                    </TableContainer>
                </DialogContent>
        </Dialog>
    )
}


export default OrderModal;