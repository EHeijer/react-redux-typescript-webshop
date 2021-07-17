import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IJwtResponse } from "../model/jwt-response.model";
import { IRootState } from "../reducers";
import { checkIfTokenIsValid, signOut } from "../reducers/auth.reducer";

export function GetAuthorities() {
    const [authorities, setAuthorities] = useState([] as Array<string>);
    
        const setRoles = () => {
            const user: IJwtResponse = JSON.parse(localStorage.getItem('currentUser')!);
            if(user){
                const roles = user.roles!;
                setAuthorities(roles);
            }
        } 

    useEffect(() => {
        setRoles();
    }, [])
    return authorities;
}

export function GetCurrentUser() {
    const [currentUser, setCurrentUser] = useState({} as IJwtResponse | null);

    const setUser = () => {
        const user: IJwtResponse = JSON.parse(localStorage.getItem('currentUser')!);
        if(user){
            setCurrentUser(user);
            
        }else {
            setCurrentUser(null)
        }
    }

    useEffect(() => {
        setUser();
    }, [])
    
    return currentUser;
}

export function RemoveCurrentUserIfTokenHasExpired() {
    const dispatch = useDispatch();
    const isValid = useSelector((state: IRootState) => state.auth.isTokenValid);
    const myTimer: any = undefined;
    const [timer, setTimer] = useState(myTimer);
    const timerRef = useRef<NodeJS.Timeout>();
    const currentUser: IJwtResponse = JSON.parse(localStorage.getItem('currentUser')!);

    useEffect(() => {
        timerRef.current = timer;
        console.log(currentUser)
    }, [timer])
    
    useEffect(() => {
        if(currentUser){
            dispatch(checkIfTokenIsValid(currentUser.accessToken!));
            //Set interval on every minute
            const pollingTimer = setInterval(() => dispatch(checkIfTokenIsValid(currentUser.accessToken!)), 60000);
            setTimer(pollingTimer)
        }
    }, [dispatch])

    useEffect(() => {
        //Removes/logout current user from localstorage if token has expired
        if(!isValid && currentUser){
            dispatch(signOut());
        }
    }, [isValid])


} 
