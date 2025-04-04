package com.kbo.project.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kbo.project.user.domain.UserInfo;
import com.kbo.project.user.dto.LoginReq;
import com.kbo.project.user.dto.UserDto;
import com.kbo.project.user.repository.UserRepository;
import com.kbo.project.common.*;
import com.kbo.project.jwt.auth.JwtUtil;

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
	public String login(LoginReq loginReq) {
        // 인증 요청 생성
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginReq.getUserId(), loginReq.getPassword())
        );
        
        // 인증이 성공하면 JWT 토큰 생성
        return jwtUtil.generateToken(authentication.getName());
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
