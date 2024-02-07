import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Input,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  useAddUserToRoomMutation,
  useCreateRoomMutation,
} from "../../app/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/users/userSlice";
import { convertFileToBase64 } from "../../helpers/functions";
import { setRoom } from "../../features/rooms/roomSlice";
import { useTheme } from "@emotion/react";
import { Done } from "@mui/icons-material";
import { selectDistination } from "../../features/Chats/chatSlice";

function AddFriendToRoomDialog({ isOpen, setIsOpen, friends }) {
  //   const user = useSelector(selectUser);
  //   const [roomData, setRoomData] = useState({
  //     roomName: "",
  //     people: "",
  //   });
  const [open, setOpen] = useState(isOpen);
  //   const [createRoom, createRoomResult] = useCreateRoomMutation();
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState([]);
  // const [data, setData] = useState("");
  //   const [selectedImage, setSelectedImage] = useState(null);

  const [addFriendToRoom, addFriendToRoomResult] = useAddUserToRoomMutation();

  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
    // setData("");
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  //   useEffect(() => {
  //     if (createRoomResult.status === "rejected") {
  //       //   console.log("error while updating user");
  //       throw new Error("failed to create room");
  //     } else if (createRoomResult.status === "fulfilled") {
  //       console.log("room created successfully");
  //     }
  //   }, [createRoomResult]);
  const selectedRoom = useSelector(selectDistination);
  const handleSave = async () => {
    // console.log(roomData);
    // createRoom({ roomName: roomData.roomName, people: roomData.people });
    addFriendToRoom({ usersId: selectedFriend, roomId: selectedRoom });
    setOpen(false);
    setIsOpen(false);
  };
useEffect(()=>{
if(addFriendToRoomResult.status==='rejected'){
  throw new Error('error while adding users to the room')
}else if(addFriendToRoomResult.status==='fulfilled'){
  console.log('users added to the room')
}



},[addFriendToRoomResult])
  //   const handleChange = (event) => {
  //     console.log(event);
  //     setRoomData({
  //       roomName: event.target.value,
  //       people: [user._id],
  //     });
  //   };
  useEffect(() => {
    console.log(selectedFriend);
  }, [selectedFriend]);
  const theme = useTheme();

  return (
    <Dialog
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="dialog-title">add to room</DialogTitle>
      <DialogContent>
        {friends ? (
          friends.map((friend) => (
            <>
              {" "}
              <ListItemButton
                key={friend._id}
                data-friend-id={friend._id}
                id={friend._id}
                sx={{ width: "100%", padding: 0 }}
                onClick={(event) => {
                  // console.log(friend);
                  // console.log(friend?._id);
                  if (!selectedFriend.includes(friend?._id)) {
                    setIsDisabled(false);
                    setSelectedFriend((prev) => [...prev, friend?._id]);
                  } else {
                    const tampon = selectedFriend.filter((id) => {
                      // console.log(id,friend._id)
                      return id !== friend?._id;
                    });
                    // console.log(tampon);

                    setSelectedFriend(tampon);
                  }
                  // console.log(selectedFriend)

                  // dispatch(setDistination({ distination: friend }));
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
                  {selectedFriend.includes(friend?._id) ? (
                    <ListItemIcon>
                      <Done />
                    </ListItemIcon>
                  ) : (
                    <></>
                  )}
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
              </ListItemButton>
            </>
          ))
        ) : (
          <></>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={isDisabled} onClick={handleSave} color="primary">
          add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddFriendToRoomDialog;
