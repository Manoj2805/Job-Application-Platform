package com.carrerconnect.userservice.service;

import java.util.List;

import com.carrerconnect.userservice.dto.UserDTO;
import com.carrerconnect.userservice.exception.CareerConnectException;


public interface UserService {
	 UserDTO createUser(UserDTO userDTO);
	    UserDTO getUserById(Long id) throws CareerConnectException;
	    List<UserDTO> getAllUsers();
	    UserDTO updateUser(Long id, UserDTO userDTO);
	    void deleteUser(Long id) throws CareerConnectException;
}
