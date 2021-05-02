import axios from "axios";
import { IProduct } from "../model/product.model"
import { FAILURE, REQUEST, SUCCESS } from "./action-type.util";

export const ACTION_TYPES = {
    FETCH_PRODUCT_LIST: 'FETCH_PRODUCT_LIST',
    FETCH_PRODUCT_LIST_BY_CATERGORY: 'FETCH_PRODUCT_LIST_BY_CATERGORY'
}

const initialState = {
    loading: false,
    errorMessage: null,
    products: [] as Array<IProduct>,
    totalItems: 0
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
                products: action.payload,
                totalItems: action.payload.length
            };
        default:
            return state;
    }
}

const fetchProductsRequest = () => {
    return {
        type: REQUEST(ACTION_TYPES.FETCH_PRODUCT_LIST)
    }
}

const fetchProductsSuccess = (products: IProduct[]) => {
    return {
        type: SUCCESS(ACTION_TYPES.FETCH_PRODUCT_LIST),
        payload: products
    }
}

const fetchProductsFailure = (error: string) => {
    return {
        type: FAILURE(ACTION_TYPES.FETCH_PRODUCT_LIST),
        payload: error
    }
}

const apiUrl = 'http://localhost:8080/api/products';

export const getAllProducts = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return (dispatch: any) => {
        dispatch(fetchProductsRequest)
        axios.get<IProduct[]>(requestUrl)
        .then(response => {
            const products = response.data
            dispatch(fetchProductsSuccess(products))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchProductsFailure(errorMsg))
        })
    };
}

export default ProductReducer;