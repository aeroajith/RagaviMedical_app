import axios from "axios"
import Config from "./config"
import {reactLocalStorage} from 'reactjs-localstorage'

class AuthHandler{
    static login (username,password,callback){

        axios.post(Config.loginURL,{username:username,password:password})
        .then(function(response){
            if(response.status===200){
                reactLocalStorage.set("token",response.data.access)
                reactLocalStorage.set("refresh",response.data.refresh)
                callback({error:false,message:"Login Successfull..."})
            }
            
        })
        .catch(function(error){
            console.log(error.response)
            callback({error:true,message:"Error During Login Invalid Login Details.."})
        })

    }
    static loggedIn(){
        if(reactLocalStorage.get("token") && reactLocalStorage.get("refresh")){
            return true
        }else{
            return false
        }
        
    }

    static getLoginToken(){
        return reactLocalStorage.get("token")
    }
    static getRefreshToken(){
        return reactLocalStorage.get("refresh")
    }
    static logoutUser(){
        reactLocalStorage.remove("token")
        reactLocalStorage.remove("refresh")
    }

    static checkTokenExpiry(){
        var expire = false; 
        var token = this.getLoginToken();
        var tokenArray = token.split(".");
        var jwt=JSON.parse(atob(tokenArray[1]));
        //console.log(jwt)
        if(jwt && jwt.exp && Number.isFinite(jwt.exp)){
            expire=jwt.exp*100
        }else{
            expire=false
        }
        if(!expire){
            return false
        }
        return Date.now() > expire;
    }
}

export default AuthHandler