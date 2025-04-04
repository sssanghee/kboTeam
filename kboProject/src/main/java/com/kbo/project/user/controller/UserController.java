package com.kbo.project.user.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.kbo.project.jwt.auth.JwtUtil;
import com.kbo.project.user.dto.LoginReq;
import com.kbo.project.user.dto.UserDto;
import com.kbo.project.user.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserService userService;

	/* 로그인 */
    @PostMapping("/user/login")
    public ResponseEntity<String> login(@RequestBody LoginReq loginRequest) {
        try {
        	String token = userService.login(loginRequest);
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }
    
    /* 아이디 중복체크 */
	@GetMapping("/user/idCheck")
	public ResponseEntity<?> existIdCheck(@RequestParam("id") String id) {
		try {
			boolean existId = userService.existIdCheck(id);
			return new ResponseEntity<>(existId, HttpStatus.OK);
		} catch(Exception e) {
			System.out.println(e);
			return new ResponseEntity<>("실패", HttpStatus.BAD_REQUEST);
		}
	}
	
	/* 회원가입 */
    @PostMapping("/user/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody UserDto userDto) {
        try {
        	userService.userSignUp(userDto);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch(Exception e) {
        	System.out.println(e);
        	return new ResponseEntity<>("실패", HttpStatus.BAD_REQUEST);
        }

    }
}
