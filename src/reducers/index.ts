import { combineReducers } from "redux";
import product, { ProductState } from './product.reducer';

export interface IRootState {
    readonly product: ProductState;
}

const rootReducer = combineReducers<IRootState>({
    product
})

export default rootReducer;