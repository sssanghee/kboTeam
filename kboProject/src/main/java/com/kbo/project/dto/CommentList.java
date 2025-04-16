package com.kbo.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentList {
	private long commentNo;
	private long boardNo;
	private String userId;
	private String commentContent;
	private long commentLike;
	private String frsRgtDtm;
	
    public CommentList(Long commentNo, Long boardNo, String userId, String commentContent, int commentLike, String frsRgtDtm) {
        this.commentNo = commentNo;
        this.boardNo = boardNo;
        this.userId = userId;
        this.commentContent = commentContent;
        this.commentLike = commentLike;
        this.frsRgtDtm = frsRgtDtm;
    }
}
