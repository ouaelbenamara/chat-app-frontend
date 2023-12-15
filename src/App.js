import React from 'react';
import { Box, colors } from '@mui/material';
import Navbar from './components/RightBar';
import FriendsBar from './components/FriendsBar';
import ProfileBar from './components/ProfileBar';
import ChatBar from './components/ChatBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SocketProvider } from './network/socket';
import { purple } from '@mui/material/colors';
import { Palette } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    secondary: { main: "#1842AB", },
    primary: { main: "#0C2A76" },
    text: 'white',
    subText: '#EAEAEA',
    green:'green'
  },
  typography: {
    fontFamily: "cursive",
    subtitle1: {
      fontSize: 14,
      color: 'white'
    },
    subtitle2: {
      fontSize: 10,
    },
    body1: {
      fontWeight: 500,
    },
    body2: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },// Replace with your custom font




  },

});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="App" minWidth={'100%'} minHeight={'100%'} display={'flex'} flexDirection={'row'} overflow={'hidden'}>
        <Navbar />
        <FriendsBar />
        <ChatBar />
        <ProfileBar />
      </Box>
    </ThemeProvider>
  );
}

export default App;
