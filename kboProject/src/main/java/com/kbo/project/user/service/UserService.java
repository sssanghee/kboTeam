package com.kbo.project.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.kbo.project.common.*;
import com.kbo.project.domain.UserInfo;
import com.kbo.project.dto.LoginReq;
import com.kbo.project.dto.UserDto;
import com.kbo.project.jwt.auth.JwtUtil;
import com.kbo.project.respository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	@Autowired
	PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	
	public UserService(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }
	
	/* 로그인 */
	public void login(LoginReq loginReq, HttpServletResponse response) {
        String accessToken, refreshToken;
        
		// 인증 요청 생성
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginReq.getUserId(), loginReq.getPassword())
        );
        
        accessToken = jwtUtil.generateToken(authentication.getName());
        refreshToken = jwtUtil.generateRefreshToken(authentication.getName());
        
        Cookie cookieAccessToken = new Cookie("accessToken", accessToken);
        cookieAccessToken.setHttpOnly(true);
        cookieAccessToken.setSecure(false);	//개발환경이라서 false
        cookieAccessToken.setMaxAge(60 * 15);
        cookieAccessToken.setPath("/");
        response.addCookie(cookieAccessToken);
        
        Cookie cookieRefreshToken = new Cookie("refreshToken", refreshToken);
        cookieRefreshToken.setHttpOnly(true);
        cookieRefreshToken.setSecure(false);	//개발환경으로 false
        cookieRefreshToken.setMaxAge(60 * 60 * 24 * 7);
        cookieRefreshToken.setPath("/");
        response.addCookie(cookieRefreshToken);
        
        Cookie cookieUserId = new Cookie("userId", loginReq.getUserId());
        cookieUserId.setMaxAge(3600);
        cookieUserId.setPath("/");
        response.addCookie(cookieUserId);
    }
	
	/* 로그아웃 */
	public void logout(HttpServletRequest request, HttpServletResponse response) {
		// 액세스 토큰과 리프레시 토큰 쿠키 삭제

        // 액세스 토큰 삭제
        Cookie accessTokenCookie = new Cookie("accessToken", null);
        accessTokenCookie.setHttpOnly(true);  // JavaScript에서 접근할 수 없게 설정
        accessTokenCookie.setSecure(true);    // HTTPS에서만 전송
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(0);       // 쿠키 만료시키기 (0으로 설정하면 삭제됨)

        // 리프레시 토큰 삭제
        Cookie refreshTokenCookie = new Cookie("refreshToken", null);
        refreshTokenCookie.setHttpOnly(true); // JavaScript에서 접근할 수 없게 설정
        refreshTokenCookie.setSecure(true);   // HTTPS에서만 전송
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(0);      // 쿠키 만료시키기 (0으로 설정하면 삭제됨)

        // 쿠키를 클라이언트로 전송하여 삭제
        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);

        // 상태 코드로 성공 응답
        response.setStatus(HttpServletResponse.SC_OK);
	}

	/* 아이디 중복 체크 */
	public boolean existIdCheck(String id) {
		boolean existId = userRepository.existsById(id);
		return existId;
	}
	
	/* 회원가입 */
    public void userSignUp(UserDto userDto) {
        UserInfo user = new UserInfo();
        String dateFormat = CommonUtils.getNow();
        
        user.setUserId(userDto.getUserId());
        user.setUserName(userDto.getUserName());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setUserStatClCd("1");
        user.setFrsRgtDtm(dateFormat);
        user.setLstAltDtm(dateFormat);
        user.setUserRole("1");
        
		userRepository.save(user);
    }
}
