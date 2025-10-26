package com.carrerconnect.userservice.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carrerconnect.userservice.dto.UserDTO;
import com.carrerconnect.userservice.entity.User;
import com.carrerconnect.userservice.exception.CareerConnectException;
import com.carrerconnect.userservice.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	@Autowired
	private  UserRepository userRepository ;

    // Convert Entity to DTO
    private UserDTO mapToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }

    // Convert DTO to Entity
    private User mapToEntity(UserDTO dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        return user;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = mapToEntity(userDTO);
        User savedUser = userRepository.save(user);
        return mapToDTO(savedUser);
    }

    @Override
    public UserDTO getUserById(Long id) throws CareerConnectException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CareerConnectException("User.NOT_FOUND"));
        return mapToDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update fields
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());

        User updatedUser = userRepository.save(user);
        return mapToDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long id) throws CareerConnectException {
        if (!userRepository.existsById(id)) {
            throw new CareerConnectException("User.NOT_FOUND");
        }
        userRepository.deleteById(id);
    }
}