package com.kbo.project.main.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.kbo.project.domain.Board;
import com.kbo.project.domain.TeamInfo;
import com.kbo.project.respository.BoardRepository;
import com.kbo.project.respository.TeamInfoRepository;

@Service
public class MainPageService {

	@Autowired
	TeamInfoRepository teamInfoRepository;
	@Autowired
	BoardRepository boardRepository;
	
	public Map<String, Object> mainPage() {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<TeamInfo> teamList = new ArrayList<TeamInfo>();  
		List<Board> boardList = new ArrayList<Board>();
		
		Pageable pageable = PageRequest.of(0, 5, Sort.by(Sort.Order.desc("boardLike")));
		
		teamList =  teamInfoRepository.findAll();
		boardList = boardRepository.findTop5ByOrderByBoardLikeDesc(pageable);
		
		
		resultMap.put("teamList", teamList);
		resultMap.put("boardList", boardList);
		
		return resultMap;
	}
}
