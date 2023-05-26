import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import AuthHandler from "./AuthHandler";
import MainComponent from "../Components/MainComponent";

export const PrivateRoute = () => {
    
  return (
    AuthHandler.loggedIn() ? <Outlet/> : <Navigate to='/'/>
    )
  }

