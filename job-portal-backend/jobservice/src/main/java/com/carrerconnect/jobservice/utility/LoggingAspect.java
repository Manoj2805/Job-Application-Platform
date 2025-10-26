package com.carrerconnect.jobservice.utility;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggingAspect {

	public static final Logger LOGGER = LogManager.getLogger(LoggingAspect.class);
	
	@AfterThrowing(pointcut = "execution(* com.carrerconnect.jobservice..*(..))", throwing = "exception")
	public void logServiceException(Exception exception) throws Exception {
		LOGGER.error(exception.getMessage(), exception);
	}
	
}
