package com.kbo.project.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import com.kbo.project.jwt.auth.JwtAuthenticationFilter;
import com.kbo.project.jwt.auth.JwtUtil;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	// UserDetailsService를 구현한 서비스 빈을 사용하여 인증 설정
    private final UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    // AuthenticationManager 빈 등록
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = 
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder()); // 비밀번호 인코더 설정
        return authenticationManagerBuilder.build();
    }
    
    
	@Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//            .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
//                .requestMatchers(new AntPathRequestMatcher("/**")).permitAll())
//            .csrf((csrf) -> csrf
//                    .disable())//ignoringRequestMatchers(new AntPathRequestMatcher("/h2-console/**"))
//            .headers((headers) -> headers
//                    .addHeaderWriter(new XFrameOptionsHeaderWriter(
//                        XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)))
//
//        ;
//        
//        return http.build();
	    	
	    	http.cors(cors -> {
                cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                    config.setAllowedMethods(Collections.singletonList("*"));
                    config.setAllowCredentials(true);
                    config.setAllowedHeaders(Collections.singletonList("*"));
                    config.setMaxAge(3600L);
                    return config;
                });
            }).csrf(csrf -> {
                csrf.disable();
            });

	    	return http.build();
    }
    
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
}


























