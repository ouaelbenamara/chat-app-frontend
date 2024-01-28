import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Navbar from './components/LeftBar';
import FriendsBar from './components/FriendsBar';
import ChatBar from './components/Chatbar/ChatBar';
import Explor from './components/Explor'
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import { useGetUsersQuery } from './app/api/apiSlice';
import { selectAllUsers, setUsers } from './features/users/allUsersSlice';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './components/Profile';
const theme = createTheme({
  palette: {
    secondary: { main: "#1842AB", },
    primary: { main: "#0C2A76" },
    success: { main: '#008823' },
    grey: { main: '#F0ECEC' },
    white: { main:'#FFFFFF'}
    // text: 'white',
    // subText: '#EAEAEA',
    // green: { main: 'green'},
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
      <Box className="App" sx={{
        boxSizing: 'border-box',
      }} display={'flex'} flexDirection={'row'} >
        <Router>
          <Routes>
            {/* public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/Register' element={<Register />} />
            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route path='/chats' element={<><Navbar /><FriendsBar /><ChatBar /></>} />
              <Route path='/profile' element={<><Navbar /><Profile /></>} />
              <Route path='/explor' element={<><Navbar /><Explor /></>} />
            </Route>

          </Routes>
        </Router>

      </Box>

    </ThemeProvider>
  );

  //     {/* 

  //         <Navbar />
  //         <FriendsBar  />
  //         <ChatBar />
  //         {/* <ProfileBar />
  // //  */} 


}

export default App;
