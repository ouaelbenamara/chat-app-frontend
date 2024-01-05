import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  Divider,
  InputBase,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";

const StyledList = styled(List)(({ theme }) => ({
  flex: "1",
  overflowY: "scroll",
  width: "100%",
  "&::-webkit-scrollbar": {
    width: 0,
    //     bgcolor: theme.palette.primary.main,  Hide scrollbar for WebKit browsers
  },
}));

const data= [
    {
      avatar: "https://randomuser.me/api/portraits/men/91.jpg",
      username: "john Doe",
      lastMessage: "hello ",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/94.jpg",
      username: "sarah mircle",
      lastMessage: "hello ",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      username: "jacob putin",
      lastMessage: "hello ",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      username: "lara crofy",
      lastMessage: "hello ",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      username: "lara crofy",
      lastMessage: "hello ",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      username: "lara crofy",
      lastMessage: "hello ",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      username: "lara crofy",
      lastMessage: "hello ",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      username: "lara crofy",
      lastMessage: "hello ",
    },
  ]

function FriendsBar() {
const [inputText, setInputText] = useState("");
  const [listFriends, setListFriends] = useState(data);
    useEffect(() => {
      if (inputText === "") {
        setListFriends(data);
      }
    }, [inputText, data]);
  const theme = useTheme();

  return (
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
            const filteredList = data.filter((friend) =>
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
        <Divider sx={{ marginY: 3 }} />
      </Box>

      <StyledList>
        {listFriends.map((friend,index) => (
          <ListItemButton key={index} sx={{ width: "100%", padding: 0 }}>
            <ListItem
              sx={{
                padding: { xs: 0, md: 4 },
                paddingLeft: 1,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <ListItemAvatar>
                <Avatar src={friend.avatar} />
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
          </ListItemButton>
        ))}
      </StyledList>
    </Box>
  );
}

export default FriendsBar;
