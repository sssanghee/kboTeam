// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//          gd Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import MainContent from './MainContents/Main';
import Login from './MainContents/Login';
import SignUp from './MainContents/SignUp';

function App() {
  // const [userId, setUserId] = useState("");
  // const [reload, setReload] = useState(false);

  // const jwtToken = localStorage.getItem('jwtToken');
  // console.log(localStorage.getItem('userId'));
  // useEffect(() => {
  //   if(localStorage.getItem('userId')) {
  //     setUserId(localStorage.getItem("userId"));
  //   } else {
  //     console.log("비로그인");
  //   }
  // }, [reload]);
  // console.log(reload);

  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<MainContent/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;