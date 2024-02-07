import { Avatar, Box, IconButton, InputBase, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAcceptAddRequestMutation, useAddRequestMutation, useGetAddRequestQuery, useGetUserQuery, useGetUsersQuery } from '../../app/api/apiSlice'
import { SearchEngine, StyledBox, StyledContainer, Wrapper } from './styles'
import { DoneAllOutlined, PersonAdd } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '../../features/users/userSlice'
import { selectDistination } from '../../features/Chats/chatSlice'

function Explor() {

const dispatch = useDispatch()
const userId = sessionStorage.getItem('userId')
    const USER = useSelector(selectUser)

const [selectedUser,setSelectedUser]= useState(null)
    const [users, setUsers] = useState([])
    const {data:user,status:userStatus} = useGetUserQuery(USER)
    const [requests, setRequests] = useState([])
    const [addRequest, addRequestResult] = useAddRequestMutation()
    const [acceptFriend, acceptFriendResult] = useAcceptAddRequestMutation()

    useEffect(()=>{
        if(userStatus==='rejected'){
            throw new Error('failed to load user')
        }else if(userStatus==='fulfilled'){
            console.log('user:',user)
            dispatch(setUser(user))
            setUsers()
        }
    },[ user, userStatus])
    
const [frinds,setFriends] = useState([])
    const destination = useSelector(selectDistination)
    const { data, status } = useGetUsersQuery()
    const [inputText, setInputText] = useState('')

    useEffect(() => {
        //call the backend to retrieve all users that are not friends
        if (status === 'rejected') {
            console.log('failed to load users')
        } else if (status === 'fulfilled'&& USER) {
            data.filter(friend=>friend.id!==USER?._id)


            setUsers(data.filter(friend => friend.id !== USER?._id))
            setUsers(data.filter(USER => !user.friends.includes(USER.id)));

            // console.log(requests)
            // console.log(user._id)
            
        }


    }, [data, status, USER])
    useEffect(()=>{
        if(USER){
            console.log(USER)
        const req = USER?.invitations
        // console.log('invitations: ', req)
            const invitedUsers = users.filter(USER => req.includes(USER.id));

        // console.log(invitedUsers)
        setRequests(invitedUsers)
}

    }, [USER?.invitations, users])

    useEffect(()=>{
        if(acceptFriendResult.status==='rejected'){
            // throw new Error('accept friend responded whith error', acceptFriendResult.data)
            console.log(acceptFriendResult.data)
        }else if(acceptFriendResult.status === 'fulfilled'){
            const res = requests.filter(inv => inv.id !== selectedUser)
            setRequests(res)

            console.log('friend request accepted',res)
            setSelectedUser(null)
        }

    },[acceptFriendResult,  selectedUser])


    const handleAddRequest =async (event)=> {
        // console.log('userID', USER._id)
        const destination = event.currentTarget.dataset.userId
        setSelectedUser(destination)
        if (USER && destination) {
            await addRequest({ sender: USER._id, destination: destination })
            console.log('request was  sent successfully')
            setUsers((prevList) =>
                prevList.filter(friend => friend.id !== destination)
            );

        } else {
            console.error('user and destintion are required')
            throw new Error("user and destintion are required")
        }

    }
    const handleAcceptAddRequest  =async (event)=>{
        const sender = event.currentTarget.dataset.userId

        if (USER?.id|| !sender){
            throw new Error("userId and sender are required")
        }

        await acceptFriend({ userId: USER._id,sender:sender})
        setRequests((prevList) =>
            prevList.filter((req) => req.id !== sender)
        );

        // console.log('enterd the hanlde')

    }



    
    // console.log(users)
    return (
        <Wrapper>
            <Box><Typography variant='h3'>Find  more friends</Typography></Box>
            <Box sx={{display:'flex', flexDirection:'row'}}>
           
<StyledContainer><Typography variant='h4'>
                    people wanna add you 

</Typography>
<Stack spacing={2}>

    {requests?.map((invitation,index)=>(

            <StyledBox key={index}>
                <Avatar src={invitation.image} />
                <Typography flex={1} textAlign={'center'} variant='h6'>{invitation.username}</Typography>
                <IconButton sx={{ float: 'right' }} data-user-id={invitation.id} onClick={handleAcceptAddRequest}>
                    <DoneAllOutlined />
                </IconButton>
            </StyledBox>)
     

    )}    
</Stack>
</StyledContainer>
            <StyledContainer spacing={2}>
                <Box sx={{}}><SearchEngine
                    value={inputText}
                    onChange={(event) => {
                        const inputText = event.target.value.toLowerCase();

                        setInputText(inputText);
                        setInputText(inputText);
                        // Filter the list based on the typed text
                        const filteredList = users.filter((friend) =>
                            friend.username.toLowerCase().includes(inputText)
                        );
                        if (inputText === '') {
                            console.log(data)
                            setUsers(data)
                        } else {
                            setUsers(filteredList);

                        }
                    }}
                    placeholder="Search ..."

                /></Box>
                {users.length !== 0 ? <>
                    {users.map((user, index) => (
                        <StyledBox key={index}>
                            <Avatar src={user.image} />
                            <Typography flex={1} textAlign={'center'} variant='h6'>{user.username}</Typography>
                            <IconButton sx={{ float: 'right' }} data-user-id={user.id} onClick={handleAddRequest}>
                                <PersonAdd />
                            </IconButton>
                        </StyledBox>)
                    )}

                </> : <>        explor page</>}

            </StyledContainer>     
            </Box>
        </Wrapper>

    )
}

export default Explor
