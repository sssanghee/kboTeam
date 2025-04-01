package com.kbo.project.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kbo.project.user.domain.UserInfo;

public interface UserRepository extends JpaRepository<UserInfo, String> {

}
