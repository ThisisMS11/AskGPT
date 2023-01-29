import { useAuth } from "./auth"
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { useState } from 'react'


export const AuthrequireLogin = ({ children }) => {
    // const { user, setUser } = useAuth();

    const user = JSON.parse(localStorage.getItem('userinfo'));

    const location = useLocation()
    if (!user) {
        return <Navigate to="/login" state={{ path: location.pathname }} />
    }

    return children
}