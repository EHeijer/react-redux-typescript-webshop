import { combineReducers } from "redux";
import product, { ProductState } from './product.reducer';
import cart, { CartState } from './cart.reducer';
import order, { OrderState } from "./order.reducer";

export interface IRootState {
    product: ProductState;
    cart: CartState;
    order: OrderState;
}

const rootReducer = combineReducers<IRootState>({
    product,
    cart,
    order
})

export default rootReducer;