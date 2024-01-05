import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectToken } from '../../features/users/userSlice';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/users/',
        prepareHeaders: (headers, { getState }) => {
            const token = selectToken(getState()); // Get the token from the Redux store
            if (token) {
                headers.set('token', `${token}`);
            }
            return headers;

        }
    }),
    tagTypes: 'User',
    endpoints: (builder) => ({

        registerUser: builder.mutation({
            query: (data) => ({
                url: 'register',
                method: 'POST',
                body: data
            })
        }),
        logInUser: builder.mutation({
            query: (data) => ({
                url: 'logIn',
                method: 'POST',
                body: data
            }),

        }),
        getProtection: builder.query({
            query: (data) => ({
                url: 'protected',
                method: 'GET',
                body: data
            }),

        }),

    })

})
export const { useRegisterUserMutation, useLogInUserMutation ,useGetProtectionQuery} = apiSlice