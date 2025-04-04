package com.kbo.project.jwt.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY;  // application.properties에서 가져온 비밀키

    @Value("${jwt.expiration}")
    private long expirationTime; // JWT 만료 시간 (밀리초 단위)

    // JWT 생성
    public String generateToken(String username) {
        SecretKey key = getSecretKey(); // SecretKey 객체 생성
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime)) // 만료 시간 설정
                .signWith(key, SignatureAlgorithm.HS256)  // SecretKey 객체로 서명
                .compact();
    }

    // JWT에서 사용자 이름을 추출
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // JWT에서 특정 클레임을 추출
    private <T> T extractClaim(String token, ClaimsResolver<T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.resolve(claims);
    }

    // JWT에서 모든 클레임을 추출
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())  // SecretKey 객체로 서명 검증
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // JWT가 만료되었는지 확인
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // JWT에서 만료일자 추출
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // JWT가 유효한지 확인
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }

    // SecretKey 생성
    private SecretKey getSecretKey() {
        return io.jsonwebtoken.security.Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // 사용자 이름을 추출하는 데 사용할 인터페이스
    @FunctionalInterface
    public interface ClaimsResolver<T> {
        T resolve(Claims claims);
    }
}