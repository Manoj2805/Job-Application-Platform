package com.carrerconnect.userservice.utility;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.carrerconnect.userservice.exception.CareerConnectException;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class ExceptionControllerAdvice {

    @Autowired
    private Environment environment;

    // Generic Exception handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorInfo> exceptionHandler(Exception exception) {
        ErrorInfo error = new ErrorInfo();
        error.setErrorMessage(environment.getProperty("General.EXCEPTION_MESSAGE", exception.getMessage()));
        error.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        error.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    
    @ExceptionHandler(CareerConnectException.class)
    public ResponseEntity<ErrorInfo> careerConnectExceptionHandler(CareerConnectException exception) {
        ErrorInfo error = new ErrorInfo();
        error.setErrorMessage(environment.getProperty(exception.getMessage(), exception.getMessage()));
        error.setErrorCode(HttpStatus.NOT_FOUND.value());
        error.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    // Validation exception handler (ConstraintViolation & MethodArgumentNotValid)
    @ExceptionHandler({ConstraintViolationException.class, MethodArgumentNotValidException.class})
    public ResponseEntity<ErrorInfo> validationExceptionHandler(Exception exception) {
        ErrorInfo errorInfo = new ErrorInfo();
        errorInfo.setErrorCode(HttpStatus.BAD_REQUEST.value());
        errorInfo.setTimestamp(LocalDateTime.now());

        String errorMsg = "";

        if (exception instanceof ConstraintViolationException) {
            ConstraintViolationException cve = (ConstraintViolationException) exception;
            errorMsg = cve.getConstraintViolations().stream()
                    .map(x -> x.getMessage())
                    .collect(Collectors.joining(", "));
        } else if (exception instanceof MethodArgumentNotValidException) {
            MethodArgumentNotValidException manve = (MethodArgumentNotValidException) exception;
            errorMsg = manve.getBindingResult().getFieldErrors().stream()
                    .map(x -> x.getDefaultMessage())
                    .collect(Collectors.joining(", "));
        }

        errorInfo.setErrorMessage(errorMsg);
        return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
    }
}