import {  Switch, Route } from 'react-router-dom'
import Clothes from './pages/Clothes';
import Home from "./pages/Home";
import OrderConfirm from './pages/OrderConfirm';
import Products from './pages/Products';
import Shoes from './pages/Shoes';
import Supplements from './pages/Supplements';


const Routes = () => (
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/products">
            <Products />
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
    </Switch>
)

export default Routes;