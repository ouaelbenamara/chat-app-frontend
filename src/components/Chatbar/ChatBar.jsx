import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Avatar,
  Badge,
  Box,
  ButtonGroup,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import { useTheme } from "@mui/material/styles";
import { Send } from "@mui/icons-material";
import io, { connect } from "socket.io-client";

import {
  StyledBox,
  StyledList,
  StyledMessage,
  StyledMessageContent,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/users/userSlice";
import {
  selectDistination,
  setMessages1,
  setMessages2,
} from "../../features/Chats/chatSlice";
import {
  useGetMessagesMutation,
  useGetMessagesQuery,
  useGetUsersQuery,
  useSaveMessageMutation,
} from "../../app/api/apiSlice";
import { selectAllUsers, setUsers } from "../../features/users/allUsersSlice";
import { injectAsyncReducer, store } from "../../app/store";
import { useParams } from "react-router-dom";
import userReducer from "../../features/users/userSlice";
import { handleRecieveMessage, setUpNetwork } from "../../services/network";
//styles

///////
// const ENDPOINT = process.env.REACT_APP_ENDPOINT;

export var socket;

function ChatBar() {
    const messagesQueryRef = useRef(null);

  const { userId } = useParams();

  // injectAsyncReducer(store, 'user', userReducer);

  let name = `user_${userId}`;
  console.log("HUHUHUHUHU", name);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { status: usersStatus, data: usersData } = useGetUsersQuery();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    if (usersStatus === "rejected") {
      console.log("failed to load users");
      dispatch(setUsers(null));
    } else if (usersStatus === "fulfilled") {
      console.log("fulfilled ", usersData);
      dispatch(setUsers(usersData));
    }
    console.log(users);
  }, [usersStatus, usersData, users, dispatch]);

  const [saveMessage, saveMessageResult] = useSaveMessageMutation();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  // const user = useSelector(selectUser);
  const selectedChat = useSelector(selectDistination);
  useEffect(() => {
    if(selectedChat){
    setMessages([]);}
  }, [selectedChat]);

  const [getMessages,getMessagesResult ] = useGetMessagesMutation();
  
  useEffect(() => {
    if (getMessagesResult.status === "rejected") {
      console.log("failed to load messages");
    } else if (getMessagesResult.status === "fulfilled") {
      console.log("HERRERERERERERE", getMessagesResult.data);
      let messageSender = null;
      let messageDestination = null;
      if (getMessagesResult.data.messages.length !== 0) {
        messageSender = getMessagesResult.data?.messages.filter(
          (message) => message.sender === user?._id
        );
        messageDestination = getMessagesResult.data?.messages.filter(
          (message) => message.destination !== selectedChat.destination?._id
        );
        console.log(messageSender, messageDestination);
        if (messageSender || messageDestination) {
          dispatch(setMessages1(messageSender));
          dispatch(setMessages2(messageDestination));
          setMessages(getMessagesResult.data.messages);
          console.log(messages);
        } else {
          dispatch(setMessages1([]));
          dispatch(setMessages2([]));
        }
      }
    }
  }, [ getMessagesResult, user, dispatch, selectedChat]);

  useEffect(() => {
    if (user) {
    socket =  setUpNetwork(socket, user, io);

      socket.on("connected", () => {
        const { message, sender } = handleRecieveMessage(socket);
        if (message && sender){
          setMessages((prev) => [...prev, { sender, content: message }]);
          console.log(messages)
}

      });
    }
  }, [user]);
  
  useEffect(() => {
    if (saveMessageResult.status === "rejected") {
      console.log("error while sending message");
    } else if (saveMessageResult.status === "fulfilled") {
      socket.emit("send-message", {
        message,
        sender: user?._id,
        destination: selectedChat._id,
      });
      console.log("fulfilled message");
      console.log(selectedChat, user);
      if (user && message !== "" && selectedChat) {
        console.log(selectedChat, user);
        dispatch(
          setMessages2([
            {
              sender: user?._id,
              content: message,
              destination: selectedChat?._id,
            },
          ])
        );
        setMessages((prevMessages) =>{
          console.log([
            ...prevMessages,
            {
              sender: user?._id,
              content: message,
              destination: selectedChat?._id,
            },
          ]);
          
          return  [
          ...prevMessages,
          {
            sender: user?._id,
            content: message,
            destination: selectedChat?._id,
          },
        ]});
                  console.log(messages);


        setMessage("");
      }
    }
  }, [dispatch, saveMessageResult, selectedChat, user]);
  useEffect(()=>{


    getMessages(  { // userId: user?._id,
    distination: selectedChat?._id,
  })
  },[selectedChat])
// useEffect(()=>{
// console.log('data',data)
// },[data])
  const theme = useTheme();
  return (
    <StyledBox overflow={"hidden"} flex={1}>
      {selectedChat ? (
        <>
          <Stack
            sx={{ position: "sticky", justifyContent: "space-between" }}
            margin={2}
            direction={"row"}
            maxWidth={"90%"}
          >
            <Box direction={"row"}>
              <Badge variant="dot" color="success">
                <Avatar src={selectedChat?.image} />
              </Badge>
              <Typography sx={{ fontSize: "small" }}>
                {selectedChat?.username}
              </Typography>
            </Box>
            <ButtonGroup>
              <IconButton>
                <PersonAddIcon />
              </IconButton>
              <IconButton>
                <AddIcCallIcon />
              </IconButton>
              <IconButton>
                <InfoIcon />
              </IconButton>
            </ButtonGroup>
          </Stack>
          <Divider />
          <Box flex={1} sx={{ overflowY: "scroll" }}>
            <StyledList>
              {messages.length !== 0 ? (
                messages.map((message, index) =>
            
              {   console.log(message.sender,user._id)
                 return message?.sender === user?._id ? (
                    <StyledMessage
                      key={index}
                      elevation={0}
                      position={"flex-start"}
                    >
                      <Avatar src={user?.image} />

                      <StyledMessageContent>
                        {message.content}
                      </StyledMessageContent>
                    </StyledMessage>
                  ) : (
                    <StyledMessage
                      key={index}
                      elevation={0}
                      position={"flex-end"}
                    >
                      <Avatar src={selectedChat?.image} />

                      <StyledMessageContent>
                        {message.content}
                      </StyledMessageContent>
                    </StyledMessage>
                  )}
                )
              ) : (
                <>empty messages</>
              )}

            </StyledList>
          </Box>
          <Divider />
          <Stack margin={2} direction={"row"} justifyContent={"start"}>
            <Stack direction={"row"} spacing={1}>
              <Box sx={{ borderRadius: 30 }}>
                <InputBase
                  value={message}
                  placeholder="type your message here ...."
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                  sx={{
                    padding: 1,
                    "&::-webkit-scrollbar": {
                      width: 0,
                    },
                  }}
                />
              </Box>
            </Stack>
            <ButtonGroup>
              <IconButton
                onClick={async () => {
                  if (message !== "") {
                    try {
                      console.log("selectedChat", selectedChat);
                      await saveMessage({
                        message,
                        sender: user?._id,
                        destination: selectedChat || "unknown",
                      });
                      console.log("message saved");
                    } catch (err) {
                      console.error("Error emitting message:", err);
                    }
                  }
                }}
              >
                <Send />
              </IconButton>
            </ButtonGroup>
          </Stack>
        </>
      ) : (
        <Box>
          <Typography variant="h2"> start chating</Typography>
        </Box>
      )}
    </StyledBox>
  );
}
export const userId = ChatBar.userId;

export default ChatBar;
