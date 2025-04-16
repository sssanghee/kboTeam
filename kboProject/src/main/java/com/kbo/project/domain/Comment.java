package com.kbo.project.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="comment")
public class Comment {

	@Id
	@Column(name = "COMMENT_NO")
    private long commentNo;
	
	@Column(name = "BOARD_NO")
    private long boardNo;

	@Column(name = "HIGH_COMMENT_NO")
    private long highCommentNo;
	
	@Column(name = "USER_ID")
    private String userId;
	
	@Column(name = "COMMENT_CONTENT")
    private String commentContent;
	
	@Column(name = "COMMENT_LIKE")
    private int commentLike;
	
	@Column(name = "FRS_RGT_DTM")
    private String frsRgtDtm;
	
	@Column(name = "LST_ALT_DTM")
    private String lstAltDtm;
}
