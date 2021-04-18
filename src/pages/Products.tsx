import { Container, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getSortState, IPaginationBaseState } from '../components/utils/pagination'
import { IRootState } from '../reducers/index'
import { getAllProducts } from '../reducers/product.reducer'

export interface IProductsProp extends StateProps, DispatchProps, RouteComponentProps { }

const useStyles = makeStyles((theme: Theme) => {
    return {
        productContainer: {
            paddingTop: 100,
        },
        gridContainer: {
            padding: 15

        },
        productItem: {
            maxWidth: 300
        }
    }
})

export type IProductsState = IPaginationBaseState;

export const Products = (props: IProductsProp) => {
    const { products } = props;
    const classes = useStyles();
    const [activePage, setActivePage] = useState(1);
    const [productsState, setProductsState] = useState(
        {...getSortState(props.location, 12) } as IProductsState
    );

    const getProducts = () => {
        const { itemsPerPage, sort, order } = productsState;
        props.getAllProducts(activePage - 1, itemsPerPage, `${sort},${order}`);
    };

    useEffect(() => {
        getProducts();
    }, [activePage]);
    
    return (
        <Container fixed className={classes.productContainer}>
            <Typography variant="h4" gutterBottom color="primary" align="center">ALL PRODUCTS</Typography>
            <Grid container spacing={3} justify="center" className={classes.gridContainer}>
                {products ? products.map((product, i) => (
                    <Grid item className={classes.productItem} key={product.id}>
                        <ProductCard product={product}/>
                    </Grid>
                )) : null}
                {/* <Grid className={classes.productItem} item  >
                    <ProductCard />
                </Grid>
                <Grid className={classes.productItem} item >
                    <ProductCard />
                </Grid>
                <Grid className={classes.productItem} item>
                    <ProductCard />
                </Grid>
                <Grid className={classes.productItem} item>
                    <ProductCard />
                </Grid>
                <Grid className={classes.productItem} item  >
                    <ProductCard />
                </Grid>
                <Grid className={classes.productItem} item >
                    <ProductCard />
                </Grid> */}
            </Grid>
        </Container>
    )
}

const mapStateToProps = ({ product }: IRootState) => ({
    products: product.entities
})

const mapDispatchToProps = { getAllProducts };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Products);