import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LayoutStyle/Header.css'
import { useLocation } from "react-router-dom";
import {Cookies} from 'react-cookie'
import { API } from '../config';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Header = () => {
  const location = useLocation();
  const cookies = new Cookies();

  const userId = cookies.get('userId');

  const logoutOnclick = () => {
    axios.post(`${API.LOGOUT}`)
    .then((res) => {
      console.log(res);
      cookies.remove('userId');
      alert("로그아웃되었습니다.");
    })
    .catch((err) => {
      console.log(err);
      alert("로그아웃 실패.");
    })
  };

  return (
    <header className="header">
      <div className='headerItem'>
        <div>
          <Link to={'/'} className='linkMenu'>KBO PROJECT!</Link>
        </div>
        
        <nav className='navigation'>
          <ul className='navbar'>
            {
              userId
              ?
              <>
                <li className="navbarMenu">
                  <Link to={'/'} className='linkMenu'>구단</Link>
                </li>
                <li className="navbarMenu">
                  <Link to={'/'} className='linkMenu' onClick={logoutOnclick}>로그아웃</Link>
                </li>
              </>
              :
              <>
                <li className="navbarMenu">
                  <Link to={'/'} className='linkMenu'>구단</Link>
                </li>
                <li className="navbarMenu">
                  <Link to={'/login'} className='linkMenu'>로그인</Link>
                </li>
                <li className="navbarMenu">
                  <Link to={'/signup'} className='linkMenu'>회원가입</Link>
                </li>
              </>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
