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
//styles

///////
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

var socket;

function ChatBar() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.emit("setup", "willu");
    socket.on("connected", () => {
      console.log("connect with id", socket.id);
      socket.on("recieve-message", (message) => {
        console.log(message);
      });
    });
  }, []);

  const theme = useTheme();
  return (
    <StyledBox overflow={"hidden"} flex={1}>
      <Stack
        sx={{ position: "sticky", justifyContent: "space-between" }}
        margin={2}
        direction={"row"}
        maxWidth={"90%"}
      >
        <Box direction={"row"}>
          <Badge variant="dot" color="success">
            <Avatar src="https://randomuser.me/api/portraits/women/34.jpg" />
          </Badge>
          <Typography sx={{ fontSize: "small" }}>John Doe</Typography>
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
          <StyledMessage elevation={0} position={"flex-start"}>
            <Avatar src="https://randomuser.me/api/portraits/women/34.jpg" />

            <StyledMessageContent
              sx={{
                paddingLeft: 5,
                paddingRight: 5,
                wordWrap: "break-word",
                maxWidth: "30%",
                borderRadius: "30px",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              dfsdfxcxcvcvcxvxcvcxvxcvxc dfsdfxcxcvcvcxvxcdsc vcxvxcvxc
            </StyledMessageContent>
          </StyledMessage>
          <StyledMessage elevation={0} position={"flex-start"}>
            <Avatar src="https://randomuser.me/api/portraits/women/34.jpg" />

            <StyledMessageContent
              sx={{
                paddingLeft: 5,
                paddingRight: 5,
                wordWrap: "break-word",
                maxWidth: "40%",
                borderRadius: "30px",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              sdsdsdsssssdddsdsdxzczxcasdasasdasdasdasdxxcdsfsdfsdfsdfsdfxcxcvcvcxvxcvcxvxcvxc
            </StyledMessageContent>
          </StyledMessage>
          <StyledMessage elevation={0} position={"flex-end"}>
            <Avatar src="https://randomuser.me/api/portraits/women/34.jpg" />

            <StyledMessageContent
              sx={{
                wordWrap: "break-word",
                maxWidth: "40%",
                borderRadius: "30px",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              sdsdsdsssssdddsdsdxzczxcasdasasdasdasdasdxxcdsfsdfsdfsdfsdfxcxcvcvcxvxcvcxvxcvxc
            </StyledMessageContent>
          </StyledMessage>
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
            onClick={() => {
              if (message !== "") {
                try {
                  socket.emit("send-message", message, (socket) => 
                    (socket.id)
                  );
                } catch (err) {
                  console.error("Error emitting message:", err);
                }
                setMessage("");
              }
            }}
          >
            <Send />
          </IconButton>
        </ButtonGroup>
      </Stack>
    </StyledBox>
  );
}

export default ChatBar;
