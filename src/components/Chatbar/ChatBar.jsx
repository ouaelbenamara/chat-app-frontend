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

import React, { useEffect, useState } from "react";
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
  useGetMessagesQuery,
  useGetUsersQuery,
  useSaveMessageMutation,
} from "../../app/api/apiSlice";
import { setMessages } from "../../features/Chats/chatSlice";
import { selectAllUsers, setUsers } from "../../features/users/allUsersSlice";
//styles

///////
// const ENDPOINT = process.env.REACT_APP_ENDPOINT;

var socket;

function ChatBar() {
  const dispatch = useDispatch();

    const { status:usersStatus, data :usersData} = useGetUsersQuery();
    const users = useSelector(selectAllUsers);

    useEffect(() => {
      if (usersStatus === "rejected") {
        console.log("failed to load users");
       dispatch( setUsers(null));
      } else if (usersStatus === "fulfilled") {
        console.log("fulfilled ", usersData);
        dispatch(setUsers(usersData));
      }
      console.log(users);
    }, [usersStatus, usersData, users, dispatch]);

  const [saveMessage, saveMessageResult] = useSaveMessageMutation();
const [messages,setMessages] = useState([])
  const [message, setMessage] = useState("");
  const user = useSelector(selectUser);
  const selectedFriend = useSelector(selectDistination);
    useEffect(() => {
      setMessages([]);
    }, [selectedFriend]);
    
  const { status, data } = useGetMessagesQuery({
    userId: user?._id,
    distination: selectedFriend?.id,
  });
  useEffect(() => {
    if (status === "rejected") {
      console.log("failed to load messages");
    } else if (status === "fulfilled") {
      console.log("HERRERERERERERE", data);
      let messageSender = null;
      let messageDestination = null;
      if (data.messages.length !== 0) {
        messageSender = data?.messages.filter(
          (message) => message.sender === user?.id
        );
        messageDestination = data?.messages.filter(
          (message) => message.destination !== user?.id
        );
        console.log(messageSender, messageDestination);
        if (messageSender || messageDestination) {
          dispatch(setMessages1(messageSender));
          dispatch(setMessages2(messageDestination));
           setMessages([...messageSender, ...messageDestination]);

        }
      }
    }
  }, [status, data, user, dispatch]);

  useEffect(() => {
    if (user) {
      socket = io("http://localhost:5000");
      socket.emit("setup", user?._id);
      socket.on("connected", () => {
        console.log("connect with id", socket.id);
        socket.on("recieve-message", (message, sender) => {
          console.log(message);
        });
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
        distination: selectedFriend,
      });
      console.log("fulfilled message");
      console.log(selectedFriend, user);
      if(user&& message!==''&&selectedFriend){
              console.log(selectedFriend, user);
      dispatch(
        setMessages2([{
          sender: user?._id,
          content: message,
          destination: selectedFriend?.id,
        }])
      );   
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: user?._id,
              content: message,
              destination: selectedFriend?.id,
            },
          ]);
      
      setMessage("");
    }


                     

    }
  }, [dispatch, saveMessageResult, selectedFriend, user]);

  const theme = useTheme();
  return (
    <StyledBox overflow={"hidden"} flex={1}>
      {selectedFriend ? (
        <>
          <Stack
            sx={{ position: "sticky", justifyContent: "space-between" }}
            margin={2}
            direction={"row"}
            maxWidth={"90%"}
          >
            <Box direction={"row"}>
              <Badge variant="dot" color="success">
                <Avatar src={selectedFriend?.image} />
              </Badge>
              <Typography sx={{ fontSize: "small" }}>
                {selectedFriend?.username}
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
              {messages.length!==0 ? (
                messages.map((message, index) =>
                  message?.sender === user?._id ? (
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
                      <Avatar src={selectedFriend?.image} />

                      <StyledMessageContent>
                        {message.content}
                      </StyledMessageContent>
                    </StyledMessage>
                  )
                )
              ) : (
                <></>
              )}
              {/* <StyledMessage elevation={0} position={"flex-start"}>
                <Avatar src={user?.image} />

                <StyledMessageContent>
                  dfsdfxcxcvcvcxvxcvcxvxcvxc dfsdfxcxcvcvcxvxcdsc vcxvxcvxc
                </StyledMessageContent>
              </StyledMessage>

              <StyledMessage elevation={0} position={"flex-end"}>
                <Avatar src={selectedFriend?.image} />

                <StyledMessageContent>
                  sdsdsdsssssdddsdsdxzczxcasdasasdasdasdasdxxcdsfsdfsdfsdfsdfxcxcvcvcxvxcvcxvxcvxc
                </StyledMessageContent>
              </StyledMessage> */}
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
                      await saveMessage({
                        message,
                        sender: user?._id,
                        destination: selectedFriend || "unknown",
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

export default ChatBar;
