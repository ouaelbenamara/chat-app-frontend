import { styled, Stack, IconButton, Avatar } from "@mui/material";
import FriendsBar from "./FriendsBar";
import React, { useDebugValue, useEffect } from "react";
import {Chat, Group, Logout} from "@mui/icons-material";
import { logOut, selectUser } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate ,useParams} from "react-router-dom";
function LeftBar() {
  const  userId = sessionStorage.getItem('userId');
  const navigate = useNavigate()
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  const handleLogoutClick = ()=>{
   dispatch( logOut())
   navigate('/')
  }


  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    borderLeft: "5px solid transparent",
    borderRadius: 0,
    paddingLeft: 15,
    paddingRight: 15,
    "&:hover": {
      borderLeft: `5px solid ${theme.palette.secondary.main}`,
    },
  }));
  const StyledRightbar = styled(Stack)(({ theme }) => ({
    height: "100vh",
    position: "relative",
    justifyContent: "start",
    alignItems: "center",
    left: 0,
    direction: "column",
    backgroundColor: theme.palette.primary.main,
  }));
  return (
    <StyledRightbar spacing={5}>
      <Avatar
      onClick={()=>{
                navigate(`/profile`);
      }}
        sx={{
          cursor:'pointer',
          height: 50,
          width: 50,
          borderTop: "5px solid transparent",
        }}
        variant="circular"
        src={user?.image}
        alt="Jane Doe"
      />
      <StyledIconButton  disableRipple onClick={() => {navigate(`/chats`);}}>
        <Chat />
      </StyledIconButton>
      <StyledIconButton onClick={()=>{
        navigate(`/explor`)
      }}>
        <Group  />
      </StyledIconButton>
      <StyledIconButton onClick={handleLogoutClick}>
        <Logout />
      </StyledIconButton>
    </StyledRightbar>
  );
}

export default LeftBar;
