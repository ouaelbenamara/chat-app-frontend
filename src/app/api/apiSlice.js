import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectToken } from '../../features/users/userSlice';
import { SignalCellularNullOutlined } from '@mui/icons-material';
// import { userId } from '../../components/Chatbar/ChatBar';
// const userId = sessionStorage.getItem('userId')
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
        prepareHeaders: (headers, { getState }) => {
            const token = selectToken(getState())// Get the token from the Redux store
            if (token) {
                console.log('TOKEN', token)
                headers.set('token', `${token}`);
            }
            return headers;

        }
    }),
    tagTypes: 'User',
    endpoints: (builder) => ({

        registerUser: builder.mutation({
            query: (data) => ({
                url: 'users/register',
                method: 'POST',
                body: data
            })
        }),

        getUsers: builder.query({
            query: () => ({
                url: 'users/',
                method: 'GET',
            })
        }),

        getUser: builder.query({
            query: (data) => ({
                url: `users/user/${data?._id}`,
                method: 'GET',
            })
        }),

        logInUser: builder.mutation({
            query: (data) => ({
                url: 'users/logIn',
                method: 'POST',
                body: data
            }),

        }),

        updateUser: builder.mutation({
            query: (data) => ({
                url: `users/update/${data.userId}`,
                method: 'PUT',
                body: { email: data?.email, username: data?.username, password: data?.password, image: data?.image }
            }),

        }),

        signOutUser: builder.mutation({
            query: () => ({
                url: 'users/signOut',
                method: 'POST',
                body: ''
            }),

        }),
        addRequest: builder.mutation({
            query: ({ sender, destination }) => ({

                url: `users/addRequest`,
                method: 'POST',
                body: { sender, destination }
            }),

        }),
        acceptAddRequest: builder.mutation({
            query: ({ userId, sender }) => ({

                url: `users/addRequest/accept/${userId}`,
                method: 'POST',
                body: { sender }
            }),

        }),
        // removeAddRequest: builder.mutation({
        //     query: ({ userId, sender }) => ({

        //         url: `users/addRequest/remove/${userId}`,
        //         method: 'PUT',
        //         body: { sender }
        //     }),

        // }),
        removeFriend: builder.mutation({
            query: ({ userId, friendId }) => ({

                url: `users/removeFriend/${userId}`,
                method: 'PUT',
                body: { friendId }
            }),

        }),
        getAddRequest: builder.query({
            query: (userId) => ({

                url: `users/addRequest/:${userId}`,
                method: 'GET',

            }),

        }),

        getProtection: builder.query({
            query: () => ({
                url: 'users/protected',
                method: 'GET',
            }),

        }),

        getMessages: builder.mutation({
            query: ({ userId=null, distination }) => ({
                url: `messages/${distination}`,
                method: 'POST',
                body:{userId}
            }),

        }),

        updateMessage: builder.mutation({
            query: (messageId, userId) => ({
                url: `messages/update/${messageId}/${userId}`,
                method: 'PUT',
            }),

        }),
        deleteMessage: builder.mutation({
            query: (messageId, userId) => ({
                url: `messages/delete/${messageId}/${userId}`,
                method: 'DELETE',
                body: ''
            }),

        }),
        saveMessage: builder.mutation({
            query: ({ message, sender, destination }) => ({
                url: `messages/save`,
                method: 'POST',
                body: { message, sender, destination }
            }),

        }),
        createRoom: builder.mutation({
            query: ({ people, roomName }) => ({
                url: 'rooms/create',
                method: 'POST',
                body: { people, roomName }
            })
        }),
        deleteRoom: builder.mutation({
            query: () => ({
                url: 'rooms/create',
                method: 'DELETE',
            })
        }),
        addUserToRoom: builder.mutation({
            query: ({ usersId, roomId }) => ({
                url: 'rooms/addUserToRoom',
                method: 'PUT',
                body: { usersId, roomId }
            })
        }),
        removeUserFromRoom: builder.mutation({
            query: ({ userId, roomId }) => ({
                url: 'rooms/removeUserFromRoom',
                method: 'PUT',
                body: { userId, roomId }
            })
        }),
        getRoom: builder.query({
            query: ({ roomId }) => ({
                url: `rooms/${roomId}`,
                method: 'GET',
            })
        }),
        updateRoom: builder.mutation({
            query: ({ roomImage = null, roomName = null, roomDescription = null, roomId = null }) => ({
                url: `rooms/update/${roomId}`,
                method: 'PUT',
                body: { roomImage, roomName, roomDescription, }
            })
        }),
        getRooms: builder.query({
            query: ( {userId}  ) => ({
                url: `rooms/getRooms/${userId}`,
                method: 'GET',
            })
        }),






    })

})
export const { useRegisterUserMutation,
    useUpdateUserMutation,
    useLogInUserMutation,
    useGetProtectionQuery,
    useGetMessagesMutation,
    useSignOutUserMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
    useSaveMessageMutation,
    useGetUsersQuery,
    useGetUserQuery,
    useAddRequestMutation,
    useGetAddRequestQuery,
    useAcceptAddRequestMutation,
    useRemoveFriendMutation,
    useGetRoomQuery,
    useAddUserToRoomMutation,
    useRemoveUserFromRoomMutation,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useGetRoomsQuery
} = apiSlice