package com.carrerconnect.userservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrerconnect.userservice.dto.UserDTO;
import com.carrerconnect.userservice.exception.CareerConnectException;
import com.carrerconnect.userservice.service.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@Validated // Enables validation for method parameters (e.g., @PathVariable, @RequestParam)
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.createUser(userDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(
        @PathVariable @Min(value = 1, message = "User ID must be greater than 0") Long id
    ) throws CareerConnectException {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(
        @PathVariable @Min(value = 1, message = "User ID must be greater than 0") Long id,
        @Valid @RequestBody UserDTO userDTO
    ) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
        @PathVariable @Min(value = 1, message = "User ID must be greater than 0") Long id
    ) throws CareerConnectException {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}