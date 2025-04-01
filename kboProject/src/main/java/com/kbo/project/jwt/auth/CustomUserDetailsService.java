package com.kbo.project.jwt.auth;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kbo.project.user.domain.UserInfo;
import com.kbo.project.user.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 여기서 DB에서 사용자 정보를 조회합니다.
        UserInfo userEntity = userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        // 사용자가 존재하면 UserDetails 객체로 변환하여 반환
        return User.builder()
                .username(userEntity.getUserId())
                .password(userEntity.getPassword())  // DB에서 가져온 암호화된 비밀번호
                .authorities(userEntity.getUserRole())  // 사용자의 권한 (예: ROLE_USER, ROLE_ADMIN)
                .build();
    }
}