package com.kbo.project.teampage.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.kbo.project.main.domain.TeamInfo;
import com.kbo.project.main.repository.BoardRepository;
import com.kbo.project.main.repository.TeamInfoRepository;
import com.kbo.project.teampage.dto.BoardInfo;


@Service
public class TeamPageService {
	@Autowired
	TeamInfoRepository teamInfoRepository;

	@Autowired
	BoardRepository boardRepository;
	
	public Map<String, Object> teamPage(int teamNo) {
		System.out.println("서비스");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		Optional<TeamInfo> teamInfo = Optional.empty();  
		List<BoardInfo> boardList = new ArrayList<BoardInfo>();
		
		Pageable pageable = PageRequest.of(0, 5, Sort.by(Sort.Order.desc("boardLike")));
		
		teamInfo =  teamInfoRepository.findById(teamNo); 
		if (teamInfo.isPresent()) {
            resultMap.put("teamInfo", teamInfo.get());
        } else {
            resultMap.put("teamInfo", "팀 정보를 찾을 수 없습니다.");
        }
		
		boardList = boardRepository.findTop5ByIdOrderByBoardLikeDesc(pageable, teamNo);
		
		
		resultMap.put("teamInfo", teamInfo);
		resultMap.put("boardList", boardList);
		
		return resultMap;
	}
	
}
