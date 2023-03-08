import { createContext, useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const toastContext = createContext();

export const ToastProvider = ({ children }) => {


    const successnotify = (message) => toast.success(message);
    const errornotify = (message) => toast.error(message);



    let value = {
        successnotify, errornotify
    }
    return (
        <toastContext.Provider value={value}>
            {children}
        </toastContext.Provider>
    );
}



export const useToast = () => {
    return useContext(toastContext);
}