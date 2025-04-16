package com.kbo.project.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kbo.project.domain.TeamInfo;

public interface TeamInfoRepository extends JpaRepository<TeamInfo, Integer>  {

}
