import { useDispatch, useSelector } from "react-redux";
import { logOut, selectToken, setCredentials } from "../features/users/userSlice";
import { useGetProtectionQuery, useSignOutUserMutation } from "../app/api/apiSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useAuth = () => {
    const dispach = useDispatch()
    // const {userId} = useParams()
    const userId = sessionStorage.getItem('userId')
    console.log('userId: ',userId)
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Use null as an initial value
    let name = `user_${userId}`;
    const token = localStorage.getItem('token')
console.log('totken',token)
    const { status, isError,error, data } = useGetProtectionQuery();
    const  [signOut,signOutResult] = useSignOutUserMutation();

    useEffect(() => {
        const checkAuthentication = async() => {
            try {
                if (status === 'fulfilled') {
                    setIsAuthenticated(true);
                } else if (status === 'rejected') {
                    console.log('logouqqqqt',error)
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
            console.log('token: ',token)
            checkAuthentication();
        } else {
            console.log('tonkenene')

            setIsAuthenticated(false);
        }
    }, [signOutResult, token, status]);

    return isAuthenticated;
};