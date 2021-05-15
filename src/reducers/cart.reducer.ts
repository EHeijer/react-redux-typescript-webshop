import { ICartItem } from "../model/cart-item.model";
import { IProduct } from "../model/product.model";

export const ACTION_TYPES = {
    FETCH_CART_ITEM_LIST: 'FETCH_CART_ITEM_LIST',
    ADD_iTEM_TO_CART: 'ADD_iTEM_TO_CART',
    INCREASE_QUANTITY_OF_ITEM: 'INCREASE_QUANTITY_OF_ITEM',
    DECREASE_QUANTITY_OF_ITEM: 'DECREASE_QUANTITY_OF_ITEM',
    REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART'
}

const initialState = {
    cartItems: [] as Array<ICartItem>,
    cartSum: 0,
    numOfItems: 0,
}

export type CartState = Readonly<typeof initialState>;

const CartReducer = (state: CartState = initialState, action: any): CartState => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_CART_ITEM_LIST:
            return {
                ...state,
                cartItems: action.payload,
                cartSum: getCartSum(action.payload),
                numOfItems: action.payload ? action.payload.length : 0
            };
        case ACTION_TYPES.ADD_iTEM_TO_CART:
            return {
                ...state,
                cartItems: action.payload,
                cartSum: getCartSum(action.payload),
                numOfItems: action.payload ? action.payload.length : 0
            };
        case ACTION_TYPES.REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: action.payload,
                cartSum: getCartSum(action.payload),
                numOfItems: action.payload ? action.payload.length : 0
            };
        case ACTION_TYPES.INCREASE_QUANTITY_OF_ITEM:
            return {
                ...state,
                cartItems: action.payload,
                cartSum: getCartSum(action.payload),
            };
        case ACTION_TYPES.DECREASE_QUANTITY_OF_ITEM:
            return {
                ...state,
                cartItems: action.payload,
                cartSum: getCartSum(action.payload),
            };
        default:
            return state;
    }
}

const getCartSum = (cartItems: ICartItem[]) => {
    if(cartItems) {
        const calculateSum = cartItems.reduce((total, item) => {
            return total += item.item.price! * item.quantity;
        }, 0);
        return calculateSum;
    }
    return 0;
}

const fetchCartItems = (cartItems: ICartItem[]) => {
    return {
        type: ACTION_TYPES.FETCH_CART_ITEM_LIST,
        payload: cartItems
    }
}

const addToCart = (cartItems: ICartItem[]) => {
    return {
        type: ACTION_TYPES.ADD_iTEM_TO_CART,
        payload: cartItems
    }
}

const removeFromCart = (cartItems: ICartItem[]) => {
    return {
        type: ACTION_TYPES.REMOVE_ITEM_FROM_CART,
        payload: cartItems
    }
}

const increaseQuantity = (cartItems: ICartItem[]) => {
    return {
        type: ACTION_TYPES.INCREASE_QUANTITY_OF_ITEM,
        payload: cartItems
    }
}

const decreaseQuantity = (cartItems: ICartItem[]) => {
    return {
        type: ACTION_TYPES.DECREASE_QUANTITY_OF_ITEM,
        payload: cartItems
    }
}

export const getAllCartItems = () => {
    return(dispatch: any) => {
        const cartItems = JSON.parse(localStorage.getItem("cart")!);
        dispatch(fetchCartItems(cartItems))
    };
}

export const addItemToCart = (product: IProduct) => {
    return(dispatch: any) => {
        let cart = [] as Array<ICartItem>;
        const cartItem = {
            item: product,
            quantity: 1
        }
        if(!localStorage.getItem("cart")){
            cart = [...cart, cartItem];
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(addToCart(cart))
        } else {
            cart = JSON.parse(localStorage.getItem('cart')!);
            const findExistingItem = cart.find(item => item.item.id === product.id);
            if(findExistingItem) {
                findExistingItem.quantity += 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                dispatch(addToCart(cart));
            } else {
                cart = [...cart, cartItem];
                localStorage.setItem("cart", JSON.stringify(cart));
                dispatch(addToCart(cart));
            }
            
        }
    }
}

export const removeItemFromCart = (cartItem: ICartItem) => {
    return(dispatch: any) => {
        let cart: ICartItem[] = JSON.parse(localStorage.getItem('cart')!);
        const findExistingItem = cart.find(item => item.item.id === cartItem.item.id);
        if(findExistingItem) {
            cart.splice(cart.indexOf(findExistingItem), 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(removeFromCart(cart));
        }
    }
}

export const increaseQuantityOfItemInCart = (cartItem: ICartItem) => {
    return(dispatch: any) => {
        let cart: ICartItem[] = JSON.parse(localStorage.getItem('cart')!);
        const findExistingItem = cart.find(item => item.item.id === cartItem.item.id);
        if(findExistingItem) {
            findExistingItem.quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(increaseQuantity(cart));
        }
    }
}

export const decreaseQuantityOfItemInCart = (cartItem: ICartItem) => {
    return(dispatch: any) => {
        let cart: ICartItem[] = JSON.parse(localStorage.getItem('cart')!);
        const findExistingItem = cart.find(item => item.item.id === cartItem.item.id);
        if(findExistingItem) {
            if(findExistingItem.quantity === 1) {
                dispatch(removeItemFromCart(cartItem));
            }else {
                findExistingItem.quantity -= 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                dispatch(decreaseQuantity(cart));
            }
        }
    }
}


export default CartReducer;