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
import ErrorPage from "./ErrorPage";

export interface IProductsProp extends StateProps{ 
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
        itemWrapper: {
            display: 'grid',
            width: '75%',
            margin: 'auto',
            '@media (min-width: 900px)': {
                gridTemplateColumns: 'repeat(2, 1fr)',
            },
            '@media (min-width: 1200px)': {
                gridTemplateColumns: 'repeat(3, 1fr)',
            },
            '@media (min-width: 1500px)': {
                gridTemplateColumns: 'repeat(4, 1fr)',
            },
        },
        productItem: {
            maxWidth: 400,
            justifySelf: 'center'
        },
        paginationGrid: {
            marginTop: 30
        }
    }
})

function Products(props: IProductsProp) {
    const { products, totalItems, loading, errorMessage} = props;
    const classes = useStyles();
    const [activePage, setActivePage] = useState(1);
    const [sort, setSort] = useState("");
    const [order, setOrder] = useState("");
    const itemsPerPage = 8;

    useEffect(() => {
        props.getAllProducts(activePage - 1, itemsPerPage, `${sort},${order}`);
    }, [activePage]);

    return (
        loading ? (
            <h2>Loading...</h2>
        ) : errorMessage ? (
            <ErrorPage />
        ) : (
            <Container fixed className={classes.productContainer}>
            <Typography variant="h4" gutterBottom color="primary" align="center">ALL PRODUCTS</Typography>
                <Grid container className={classes.gridContainer}>
                    <Grid container item spacing={3} justify="center" className={classes.itemWrapper} >
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
                        disabled={totalItems <= itemsPerPage}
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