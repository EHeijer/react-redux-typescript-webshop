import { Button, createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Theme, Typography, withStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useState } from "react";
import { IOrder } from "../model/order.model";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useBetween } from "use-between";
import { useShareableState } from "./utils/shareable-state";
import OrderModal from "./OrderModal";

const useStyles = makeStyles((theme: Theme) => {
    return {
        tableContainer: {
            maxWidth: '60%',
            marginLeft: 80,
            paddingBottom: 80,
            position: 'relative',
        },
        table: {
           
        },
        body: {
            
        },
        cell: {
            color: theme.palette.primary.dark
        },
        noOrderMessage: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: '-100px'
        },
        tableFooter: {
        },
        pagination: {
            position: 'absolute',
            bottom: 30,
            left: '50%',
            marginTop: '-20px',
            marginLeft: '-100px'
        },
        viewBtn: {
            background: theme.palette.primary.dark,
            color: 'white',
            padding: '6px 10px'
        },
        btnIcon: {
            marginRight: 5
        }
    }
})

export interface IOrderTableProp  {
    orders: IOrder[],
    itemsPerPage: number,
    totalItems: number,
    activePage: number,
    handleChangePage: any
}

const StyledTableCell = withStyles((theme: Theme) => 
    createStyles({
        head: {
            backgroundColor: theme.palette.primary.main,
            color: 'white'
        }
    })
)(TableCell);


const OrderTable = (props: IOrderTableProp) => {
    const classes = useStyles();
    const { orders, totalItems, itemsPerPage, activePage } = props;
    const [ tableContainerHeight, setTableContainerHeight ] = useState(610);
    const numOfPages = Math.ceil(totalItems / itemsPerPage);
    const { orderModalOpen, setOrderModalOpen } = useBetween(useShareableState);
    const [orderToShow, setOrderToShow] = useState({} as IOrder);

    const handleChangePage = (page: number) => {
        props.handleChangePage(page);
    }

    const handleOrderModalOpen = (order: IOrder) => {
        setOrderToShow(order);
        setOrderModalOpen(true);
    }

    const heightOfTableContainer = () => {
        if(totalItems === 0){
            setTableContainerHeight(150)
        }else if(totalItems <= 8){
            if(totalItems < 4) {
                setTableContainerHeight(150 + totalItems * 40)
            } else if(totalItems < 6) {
                setTableContainerHeight(210 + totalItems * 40)
            } else {
                setTableContainerHeight(290 + totalItems * 40)
            }
        }else if(activePage < numOfPages){
            setTableContainerHeight(610);
        } else {
            const numOfFullPages = Math.floor(totalItems / itemsPerPage);
            const numOfOrdersOnLastPage = totalItems - (numOfFullPages * itemsPerPage);
            if(numOfOrdersOnLastPage < 4) {
                setTableContainerHeight(150 + numOfOrdersOnLastPage * 40)
            } else if(numOfOrdersOnLastPage < 6) {
                setTableContainerHeight(210 + numOfOrdersOnLastPage * 40)
            } else {
                setTableContainerHeight(290 + numOfOrdersOnLastPage * 40)
            }
        }
    }

    useEffect(() => {
        heightOfTableContainer()
    }, [totalItems, activePage])
    return (
        <TableContainer 
            elevation={0} 
            className={classes.tableContainer} 
            component={Paper}
            style={{height: tableContainerHeight}}
        >
            
            <Table className={classes.table}>
            
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="h6">#</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="h6">Order Created</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="h6">Status</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="h6">Order Sum</Typography>
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
                {!orders.length && 
                    <div className={classes.noOrderMessage}>
                        <Typography variant="h4" color="primary">No order history</Typography>
                    </div>
                }
                <TableBody className={classes.body}>
                    {orders.map((order, i) => (
                        <TableRow key={order.id}>
                            <TableCell className={classes.cell}>
                                <Typography variant="h6">{order.id}</Typography>
                            </TableCell>
                            <TableCell className={classes.cell}>
                                <Typography variant="h6">{order.dateCreated}</Typography>
                            </TableCell>
                            <TableCell className={classes.cell}>
                                <Typography variant="h6">{order.orderSent}</Typography>
                            </TableCell>
                            <TableCell className={classes.cell}>
                                <Typography variant="h6">${order.orderSum?.toFixed(2)}</Typography>
                            </TableCell>
                            <TableCell className={classes.cell}>
                                <Button 
                                    disableElevation 
                                    className={classes.viewBtn} 
                                    variant="contained"
                                    onClick={() => handleOrderModalOpen(order)}    
                                >
                                    <VisibilityIcon className={classes.btnIcon} />
                                    <Typography  variant="body1">View</Typography>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
                {orders.length > 0 && numOfPages > 1 &&
                    <TableFooter className={classes.tableFooter}>
                    <div>
                        <Pagination 
                            className={classes.pagination}
                            count={numOfPages}
                            page={activePage}
                            onChange={(event: object, page: number) => handleChangePage(page)}
                            variant="outlined"
                            disabled={totalItems <= itemsPerPage}
                        />
                    </div>
                    </TableFooter>
                }
                
                
            </Table>      
            <OrderModal order={orderToShow}/>    
        </TableContainer>
    )
}

export default OrderTable;