import { combineReducers } from "redux";
import product, { ProductState } from './product.reducer';
import cart, { CartState } from './cart.reducer';
import order, { OrderState } from "./order.reducer";
import auth, { AuthState } from './auth.reducer';
import user, { UserState } from "./user.reducer";

export interface IRootState {
    product: ProductState;
    cart: CartState;
    order: OrderState;
    auth: AuthState;
    user: UserState;
}

const rootReducer = combineReducers<IRootState>({
    product,
    cart,
    order,
    auth,
    user
})

export default rootReducer;