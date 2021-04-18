import axios from "axios";
import { IProduct } from "../model/product.model"
import { FAILURE, REQUEST, SUCCESS } from "./action-type.util";

export const ACTION_TYPES = {
    FETCH_PRODUCT_LIST: 'techformance/FETCH_PRODUCT_LIST',
    FETCH_PRODUCT_LIST_BY_CATERGORY: 'techformance/FETCH_PRODUCT_LIST_BY_CATERGORY'
}

const initialState = {
    loading: false,
    errorMessage: null,
    entities: [] as Array<IProduct>
}

export type ProductState = Readonly<typeof initialState>;

const ProductReducer = (state: ProductState = initialState, action: any): ProductState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_PRODUCT_LIST):
        case REQUEST(ACTION_TYPES.FETCH_PRODUCT_LIST_BY_CATERGORY):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.FETCH_PRODUCT_LIST):
        case FAILURE(ACTION_TYPES.FETCH_PRODUCT_LIST_BY_CATERGORY):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_LIST):
        case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_LIST_BY_CATERGORY):
            return {
                ...state,
                loading: false,
                entities: action.payload.data,
            };
        default:
            return state;
    }
}

const apiUrl = 'http://localhost:8080/api/products';

export const getAllProducts = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_PRODUCT_LIST,
        payload: axios.get<IProduct>(requestUrl)
    };
}

export default ProductReducer;