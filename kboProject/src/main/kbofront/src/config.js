const BASE_URL = 'http://localhost:8080/api';

export const API = {
    //회원가입 화면 API
    IDDBLECHCK: `${BASE_URL}/user/idCheck`,             //아이디중복체크
    SIGNUP: `${BASE_URL}/user/signup`,                  //회원가입
    LOGIN: `${BASE_URL}/user/login`,                    //로그인
    LOGOUT: `${BASE_URL}/user/logout`,                  //로그아웃
    MAIN: `${BASE_URL}/main`,                           //메인화면
    TEAMPAGE: `${BASE_URL}/teamPage`,                   //메인화면
    BOAREDETAIL: `${BASE_URL}/boardDetail`,             //게시판 상세화면
    REGISTCOMMENT: `${BASE_URL}/registComment`,         //댓글 등록
    GETCOMMENT: `${BASE_URL}/getComments`,               //댓글 조회
    UPDATECOMMENTLIKE: `${BASE_URL}/updateCommentLike`, //댓글 좋아요
    ESSEARCH: `${BASE_URL}/esSearch`,                   //엘라스틱서치 조회
}


export const formatDate = (dateString) => {
    // 예시: 20250406180700 -> 2025-04-06 18:07:00
    return `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6, 8)} ${dateString.substring(8, 10)}:${dateString.substring(10, 12)}:${dateString.substring(12, 14)}`;
};