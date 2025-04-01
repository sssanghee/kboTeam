const BASE_URL = 'http://localhost:8080/api';

export const API = {
    //회원가입 화면 API
    IDDBLECHCK: `${BASE_URL}/user/idCheck`,             //아이디중복체크
    SIGNUP: `${BASE_URL}/user/signup`,                  //회원가입
    LOGIN: `${BASE_URL}/user/login`,                    //로그인

}