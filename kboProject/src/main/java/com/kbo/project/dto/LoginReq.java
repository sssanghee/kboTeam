package com.kbo.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginReq {
	private String userId;
    private String password;
}
