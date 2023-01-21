import React, { useState } from 'react'
import validationContext from './validationContext'

const ValidationState = (props) => {


    //! username
    const [usernamevalid, setUsernamevalid] = useState('hidden')
    const usernameChecker = (username) => {
        if (username.length < 7) {
            setUsernamevalid('block')
        }
        else {
            setUsernamevalid('hidden')
        }
    }

    //! displayname
    const [displaynamevalid, setDisplaynamevalid] = useState('hidden')
    const displaynameChecker = (username) => {
        if (username.length < 7) {
            setDisplaynamevalid('block')
        }
        else {
            setDisplaynamevalid('hidden')
        }
    }


    //! email
    const [emailvalid, setEmailvalid] = useState('hidden')
    function emailChecker(email) {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setEmailvalid('block')
        }
        else {
            setEmailvalid('hidden')
        }
    }


    //! password
    const [passwordvalid, setPasswordvalid] = useState('hidden')
    function passwordChecker(password) {
        // small + Capital + special character + in the range of (6,16);
        var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;;
        if (!re.test(password)) {
            setPasswordvalid('block')
        }
        else {
            setPasswordvalid('hidden')
        }
    }

    //! Confirm Password
    const [cpasswordvalid, setCpasswordvalid] = useState('hidden')
    function CpasswordChecker(password) {
        // small + Capital + special character + in the range of (6,16);
        var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;;
        if (!re.test(password)) {
            setPasswordvalid('block')
        }
        else {
            setPasswordvalid('hidden')
        }
    }





    return (
        <validationContext.Provider value={{
            usernamevalid, setUsernamevalid, usernameChecker,
            displaynamevalid, displaynameChecker,
            emailvalid, setEmailvalid, emailChecker,
            passwordvalid, setPasswordvalid, passwordChecker,
            cpasswordvalid, CpasswordChecker, setCpasswordvalid
        }}>
            {props.children}
        </validationContext.Provider>
    )
}

export default ValidationState;