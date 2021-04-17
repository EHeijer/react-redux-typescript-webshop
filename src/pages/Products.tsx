import { Container, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import ProductCard from '../components/ProductCard'

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

export default function Products() {
    const classes = useStyles();

    return (
        <div>
            <Container fixed className={classes.productContainer}>
                <Typography variant="h4" gutterBottom color="primary" align="center">ALL PRODUCTS</Typography>
                <Grid container spacing={3} justify="center" className={classes.gridContainer}>
                    <Grid className={classes.productItem} item  >
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
                    </Grid>
                  
                    
                </Grid>
            </Container>
            
        </div>
    )
}
