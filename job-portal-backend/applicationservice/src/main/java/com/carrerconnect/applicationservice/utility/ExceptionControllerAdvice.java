package com.carrerconnect.applicationservice.utility;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.carrerconnect.applicationservice.exception.CarrerConnectException;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class ExceptionControllerAdvice {
    @Autowired
    Environment environment;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorInfo> exceptionHandler(Exception exception) {
        ErrorInfo error = new ErrorInfo();
        //error.setErrorMessage(environment.getProperty("General.EXCEPTION_MESSAGE"));
//        String message = environment.getProperty("General.EXCEPTION_MESSAGE", exception.getMessage());
//        error.setErrorMessage(message != null ? message : "Internal server error");
        error.setErrorMessage(environment.getProperty(exception.getMessage(), exception.getMessage()));
        error.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        error.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(CarrerConnectException.class)
    public ResponseEntity<ErrorInfo> infyBankexceptionHandler(CarrerConnectException exception) {
        ErrorInfo error = new ErrorInfo();
        error.setErrorMessage(environment.getProperty(exception.getMessage()));
        error.setTimestamp(LocalDateTime.now());
        error.setErrorCode(HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({ConstraintViolationException.class, MethodArgumentNotValidException.class})
    public ResponseEntity<ErrorInfo> pathExceptionHandler(Exception exception) {
        ErrorInfo errorInfo = new ErrorInfo();
        errorInfo.setErrorCode(HttpStatus.BAD_REQUEST.value());
        errorInfo.setTimestamp(LocalDateTime.now());

        String errorMsg = "";
        if (exception instanceof ConstraintViolationException cve) {
            errorMsg = cve.getConstraintViolations().stream()
                .map(x -> x.getMessage())
                .collect(Collectors.joining(", "));
        } else if (exception instanceof MethodArgumentNotValidException manve) {
            errorMsg = manve.getBindingResult().getFieldErrors().stream()
                .map(x -> x.getDefaultMessage())
                .collect(Collectors.joining(", "));
        }
        errorInfo.setErrorMessage(errorMsg);
        return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorInfo> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        ErrorInfo error = new ErrorInfo();
        error.setErrorMessage("Invalid value for parameter '" + ex.getName() + "': '" + ex.getValue() + "'. Expected type: " + ex.getRequiredType().getSimpleName());
        error.setErrorCode(HttpStatus.BAD_REQUEST.value());
        error.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}