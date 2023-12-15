import { styled, Stack, IconButton, Avatar } from "@mui/material";

import React from "react";
import {Chat, Group } from "@mui/icons-material";
function RightBar() {
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
        sx={{
          height:50,
          width:50,
          borderTop: "5px solid transparent" }}
        variant="circular"
        src="https://randomuser.me/api/portraits/women/79.jpg"
        alt="Jane Doe"
      />
      <StyledIconButton disableRipple onClick={() => {}}>
        <Chat />
      </StyledIconButton>
      <StyledIconButton>
        <Group />
      </StyledIconButton>
    </StyledRightbar>
  );
}

export default RightBar;
