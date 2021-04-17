import { Button, InputBase, makeStyles, Paper, Theme, Typography } from '@material-ui/core'

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) => {
    return {
        footer: {
            height: 200,
            background: theme.palette.primary.light,
            padding: '3rem 0'
        },
        footerContainer: {
            height: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'column'
        },
        emailForm: {
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(2),
            flex: 1
        },
        submitButton: {
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: 14,
            borderRadius: '0 3px 3px 0',
            '&:hover': {
                color: theme.palette.secondary.dark,
                background: theme.palette.primary.main
            },
        },
        text: {
            width: 450,
            textAlign: 'center'
        }
    }
    
})

export default function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <div className={classes.footerContainer}>
                <Typography variant="h6" >SUBSCRIBE FOR 10% OFF YOUR FIRST ORDER</Typography>
                <Paper component="form" className={classes.emailForm}>
                    <InputBase className={classes.input} placeholder="E-MAIL ADRESS"/>
                    <Button type="submit" className={classes.submitButton}>SUBSCRIBE</Button>
                </Paper>
                <Typography variant="body2" className={classes.text}>
                BlackButterfly will use your e-mail to be in touch with you regarding product updates, exclusive offers and other relevant marketing!
                </Typography>
            </div>
        </footer>
    )
}
