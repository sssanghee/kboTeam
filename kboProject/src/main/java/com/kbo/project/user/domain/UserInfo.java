package com.kbo.project.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="userinfo")
public class UserInfo {

	@Id
	@Column(name = "USER_ID")
    private String userId;
	
	@Column(name = "USER_NAME")
    private String userName;
	
	@Column(name = "PASSWORD")
    private String password;
	
	@Column(name = "USER_STAT_CL_CD")
	private String userStatClCd;
	
	@Column(name = "USER_ROLE")
	private String userRole;
	
	@Column(name = "FRS_RGT_DTM")
	private String frsRgtDtm;
	
	@Column(name = "LST_ALT_DTM")
	private String lstAltDtm;
}
