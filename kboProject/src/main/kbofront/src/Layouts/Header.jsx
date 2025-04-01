import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LayoutStyle/Header.css'
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const jwtToken = localStorage.getItem('jwtToken');

  const logoutOnclick = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    alert("로그아웃되었습니다.");
  };

  return (
    <header className="header">
      <div className='headerItem'>
        <div>
          <Link to={'/'}>This is KBO PROJECT!</Link>
        </div>
        
        <nav className='navigation'>
          <ul className='navbar'>
            {
              jwtToken
              ?
              <>
                <li className="navbarMenu">
                  <Link to={'/'}>구단</Link>
                </li>
                <li className="navbarMenu">
                  <Link to={'/'} onClick={logoutOnclick}>로그아웃</Link>
                </li>
              </>
              :
              <>
                <li className="navbarMenu">
                  <Link to={'/'}>구단</Link>
                </li>
                <li className="navbarMenu">
                  <Link to={'/login'}>로그인</Link>
                </li>
                <li className="navbarMenu">
                  <Link to={'/signup'}>회원가입</Link>
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
