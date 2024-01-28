import { useDispatch, useSelector } from "react-redux";
import { logOut, selectToken, setCredentials } from "../features/users/userSlice";
import { useGetProtectionQuery, useSignOutUserMutation } from "../app/api/apiSlice";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const dispach = useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Use null as an initial value
    const token = useSelector(selectToken);
    const { status, isError,error, data } = useGetProtectionQuery();
    const  [signOut,signOutResult] = useSignOutUserMutation();

    useEffect(() => {
        const checkAuthentication = async() => {
            try {
                if (status === 'fulfilled') {
                    setIsAuthenticated(true);
                } else if (status === 'rejected') {
                    console.log('logout',error)
                    dispach(logOut())

                    await  signOut()
                    if (signOutResult.status==='rejected'){
                        console.log('logoutrrrr')

                    }
                    setIsAuthenticated(false);
                    console.log('logoutsssss')

                }
            } catch (error) {
                console.log(error)

                setIsAuthenticated(false);
            }
        };

        if (token!==null) {
            console.log(token)
            checkAuthentication();
        } else {
            console.log('tonkenene')

            setIsAuthenticated(false);
        }
    }, [signOutResult, token, status]);

    return isAuthenticated;
};