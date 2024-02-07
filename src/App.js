import React from 'react';
import { Box } from '@mui/material';
import Navbar from './components/LeftBar';
import FriendsBar from './components/FriendsBar';
import ChatBar from './components/Chatbar/ChatBar';
import Explor from './components/Explor'
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';

import Profile from './components/Profile';
import {theme} from './components/theme.js'

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
