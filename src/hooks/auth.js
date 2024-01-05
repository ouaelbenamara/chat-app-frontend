import { useDispatch, useSelector } from "react-redux";
import { logOut, selectToken } from "../features/users/userSlice";
import { useGetProtectionQuery } from "../app/api/apiSlice";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const dispach = useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Use null as an initial value
    const token = useSelector(selectToken);
    const { status, isError, data } = useGetProtectionQuery();
console.log(token)
    useEffect(() => {
        const checkAuthentication = () => {
            try {
                if (status === 'fulfilled') {
                    console.log('fulfilled');
                    setIsAuthenticated(true);
                } else if (status === 'rejected') {
                    console.log('rejected');
                    // dispach(logOut())
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
            }
        };

        if (token) {
            checkAuthentication();
        } else {
            setIsAuthenticated(false);
        }
    }, [status, isError, data, token]);

    return isAuthenticated;
};