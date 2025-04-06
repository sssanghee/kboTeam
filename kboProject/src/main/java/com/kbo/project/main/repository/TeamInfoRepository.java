package com.kbo.project.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kbo.project.main.domain.TeamInfo;

public interface TeamInfoRepository extends JpaRepository<TeamInfo, Integer>  {

}
