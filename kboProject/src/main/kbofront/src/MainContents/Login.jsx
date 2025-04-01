import axios from 'axios';
import React, { useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { API } from '../config';

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    axios.post(`${API.LOGIN}`, {
      userId: userId,
      password: password,
    })
    .then((res) => {
      localStorage.setItem('jwtToken', res.data);
      localStorage.setItem('userId', userId);

      navigate("/");
    })
    .catch((err) => {
      alert("로그인 실패");
      console.log(err);
    })
  };

  return (
    <div className='body'>
      <br/>
      <br/>
      로그인화면
      <br/>
      <br/>
      <form className='login-form'>
        <div>
          <input 
            type='text' 
            id='userId' 
            vlue={userId} 
            placeholder='아이디'
            onChange={(e) => setUserId(e.target.value)}
            />
        </div>
        <div>
          <input 
            type='password' 
            id='password' 
            vlue={password} 
            placeholder='비밀번호'
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <br/>
        <br/>
        <br/>
        <button onClick={handleLogin}className='buttonStyle'>로그인</button>
        <p className="signup-link">
          아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
