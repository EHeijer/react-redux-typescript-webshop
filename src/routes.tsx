import {  Switch, Route } from 'react-router-dom'
import { RoleType } from './model/role.model';
import AdminOrders from './pages/admin/AdminOrders';
import AdminPage from './pages/admin/AdminPage';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import Dashboard from './pages/admin/Dashboard';
import Statistics from './pages/admin/Statistics';
import Clothes from './pages/Clothes';
import CustomerPage from './pages/CustomerPage';
import EmployeePage from './pages/EmployeePage';
import ErrorPage from './pages/ErrorPage';
import Home from "./pages/Home";
import OrderConfirm from './pages/OrderConfirm';
import Products from './pages/Products';
import ProductsAfterSearch from './pages/ProductsAfterSearch';
import Shoes from './pages/Shoes';
import Supplements from './pages/Supplements';
import { GetAuthorities } from './shared/autentication';

function getRoles() {
    return GetAuthorities();
} 
const Routes = () => (
    <div>
        
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/products">
                <Products />
            </Route>
            <Route path="/search/:input">
                <ProductsAfterSearch/>
            </Route>
            <Route path="/supplements">
                <Supplements/>
            </Route>
            <Route path="/clothes">
                <Clothes />
            </Route>
            <Route path="/shoes">
                <Shoes />
            </Route>
            <Route path="/order-confirm">
                <OrderConfirm />
            </Route>
            <Route path="/error-page">
                <ErrorPage />
            </Route>
        </Switch>
        
        <Switch>
            <Route exact path="/account">
                {getRoles().includes(RoleType.ROLE_ADMIN) ? 
                    <Dashboard />
                : null}
                
            </Route>
            <Route path="/account/products">
                <AdminProducts />
            </Route>
            <Route path="/account/orders">
                <AdminOrders />
            </Route>
            <Route path="/account/users">
                <AdminUsers />
            </Route>
            <Route path="/account/statistics">
                <Statistics />
            </Route>
        </Switch>
    </div>
    
)

export default Routes;