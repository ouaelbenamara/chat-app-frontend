import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  Divider,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Stack,
  Typography,
  ButtonBase,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/allUsersSlice";
import { selectDistination, setDistination } from "../features/Chats/chatSlice";
import {
  selectUser,
  setCredentials,
  setUser,
} from "../features/users/userSlice";
import { Add, ControlPoint, Create, MoreVert, PlusOne } from "@mui/icons-material";
import { useGetUserQuery, useRemoveFriendMutation ,useGetRoomsQuery, useAddUserToRoomMutation,} from "../app/api/apiSlice";
import { Navigate, useNavigate } from "react-router-dom";
import CreateRoomDialog from "./utils/CreatRoomDialog";
import AddFriendToRoomDialog from "./utils/AddFriendsToRoomDialog";
import profileImage from '../profileImage.png'
import { socket } from "./Chatbar/ChatBar";
import { joinRoom } from "../services/network";
import { setSelectedFriend } from "../features/users/selectedFriendSlice";
import { setRoom } from "../features/rooms/roomSlice";
const StyledList = styled(List)(({ theme }) => ({
  flex: "1",
  overflowY: "scroll",
  width: "100%",
  "&::-webkit-scrollbar": {
    width: 0,
    //     bgcolor: theme.palette.primary.main,  Hide scrollbar for WebKit browsers
  },
}));

function FriendsBar() {
  const [roomsList,setRoomsList]= useState([])
  const [openCreateRoom,setCreateRoomOpen] = useState(false)
  const navigate = useNavigate();
  const USER = useSelector(selectUser)

  const [addToRoom,addToRoomResult] = useAddUserToRoomMutation()

  const [removeFriend, removeFriendResult] = useRemoveFriendMutation();
  // console.log(USER);
const [openListFriends,setOpenListFriends] = useState(false)
  const { data: user, status: userStatus } = useGetUserQuery(USER);
  
    const { data: roomsData, status: roomsStatus } = useGetRoomsQuery({userId:USER._id});
    // useEffect(() => {
    //   console.log(USER?._id);
    // }, [USER]);

// const [openLisFriends,setOpenListFriends] = useS

  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [listFriends, setListFriends] = useState(null);
  const [openFriendsDialog, setOpenFriendsDialog] = useState(null);

  const [removedFriend, setRemovedFriend] = useState(null);
  useEffect(() => {
    if (roomsStatus === "rejected") {

      throw new Error("failed to fetch rooms");
      
    } else if (roomsStatus === "fulfilled") {
      // console.log(roomsData.room);
      setRoomsList(roomsData.room);
      dispatch(setRoom(roomsData.room))
       
    }
  }, [roomsData?.room, roomsStatus]);
  useEffect(() => {
    if (userStatus === "rejected") {
      throw new Error("error while fetching the user data");
    } else if (userStatus === "fulfilled") {
      // console.log("USERRRR", user);
      // dispatch(setUser(user));
    }
  }, [dispatch, user, userStatus]);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    if (inputText === "") {
      // console.log("HHHHHHHs", user);
      if (user) {
        setListFriends(
          users.filter((friend) => {
            // console.log(friend, user.friends);
            return user?.friends?.includes(friend?._id);
          })
        );
      }
    }
  }, [inputText, user, users]);

  const theme = useTheme();

  // useEffect(() => {
  //   // console.log(user?.friends);
  // }, [user]);
  //  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
const [friendOrRoom,setFriendOrRoom] = useState(true)
  const handleClick = (event) => {
    // console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
    //  setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setRemovedFriend(null);
  };

  useEffect(() => {
    if (removeFriendResult.status === "rejected") {
      throw new Error("failed to remove friend");
    } else if (removeFriendResult.status === "fulfilled") {
      console.log("friend removed successfully");
      setListFriends(
        listFriends.filter((friend) => user?.friends !== removedFriend)
      );
    }
  }, [removeFriendResult]);
  
  useEffect(()=>{
if(addToRoomResult.status==='rejected'){
  throw new Error('failed to add user to room')
}else if(addToRoomResult.status==='fulfilled'){
  console.log('friend added to the room',addToRoomResult.data)
}

  },[addToRoomResult])





  const handleDeleteFriend = async (event) => {
    const friendId = event.currentTarget.dataset.friendId;
    setRemovedFriend(friendId);
    await removeFriend({ userId: user._id, friendId });
setListFriends((prevList) =>
  prevList.filter((friend) => friend._id !== friendId)
);
    // Handle friend deletion logic here
    //  onDeleteFriend(friend.id);
    handleClose();
  };
  const handleFriendsButtonClick = () => {
    // Add your logic for the Friends button click
    console.log("Friends button clicked");
    setFriendOrRoom(true)
    // setOpenListFriends(true);

  };

  const handleRoomsButtonClick = () => {
    // Add your logic for the Rooms button click
    setFriendOrRoom(false)
                    // dispatch(setDistination({ distination: friend }));
  };





  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: { xs: 100, md: 250 },
          bgcolor: theme.palette.secondary.main,
          height: "100vh",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            width: { xs: 100, md: 250 },
            bgcolor: "trasparent",
          }}
        >
          <InputBase
            value={inputText}
            onChange={(event) => {
              const inputText = event.target.value.toLowerCase();
              setInputText(inputText);
              setInputText(inputText);
              // Filter the list based on the typed text
              const filteredList = listFriends.filter((friend) =>
                friend.username.toLowerCase().includes(inputText)
              );

              setListFriends(filteredList);
            }}
            placeholder="Search ..."
            sx={{
              color: theme.palette.text,
              width: "75%",
              borderRadius: "30px",
              bgcolor: theme.palette.primary.main,

              paddingX: 1,
              marginTop: 2,
            }}
          />
          <Box sx={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFriendsButtonClick}
            >
              Friends
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRoomsButtonClick}
            >
              Rooms
            </Button>
          </Box>
          <Divider sx={{ marginY: 3 }} />
        </Box>

        <StyledList>
          {friendOrRoom ? (
            listFriends ? (
              listFriends.map((friend) => (
                <ListItemButton
                  key={friend._id}
                  data-friend-id={friend._id}
                  id={friend._id}
                  sx={{ width: "100%", padding: 0 }}
                  onClick={(event) => {
                    console.log(friend);
                    console.log(friend._id);
                    dispatch(setDistination({ distination: friend }));
                  }}
                >
                  <ListItem
                    sx={{
                      padding: { xs: 0, md: 4 },
                      paddingLeft: 1,
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={friend?.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primaryTypographyProps={{
                        fontFamily: theme.typography.fontFamily,
                        fontSize: theme.typography.subtitle1,
                        color: theme.palette.text,
                      }}
                      secondaryTypographyProps={{
                        fontFamily: theme.typography.fontFamily,
                        fontSize: theme.typography.subtitle2,
                        color: theme.palette.subText,
                      }}
                      primary={friend.username}
                      secondary={friend.lastMessage}
                    />
                  </ListItem>
                  <IconButton
                    edge="end"
                    aria-label="more"
                    onClick={handleClick}
                    sx={{ marginLeft: "auto" }}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id="friend-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      data-friend-id={friend._id}
                      onClick={handleDeleteFriend}
                    >
                      Delete Friend
                    </MenuItem>
                  </Menu>
                </ListItemButton>
              ))
            ) : (
              <></>
            )
          ) : (
            <>
              <Box>
                <IconButton
                  onClick={() => {
                    setCreateRoomOpen(true);
                  }}
                >
                  <ControlPoint />
                </IconButton>
                <Stack>
                  {roomsList.length !== 0 ? (
                    roomsList?.map((room) => (
                      <Box
                        key={room._id}
                        data-room-id={room}
                        onClick={() => {
                          const roomId = room._id;
                          dispatch(setDistination({ distination: room }));

                          joinRoom(socket, roomId);
                        }}
                      >
                        <Box>
                          <Avatar
                            // onClick={handleImageClick}
                            sx={{
                              cursor: "pointer",
                              height: 100,
                              width: 100,
                            }}
                            variant="rounded"
                            src={
                              room?.roomImage ? room?.roomImage : profileImage
                            }
                            alt="profile-image"
                          />
                        </Box>
                        <Box>
                          <Typography>{room.roomName}</Typography>
                        </Box>
                        <Box>
                          <Typography>{room.roomDescription}</Typography>
                        </Box>
                        <Box
                          onClick={() => {
                            setOpenListFriends(true);
                          }}
                        >
                          <Add />
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography>you havn't joined any room</Typography>
                  )}
                </Stack>
              </Box>
            </>
          )}
        </StyledList>
      </Box>
      <CreateRoomDialog isOpen={openCreateRoom} setIsOpen={setCreateRoomOpen} />
      <AddFriendToRoomDialog
        friends={listFriends}
        isOpen={openListFriends}
        setIsOpen={setOpenListFriends}
      />
    </>
  );
}

export default FriendsBar;
