import { useContext, createContext, useState } from "react";
import axios from "axios";
const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     auth.onAuthStateChanged((user) => {
    //         setUser(user);
    //         setLoading(false);
    //     });
    // }, []);


    //! to Get Access to User Information with the help of token
    const GetUserInfo = async (token) => {

        await axios.get('https://stack-overflow-a2dm.onrender.com/api/v1/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON',
                'authorisation': `Bearer ${token}`
            }
        })
            .then((res) => {
                // console.log('GetUserInfo Response : ', res);
                if (res.data.success) {

                    // Storing the userinfo in localStorage so that we don't use the user incase our application page refreshes.

                    const toString = JSON.stringify(res.data.data.user);
                    localStorage.setItem('userinfo', toString);

                    return true;
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const value = {
        user,
        setUser,
        GetUserInfo
    };

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(authContext);
}