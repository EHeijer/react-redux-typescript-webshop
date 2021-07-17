import { makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import DrawerComponent from "../components/layout/DrawerComponent";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import OrderTable from "../components/OrderTable";
import ProfileCard from "../components/ProfileCard";
import { IJwtResponse } from "../model/jwt-response.model";
import { IRootState } from "../reducers";
import { getUserById } from "../reducers/auth.reducer";
import { getOrdersByCurrentUser } from "../reducers/order.reducer";
import ErrorPage from "./ErrorPage";

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            display: 'flex',
            background: '#ebebeb',
        },
        flex: {
            display: 'flex',
            flexDirection: 'column',
            width: `calc(100% - ${drawerWidth}px)`,
            flexGrow: 1,
        },
        page: {
            padding: '120px 100px',
            display: 'flex',
            justifyContent: 'center',
            
        }
    }
    
})

export interface ICustomerPageProp extends StateProps{
    getUserById: any,
    currentUser: IJwtResponse | null,
    getOrdersByCurrentUser: any
}

function CustomerPage(props: ICustomerPageProp) {
    const classes = useStyles();
    const {user, currentUser, loading, errorMessage, orders, totalItems} = props;
    const [sort, setSort] = useState("");
    const [order, setOrder] = useState("");
    const itemsPerPage = 8;
    const [activePage, setActivePage] = useState(1);
    

    const handleChangePage = (page: number) => {
        setActivePage(page);
    }
    
    useEffect(() => {
        console.log(currentUser)
        if(currentUser) {
            props.getUserById(currentUser.id!);
        }
    }, [])
    useEffect(() => {
        if(currentUser) {
            const token = currentUser.accessToken;
            props.getOrdersByCurrentUser(activePage - 1, itemsPerPage, `${sort},${order}`, token);
        }
    }, [activePage])
    return (
        loading ? (
            <h2>Loading...</h2>
        ) : (
        <div className={classes.root}>
            <DrawerComponent />
            <Navbar />
            <div className={classes.flex}>
                <div className={classes.page}>
                    <ProfileCard user={user}/>
                    <OrderTable 
                        orders={orders} 
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        activePage={activePage}
                        handleChangePage={handleChangePage}
                    />
                </div>
            </div>
        </div>
        )
    )
}

const mapStateToProps = ({ auth, order }: IRootState) => ({
    user: auth.user,
    loading: auth.loading,
    errorMessage: auth.errorMessage,
    orders: order.orders,
    totalItems: order.totalItems
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        getUserById: (id: number) => dispatch(getUserById(id)),
        getOrdersByCurrentUser: (page: number, size: number, sort: string, token: string) => dispatch(getOrdersByCurrentUser(page, size, sort, token))
    }
}

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);