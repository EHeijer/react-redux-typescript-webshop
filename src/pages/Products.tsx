import { Button, Container, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { isPropertyDeclaration } from "typescript";
import ProductCard from "../components/ProductCard";
import { getSortState, IPaginationBaseState } from "../components/utils/pagination";
import { IProduct } from "../model/product.model";
import { IRootState } from "../reducers";
import { getAllProducts } from '../reducers/product.reducer'

export interface IProductsProp extends StateProps, RouteComponentProps { 
    getAllProducts: any
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        productContainer: {
            paddingTop: 100,
        },
        gridContainer: {
            padding: 15

        },
        productItem: {
            maxWidth: 400
        },
        paginationGrid: {
            marginTop: 30
        }
    }
})


export type IProductsState = IPaginationBaseState;

function Products(props: IProductsProp) {
    const { products, totalItems, loading, errorMessage} = props;
    const classes = useStyles();
    const [activePage, setActivePage] = useState(1);
    const [sort, setSort] = useState("");
    const [order, setOrder] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(20);
    // const [location, setLocation] = useState(props.location);
    const [fetchedProducts, setFetchedProducts] = useState([] as Array<IProduct>)
    // const [loading, setLoading] = useState(false);
    // const [productsState, setProductsState] = useState({ ...getSortState(props.location, 20)});

    useEffect(() => {
        props.getAllProducts(activePage - 1, itemsPerPage, `${sort},${order}`);
        setFetchedProducts(products);
    }, [activePage]);

    console.log(fetchedProducts);
    return (
        loading ? (
            <h2>Loading...</h2>
        ) : errorMessage ? (
            <h2>{errorMessage}</h2>
        ) : (
            <Container fixed className={classes.productContainer}>
            <Typography variant="h4" gutterBottom color="primary" align="center">ALL PRODUCTS</Typography>
                <Grid container className={classes.gridContainer}>
                    <Grid container item spacing={3} justify="center">
                    {products && products.map((product, i) => (
                        <Grid item className={classes.productItem} key={`showproduct-${i}`}>
                            <ProductCard product={product}/>
                        </Grid>
                        
                    ))}
                    </Grid>
                
            
                    <Grid container item direction="column" className={classes.paginationGrid} alignItems="center" spacing={2}>
                        <Pagination 
                            count={Math.ceil(totalItems / itemsPerPage)}
                            page={activePage}
                            onChange={(event: object, page: number) => setActivePage(page)}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
        </Container>
        )
        
    )
}

const mapStateToProps = ({ product }: IRootState) => ({
    products: product.products,
    totalItems: product.totalItems,
    loading: product.loading,
    errorMessage: product.errorMessage
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        getAllProducts: (page: number, size: number, sort: string) => dispatch(getAllProducts(page, size, sort))
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Products);