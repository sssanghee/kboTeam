import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import MainContent from './MainContents/Main';
import Login from './MainContents/Login';
import SignUp from './MainContents/SignUp';
import TeamInfo from './MainContents/TeamInfo';
import BoardView from './MainContents/BoardView';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        {/* <Box sx={{ minHeight: '80vh', bgcolor: '#fff' }}>
          <Container maxWidth={false} disableGutters sx={{ px: 1, py: 4 }}>
            <Routes>
              <Route path="/" element={<MainContent/>}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<SignUp />}/>
              <Route path="/teamInfo" element={<TeamInfo />}/>
              <Route path="/boardView" element={<BoardView />}/>
            </Routes>
          </Container>
        </Box>
         */}
         <Box sx={{ minHeight: '80vh', bgcolor: '#fff' }}>
          <Box sx={{ width: 'calc(100% - 500px)', mx: 'auto', py: 4 }}>
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/teamInfo" element={<TeamInfo />} />
              <Route path="/boardView" element={<BoardView />} />
            </Routes>
          </Box>
        </Box>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;