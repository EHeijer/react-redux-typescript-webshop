import { Card, Container, Grid, makeStyles } from '@material-ui/core'
import React from 'react'


const categories = [
    {
        category: 'supplement',
        image: './c4.jpg'
    },
    {
        category: 'clothes',
        image: './gasp-sweather.jpg'
    },
    {
        category: 'shoes',
        image: './under-armour-shoes.jpg'
    }
]

const useStyles = makeStyles(() => {
    return {
        bannerContainer: {
            backgroundImage: `url(./banner5.jpg)`,
            backgroundSize: 'cover',
            minWidth: '100%',
            minHeight: '80vh',
            marginBottom: 30
        },
        categoryGrid: {
            width: '60%',
            height: '500px',
            margin: 'auto'
        },
        leftSide: {
            height: '50%'
        },
        card: {
            backgroundSize: 'cover',
            width: '100%',
            height: '100%',
            backgroundPosition: 'center',
            borderRadius: 0
        },

        supplementCard: {
            backgroundImage: `url(./protein.jpg)`,
        },
        clothesCard: {
            backgroundImage: `url(./clothes.jpg)`,
        },
        shoesCard: {
            backgroundImage: `url(./shoes.jpg)`,
        }
    }
    
})

export default function Home() {
    const classes = useStyles();
    return (
        <div className="root">
            <Container className={classes.bannerContainer}>
                <div></div>
            </Container>
            <Grid container spacing={2} className={classes.categoryGrid}>
                {/* {categories.map(item => (
                    <Grid item key={item.category}>{item.image}</Grid>
                ))} */}
                <Grid container spacing={2} item xs={6} direction="column" >
                    <Grid item className={classes.leftSide}>
                        <Card className={classes.supplementCard+' '+classes.card} variant="outlined"></Card>
                    </Grid>
                    <Grid item className={classes.leftSide}>
                        <Card className={classes.clothesCard+' '+classes.card} variant="outlined"></Card>
                    </Grid>
                </Grid>
                
                <Grid item xs={6}>
                    <Card className={classes.shoesCard+' '+classes.card} variant="outlined"></Card>
                </Grid>
            </Grid>
        </div>
    )
}