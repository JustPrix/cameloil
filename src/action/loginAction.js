import axios from "axios";
import { baseUrl, headers } from "variables/general";
import setAuthorizationToken from "variables/setAuthorizationToken";
import { SET_CURRENT_USER} from "./types";

export async function refreshToken(token){
    const refrehTokenheaders ={
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token,
        "isRefreshToken": true
    };  
    const res = await axios.get(baseUrl + "user/refreshtoken", { headers: refrehTokenheaders });
    const refreshtoken = res.data.token;
    console.log("Refresh Token");
    console.log(res.data);
    localStorage.setItem("refreshtoken", refreshtoken);
    setAuthorizationToken(refreshtoken);    
}

export function dispatchRefreshToken(token){
    return dispatch =>{
        const refrehTokenheaders ={
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token,
            "isRefreshToken": true
        };  
        return axios.get(baseUrl + "user/refreshtoken", { headers: refrehTokenheaders }).then(
            (res) =>{
                const refreshtoken = res.data.token;
                console.log("Refresh Token");
                console.log(res.data);
                localStorage.setItem("refreshtoken", refreshtoken);
                setAuthorizationToken(refreshtoken);
                axios.get(baseUrl + "user/me", {headers: {"Authorization": "Bearer "+refreshtoken,}}).then(
                    (response) =>{
                        console.log("dispatch Get User");
                        console.log(response.data);
                        dispatch(setCurrentUser(response.data));
                    },
                    (err)=>{
                        console.log(err.response.data)
                    }
                )
            },
            (err) =>{
                console.log(err.response.data)
            }
        )
    
    } 
}

export function getUser(){   
    return dispatch =>{
        return axios.get(baseUrl + "user/me").then(
            (response) =>{
                console.log("Get User fom index");
                console.log(response.data);
              
                    dispatch(setCurrentUser(response.data));
                
            },
            (err)=>{
                console.log(err.response.data)
            }
        )
        
        
    }
    
}

export function logOut(){
    console.log("Log out action");
    setAuthorizationToken(false);
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
}

export function setCurrentUser(user){
    console.log("setCurrent...User: "+ user.username)
    return {
        type: SET_CURRENT_USER,
        user
    };
}


export function loginAction(data){  
    return dispatch =>{
        return axios.post(baseUrl+"user/login", data, {headers: headers}).then(
            res => { 
                const token = res.data.token;
                console.log(res.data);
                localStorage.setItem("accesstoken",token);
                dispatch(dispatchRefreshToken(token));
            }
        );
    }
}