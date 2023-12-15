import PersonAddIcon from '@mui/icons-material/PersonAdd';import { AppBar, Avatar, Badge, Box, ButtonGroup, Divider, Icon, IconButton, InputBase, Stack, Typography } from '@mui/material'
import React from 'react'
import InfoIcon from "@mui/icons-material/Info";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import { Add, Send } from '@mui/icons-material';
const StylesBox = styled(Box)(({theme})=>({
  display:'flex',
  flexDirection:'column',

}))


function ChatBar() {
  const theme = useTheme()
  return (
    <StylesBox flexGrow={4}>
      <Stack
        margin={2}
        spacing={5}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={1}>
          <Badge variant="dot" color="success">
            <Avatar src="https://randomuser.me/api/portraits/women/34.jpg" />
          </Badge>
          <Typography>John Doe</Typography>
        </Stack>
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
      <Box flex={1}>messages here</Box>

      <Stack margin={2} direction={"row"} justifyContent={"start"}>
        <Stack direction={"row"} spacing={1}>
          <Box flexGrow={3} sx={{ borderRadius: 30, border: "1px solid grey" }}>
            <InputBase
              placeholder="type your message here ...."
              sx={{
                
                padding: 1,
                "&::-webkit-scrollbar": {
                  width: 0,
                  //     bgcolor: theme.palette.primary.main,  Hide scrollbar for WebKit browsers
                },
              }}
            />
          </Box>
        </Stack>
        <ButtonGroup>
          <IconButton>
            <Send />
          </IconButton>
        </ButtonGroup>
      </Stack>
    </StylesBox>
  );
}

export default ChatBar
