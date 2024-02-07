import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Input,
} from "@mui/material";
import { useCreateRoomMutation } from "../../app/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/users/userSlice";
import { convertFileToBase64 } from "../../helpers/functions";
import { setRoom } from "../../features/rooms/roomSlice";

function CreateRoomDialog({ isOpen, setIsOpen }) {
  const user = useSelector(selectUser);
  const [roomData, setRoomData] = useState({
    roomName: "",
    people: "",
  });
  const [open, setOpen] = useState(isOpen);
  const [createRoom, createRoomResult] = useCreateRoomMutation();
  const [isDisabled, setIsDisabled] = useState(true);

  // const [data, setData] = useState("");
  //   const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
    // setData("");
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (createRoomResult.status === "rejected") {
      //   console.log("error while updating user");
      throw new Error("failed to create room");
    } else if (createRoomResult.status === "fulfilled") {
        
      console.log('room created successfully')
    }
  }, [createRoomResult]);

  const handleSave = async () => {
    console.log(roomData)
    createRoom({ roomName: roomData.roomName, people: roomData.people });
    setOpen(false);
    setIsOpen(false);
  };

  const handleChange = (event) => {
    console.log(event)
    setRoomData({
      roomName: event.target.value,
      people:[user._id]
    });
  };

  return (
    <Dialog
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="dialog-title">Create Room</DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => {
            handleChange(e);
            setIsDisabled(false);
            console.log(roomData)
          }}
          autoFocus
          margin="dense"
          label="room name"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={isDisabled} onClick={handleSave} color="primary">
          create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateRoomDialog;
