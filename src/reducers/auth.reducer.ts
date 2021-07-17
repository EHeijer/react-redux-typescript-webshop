import axios from "axios";
import { IJwtResponse } from "../model/jwt-response.model";
import { IUser } from "../model/user.model";
import { FAILURE, REQUEST, SUCCESS } from "./action-type.util";
import { createBrowserHistory } from 'history';
import { useHistory } from "react-router";
import { RoleType } from "../model/role.model";



export const ACTION_TYPES = {
    SIGN_IN: 'SIGN_IN',
    SIGN_UP: 'SIGN_UP',
    SIGN_OUT: 'SIGN_OUT',
    FETCH_USERS: 'FETCH_USERS',
    FETCH_USER: 'FETCH_USER',
    IS_TOKEN_VALID: 'IS_TOKEN_VALID'
}

const initialState = {
    loading: false,
    successMessage: null,
    errorMessage: null,
    loginErrorMessage: null,
    registerErrorMessage: null,
    isAuthenticated: false,
    loginSuccess: false,
    registerSuccess: false,
    loggedInUser: {} as IJwtResponse,
    successModalOpen: false,
    users: [] as Array<IUser>,
    user: {} as IUser,
    totalUsers: 0,
    isTokenValid: true
}

export interface AuthState {
    loading: boolean,
    successMessage: null,
    errorMessage: null,
    loginErrorMessage: null,
    registerErrorMessage: null,
    isAuthenticated: boolean,
    loginSuccess: boolean,
    registerSuccess: boolean,
    loggedInUser: {},
    successModalOpen: boolean,
    users: IUser[],
    user: {},
    totalUsers: number,
    isTokenValid: boolean
};

const AuthReducer = (state: AuthState = initialState, action: any): AuthState => {
    switch(action.type) {
        case REQUEST(ACTION_TYPES.SIGN_IN):
            return {
                ...state,
                loginErrorMessage: null,
                loading: true,
                isAuthenticated: false,
                loginSuccess: false
            };
        case REQUEST(ACTION_TYPES.SIGN_UP):
            return {
                ...state,
                registerErrorMessage: null,
                loading: true,
                successMessage: null,
                registerSuccess: false,
                successModalOpen: false
            }
        case REQUEST(ACTION_TYPES.SIGN_OUT):
            return {
                ...state,
                loading: true,
            }
        case REQUEST(ACTION_TYPES.FETCH_USERS):
        case REQUEST(ACTION_TYPES.FETCH_USER):
            return {
                ...state,
                loading: true,
                errorMessage: null
            }
        case REQUEST(ACTION_TYPES.IS_TOKEN_VALID):
            return {
                ...state,
                loading: true,
                errorMessage: null
            }
        case FAILURE(ACTION_TYPES.SIGN_IN):
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                loginSuccess: false,
                loginErrorMessage: action.payload
            }
        case FAILURE(ACTION_TYPES.SIGN_UP):
            return {
                ...state,
                loading: false,
                registerErrorMessage: action.payload,
                registerSuccess: false,
                successModalOpen: false
            }
        case FAILURE(ACTION_TYPES.SIGN_OUT):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            }
        case FAILURE(ACTION_TYPES.FETCH_USERS):
        case FAILURE(ACTION_TYPES.FETCH_USER):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            }
        case FAILURE(ACTION_TYPES.IS_TOKEN_VALID):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            }
        case SUCCESS(ACTION_TYPES.SIGN_IN):
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                loginSuccess: true,
                loggedInUser: action.payload,
                loginErrorMessage: null
            }
        case SUCCESS(ACTION_TYPES.SIGN_UP):
            return {
                ...state,
                loading: false,
                registerErrorMessage: null,
                successMessage: action.payload,
                registerSuccess: true,
                successModalOpen: true
            }
        case SUCCESS(ACTION_TYPES.SIGN_OUT):
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                loginSuccess: false,
                loggedInUser: {},
            }
        case SUCCESS(ACTION_TYPES.FETCH_USERS):
            return {
                ...state,
                loading: false,
                users: action.payload,
                totalUsers: action.payload.length
            }
        case SUCCESS(ACTION_TYPES.FETCH_USER):
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case SUCCESS(ACTION_TYPES.IS_TOKEN_VALID):
            return {
                ...state,
                loading: false,
                isTokenValid: action.payload
            }
        default:
            return state;
    }
}

//sign ip - Action creators
const signUpRequest = () => {
    return {
        type: REQUEST(ACTION_TYPES.SIGN_UP)
    }
}

const signUpSuccess = (successMessage: string) => {
    return {
        type: SUCCESS(ACTION_TYPES.SIGN_UP),
        payload: successMessage
    }
}

const signUpFailure = (error: string) => {
    return {
        type: FAILURE(ACTION_TYPES.SIGN_UP),
        payload: error
    }
}

//sign in - Action creators
const signInRequest = () => {
    return {
        type: REQUEST(ACTION_TYPES.SIGN_IN)
    }
}

const signInSuccess = (JwtResponse: IJwtResponse) => {
    return {
        type: SUCCESS(ACTION_TYPES.SIGN_IN),
        payload: JwtResponse
    }
}

const signInFailure = (error: string) => {
    return {
        type: FAILURE(ACTION_TYPES.SIGN_IN),
        payload: error
    }
}

//sign out - Action creators
const signOutRequest = () => {
    return {
        type: REQUEST(ACTION_TYPES.SIGN_OUT)
    }
}

const signOutSuccess = () => {
    return {
        type: SUCCESS(ACTION_TYPES.SIGN_OUT),
    }
}

const signOutFailure = (error: string) => {
    return {
        type: FAILURE(ACTION_TYPES.SIGN_OUT),
        payload: error
    }
}

//fetch users - Action creators
const fetchUsersRequest = () => {
    return {
        type: REQUEST(ACTION_TYPES.FETCH_USERS)
    }
}

const fetchUsersSuccess = (users: IUser[]) => {
    return {
        type: SUCCESS(ACTION_TYPES.FETCH_USERS),
        payload: users
    }
}

const fetchUsersFailure = (error: string) => {
    return {
        type: FAILURE(ACTION_TYPES.FETCH_USERS),
        payload: error
    }
}

//fetch user - Action creators
const fetchUserRequest = () => {
    return {
        type: REQUEST(ACTION_TYPES.FETCH_USER)
    }
}

const fetchUserSuccess = (user: IUser) => {
    return {
        type: SUCCESS(ACTION_TYPES.FETCH_USER),
        payload: user
    }
}

const fetchUserFailure = (error: string) => {
    return {
        type: FAILURE(ACTION_TYPES.FETCH_USER),
        payload: error
    }
}

//check token - Action creators
const isTokenValidRequest = () => {
    return {
        type: REQUEST(ACTION_TYPES.IS_TOKEN_VALID)
    }
}

const isTokenValidSuccess = (isTokenValid: boolean) => {
    return {
        type: SUCCESS(ACTION_TYPES.IS_TOKEN_VALID),
        payload: isTokenValid
    }
}

const isTokenValidFailure = (error: string) => {
    return {
        type: FAILURE(ACTION_TYPES.IS_TOKEN_VALID),
        payload: error
    }
}

const apiUrl = 'http://localhost:8080/api/auth';

export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
    const requestUrl = apiUrl + '/signup';
    return (dispatch: any) => {
        dispatch(signUpRequest);
        axios.post(requestUrl, {username, email, password, confirmPassword})
            .then(response => {
                const result = response.data.message;
                dispatch(signUpSuccess(result))
            })
            .catch(error => {
                const errorMsg = error.response.data.message;
                dispatch(signUpFailure(errorMsg))
            })
    }
}

export const signIn = (email: string, password: string, remember: boolean) => {
    const requestUrl = apiUrl + '/signin';
    return (dispatch: any) => {
        dispatch(signInRequest);
        axios.post(requestUrl, { email, password })
            .then(response => {
                const result = response.data;
                dispatch(signInSuccess(result))
                console.log(remember);
                if(result.accessToken) {
                    localStorage.setItem("currentUser", JSON.stringify(result))
                }
            })
            .catch(error => {
                const errorMsg = error.response.data.message;
                dispatch(signInFailure(errorMsg))
            })
    }
}
export const signOut = () => {
    
    return (dispatch: any) => {
        dispatch(signInRequest);
        try {
            localStorage.removeItem("currentUser");
            if(!localStorage.getItem("currentUser")){
                dispatch(signOutSuccess())
            }
        } catch (error) {
            const errorMsg = "Something went wrong!";
            dispatch(signOutFailure(errorMsg))
        }
    }
}

export const getAllUsers = () => {
    const requestUrl = 'http://localhost:8080/api/users';
    return (dispatch: any) => {
        dispatch(fetchUsersRequest);
        axios.get<IUser[]>(requestUrl)
        .then(response => {
            const users = response.data;
            dispatch(fetchUsersSuccess(users));
            console.log(users);
        })
        .catch(error => {
            const errorMsg = error.message
            console.log(errorMsg)
            dispatch(fetchUsersFailure(errorMsg));
        })
    };
}

export const getUserById = (id: number) => {
    const requestUrl = `http://localhost:8080/api/users/${id}`;
    return (dispatch: any) => {
        dispatch(fetchUserRequest);
        axios.get<IUser>(requestUrl)
        .then(response => {
            const user = response.data;
            dispatch(fetchUserSuccess(user));
            console.log(user);
        })
        .catch(error => {
            const errorMsg = error.message
            console.log(errorMsg)
            dispatch(fetchUserFailure(errorMsg));
        })
    };
}

export const checkIfTokenIsValid = (token: string) => {
    const requestUrl = `${apiUrl}/token-check`;
    console.log(token)
    return (dispatch: any) => {
        dispatch(isTokenValidRequest);
        axios.get<boolean>(requestUrl, {
            'headers': {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            const isValid = response.data;
            dispatch(isTokenValidSuccess(isValid));
        })
        .catch(error => {
            const errorMsg = error.message;
            dispatch(isTokenValidFailure(errorMsg));
        })
    }
}

export default AuthReducer;