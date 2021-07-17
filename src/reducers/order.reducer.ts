import axios from "axios";
import { ICartItem } from "../model/cart-item.model";
import { IOrder, defaultValue } from "../model/order.model"
import { FAILURE, REQUEST, SUCCESS } from "./action-type.util";

export const ACTION_TYPES = {
    FETCH_ORDER_LIST: 'FETCH_ORDER_LIST',
    FETCH_ORDER_LIST_BY_CURRENT_USER: 'FETCH_ORDER_LIST_BY_CURRENT_USER',
    FETCH_ORDER : 'FETCH_ORDER',
    SEND_ORDER : 'SEND_ORDER',
}

const initialState = {
    loading: false,
    errorMessage: null,
    orders: [] as Array<IOrder>,
    totalItems: 0,
    order: defaultValue
}

export type OrderState = Readonly<typeof initialState>;

const OrderReducer = (state: OrderState = initialState, action: any): OrderState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_ORDER_LIST):
        case REQUEST(ACTION_TYPES.FETCH_ORDER_LIST_BY_CURRENT_USER):
        case REQUEST(ACTION_TYPES.FETCH_ORDER):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case REQUEST(ACTION_TYPES.SEND_ORDER):
            return {
                ...state,
                errorMessage: null
            };
        case FAILURE(ACTION_TYPES.FETCH_ORDER_LIST):
        case FAILURE(ACTION_TYPES.FETCH_ORDER_LIST_BY_CURRENT_USER):
        case FAILURE(ACTION_TYPES.FETCH_ORDER):
        case FAILURE(ACTION_TYPES.SEND_ORDER):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.FETCH_ORDER_LIST):
        case SUCCESS(ACTION_TYPES.FETCH_ORDER_LIST_BY_CURRENT_USER):  
            return {
                ...state,
                loading: false,
                orders: action.payload,
                totalItems: parseInt(action.headers['x-total-items'])
            };
        case SUCCESS(ACTION_TYPES.FETCH_ORDER):  
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        case SUCCESS(ACTION_TYPES.SEND_ORDER):  
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        default:
            return state;
    }
}

//send order - Action creators
const sendOrderRequest = () => {
    return {
        type: REQUEST(ACTION_TYPES.SEND_ORDER)
    }
}

const sendOrderSuccess = (order: IOrder) => {
    return {
        type: SUCCESS(ACTION_TYPES.SEND_ORDER),
        payload: order
    }
}

const sendOrderFailure = (error: string) => {
    return {
        type: FAILURE(ACTION_TYPES.SEND_ORDER),
        payload: error
    }
}

//fetch order by current user - Action creators
const fetchOrdersByCurrentUserRequest = () => {
    return {
        type: REQUEST(ACTION_TYPES.FETCH_ORDER_LIST_BY_CURRENT_USER)
    }
}

const fetchOrdersByCurrentUserSuccess = (orders: IOrder[], headers: string[]) => {
    return {
        type: SUCCESS(ACTION_TYPES.FETCH_ORDER_LIST_BY_CURRENT_USER),
        payload: orders,
        headers: headers
    }
}

const fetchOrdersByCurrentUserFailure = (error: string) => {
    return {
        type: FAILURE(ACTION_TYPES.FETCH_ORDER_LIST_BY_CURRENT_USER),
        payload: error
    }
}

const apiUrl = 'http://localhost:8080/api/orders';

export const sendOrder = (order: IOrder, token: string) => {
    return (dispatch: any) => {
        dispatch(sendOrderRequest);
        axios.post(apiUrl, order, {
           'headers': {
               'Authorization': 'Bearer ' + token
           } 
        })
        .then(response => {
            const order = response.data;
            dispatch(sendOrderSuccess(order));

            if(localStorage.getItem("cart")){
                let cart = JSON.parse(localStorage.getItem('cart')!);
                cart = [];
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        })
        .catch(error => {
            const errorMsg = error.message;
            dispatch(sendOrderFailure(errorMsg));
        })
    };
};

export const getOrdersByCurrentUser = (page: number, size: number, sort: string, token: string) => {
    console.log(token)
    const requestUrl = `${apiUrl}-by-user${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return (dispatch: any) => {
        dispatch(fetchOrdersByCurrentUserRequest);
        axios.get<IOrder[]>(requestUrl, {
            'headers': {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            const orders = response.data;
            const headers = response.headers;
            dispatch(fetchOrdersByCurrentUserSuccess(orders, headers));
        })
        .catch(error => {
            const errorMsg = error.message;
            dispatch(fetchOrdersByCurrentUserFailure(errorMsg));
        })
    };
};

export default OrderReducer;