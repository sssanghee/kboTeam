import React, { useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { API } from '../config';

const SignUp = () => {
    const [userId, setUserId] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [userName, setUserName] = useState("");
    const [labelPasswordChk, setLabelPasswordChk] = useState("");
    const [eqaulPassword, setEqualPassword] = useState(false);
    const [idCheck, setIdCheck] = useState(false);

    const navigate = useNavigate();
    const refId = useRef();
    
    const existIdCheck = (e) => {
        e.preventDefault();

        axios.get(`${API.IDDBLECHCK}`, {
            params: {
                id: userId
            }
        })
        .then((res)=> {
            if (res.data == true) {
                alert("중복된 아이디입니다.");
                refId.current.value = "";
                setIdCheck(false);
            } else {
                alert("사용가능한 아이디입니다.");
                setIdCheck(true);
            }
        })
        .catch((err) => {console.log(err)})
    };
    
    const password2Check = (e) => {
        setPassword2(e.target.value);

        if(password1 != e.target.value) {
            setLabelPasswordChk("비밀번호가 일치하지 않습니다.");
            setEqualPassword(false);
        } else {
            setLabelPasswordChk("비밀번호가 일치합니다.");
            setEqualPassword(true);
        }
    };

    const handleSignUp = async (event) => {
        if(eqaulPassword && idCheck && password1 && userName) {
            event.preventDefault();

            // axios.get("http://localhost:8080/api/user/hi").then((res)=> {console.log(res)}).catch((err) => {console.log(err)});
    
            axios.post(`${API.SIGNUP}`, {
                userId: userId,
                password: password1,
                userName: userName
            })
            .then((res) => {
                alert("회원가입이 완료되었습니다. 로그인을 진행하세요.");
                navigate("/login");
            })
            .catch((err) => {console.log(err)})
        } else {
            if(!idCheck) {
                alert("아이디 중복확인을 진행하세요.");
                return;
            } else if (!eqaulPassword) {
                alert("비밀번호를 확인하세요");
                return;
            } else if (!userName) {
                alert("아이디를 입력하세요");
                return;
            }
        }
    };

    return (
        <div className='body'>
        회원가입화면
            <form className='signup-form'>
                <div>
                    <input 
                    type='text' 
                    id='userId' 
                    value={userId}
                    ref={refId}
                    maxLength='15' 
                    onChange={(e) => {setUserId(e.target.value);
                        setIdCheck(false);
                    }}
                    placeholder='아이디'
                    />
                    <button style={{margin:"0 0 0 8px"}} onClick={existIdCheck} className='buttonStyle'>중복 확인</button>
                </div>

                <div>
                    <input 
                    type='password' 
                    id='password1' 
                    value={password1} 
                    placeholder='비밀번호'
                    onChange={(e) => setPassword1(e.target.value)}
                    /> 
                </div>

                <label className='labelStyle'>{labelPasswordChk}</label>
                <div>
                    <input 
                    type='password' 
                    id='password2' 
                    value={password2} 
                    placeholder='비밀번호 확인'
                    onChange={password2Check}
                    />
                </div>

                <div>
                    <input 
                    type='text' 
                    id='userName' 
                    value={userName} 
                    placeholder='이름'
                    onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
            </form>
            <br/>
            <br/>
            <button onClick={handleSignUp} className='buttonStyle'>회원가입</button>
        </div>
    )
}

export default SignUp
