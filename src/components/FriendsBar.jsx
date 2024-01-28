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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/allUsersSlice";
import { setDistination } from "../features/Chats/chatSlice";
import {
  selectUser,
  setCredentials,
  setUser,
} from "../features/users/userSlice";
import { MoreVert } from "@mui/icons-material";
import { useGetUserQuery, useRemoveFriendMutation } from "../app/api/apiSlice";
import { Navigate, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const USER = useSelector(selectUser);
  const [removeFriend, removeFriendResult] = useRemoveFriendMutation();
  console.log(USER);

  const { data: user, status: userStatus } = useGetUserQuery(USER);

  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [listFriends, setListFriends] = useState(null);
  const [removedFriend, setRemovedFriend] = useState(null);
  useEffect(() => {
    if (userStatus === "rejected") {
      throw new Error("error while fetching the user data");
    } else if (userStatus === "fulfilled") {
      console.log("USERRRR", user);
      dispatch(setUser(user));
    }
  }, [dispatch, user, userStatus]);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    if (inputText === "") {
      console.log("HHHHHHHs", user);
      if (user) {
        setListFriends(
          users.filter((friend) => {
            console.log(friend, user.friends);
            return user?.friends?.includes(friend?.id);
          })
        );
      }
    }
  }, [inputText, user, users]);

  const theme = useTheme();

  useEffect(() => {
    console.log(user?.friends);
  }, [user]);
  //  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    console.log(event.currentTarget);
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
  const handleDeleteFriend = async (event) => {
    const friendId = event.currentTarget.dataset.friendId;
    setRemovedFriend(friendId);
    await removeFriend({ userId: user._id, friendId });
setListFriends((prevList) =>
  prevList.filter((friend) => friend.id !== friendId)
);
    // Handle friend deletion logic here
    //  onDeleteFriend(friend.id);
    handleClose();
  };

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
        <Divider sx={{ marginY: 3 }} />
      </Box>

      <StyledList>
        {listFriends ? (
          listFriends.map((friend) => (
            <ListItemButton
              data-friend-id={friend.id}
              id={friend.id}
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
                  data-friend-id={friend.id}
                  onClick={handleDeleteFriend}
                >
                  Delete Friend
                </MenuItem>
              </Menu>
            </ListItemButton>
          ))
        ) : (
          <></>
        )}
      </StyledList>
    </Box>
  );
}

export default FriendsBar;
