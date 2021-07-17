import axios from "axios";
import { IJwtResponse } from "../model/jwt-response.model";
import { defaultValue, IUser } from "../model/user.model";
import { FAILURE, REQUEST, SUCCESS } from "./action-type.util";
import { signIn } from "./auth.reducer";

export const ACTION_TYPES = {
    UPDATE_USER: 'UPDATE_USER'
}

const initialState = {
    loading: false,
    errorMessage: null,
    users: [] as Array<IUser>,
    user: defaultValue
}

export type UserState = Readonly<typeof initialState>;

const UserReducer = (state: UserState = initialState, action: any): UserState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.UPDATE_USER):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.UPDATE_USER):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.UPDATE_USER):
            return {
                ...state,
                loading: false,
                user: action.payload
            };
        default:
            return state;
    }
}

//update user - Action creators
const updateUserRequest = () => {
    return {
        type: REQUEST(ACTION_TYPES.UPDATE_USER)
    }
}

const updateUserSuccess = (user: IUser) => {
    return {
        type: SUCCESS(ACTION_TYPES.UPDATE_USER),
        payload: user
    }
}

const updateUserFailure = (error: string) => {
    return {
        type: FAILURE(ACTION_TYPES.UPDATE_USER),
        payload: error
    }
}

const apiUrl = 'http://localhost:8080/api/users';

export const updateUser = (user: IUser, currentUser: IJwtResponse, token: string) => {
    return (dispatch: any) => {
        dispatch(updateUserRequest);
        axios.put(apiUrl, user, {
           'headers': {
               'Authorization': 'Bearer ' + token,
               'currentUserId': currentUser.id
           } 
        })
        .then(response => {
            const user: IUser = response.data;
            const newToken: string = response.headers['x-jwt'];
            dispatch(updateUserSuccess(user));

            /*Also update values on currentUser in localstorage if current user is
                the same as the user to update
            */
            let loggedInUser: IJwtResponse = JSON.parse(localStorage.getItem("currentUser")!);
            if(loggedInUser){
                if(loggedInUser.id === user.id){
                    loggedInUser.email = user.email;
                    loggedInUser.username = user.username;
                    loggedInUser.roles = user.roles!.map(role => role.roleName as string);
                    loggedInUser.accessToken = newToken;
                    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
                }
            }
        })
        .catch(error => {
            const errorMsg = error.message;
            dispatch(updateUserFailure(errorMsg));
        })
    };
};


export default UserReducer;