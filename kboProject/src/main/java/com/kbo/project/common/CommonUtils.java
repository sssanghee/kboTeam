package com.kbo.project.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CommonUtils {
	
	/* 현재날짜 가져오기 ex) 2025-03-31 17:35:00 -> 20250331173500 */
	public static String getNow() {
		Date today = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		System.out.println("포맷 지정 후: " + dateFormat.format(today));

        String dateStr = dateFormat.format(today);
		return dateStr;
	}
	
}
