package com.carrerconnect.userservice.service;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.carrerconnect.userservice.dto.UserDTO;
import com.carrerconnect.userservice.entity.User;
import com.carrerconnect.userservice.exception.CareerConnectException;
import com.carrerconnect.userservice.repository.UserRepository;

class UserServiceImplTest {
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }// This ensures that each test method gets a fresh set of mocks, preventing state leakage between tests.

    @Test
    void createUser_success() {
        UserDTO userDTO = new UserDTO();
        userDTO.setName("John");
        userDTO.setEmail("john@example.com");
        userDTO.setRole("USER");
        User user = new User();
        user.setId(1L);
        user.setName("John");
        user.setEmail("john@example.com");
        user.setRole("USER");
        when(userRepository.save(any(User.class))).thenReturn(user);
        UserDTO result = userService.createUser(userDTO);
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("John", result.getName());
        assertEquals("john@example.com", result.getEmail());
        assertEquals("USER", result.getRole());
    }

    @Test
    void getUserById_success() throws CareerConnectException {
        User user = new User();
        user.setId(1L);
        user.setName("John");
        user.setEmail("john@example.com");
        user.setRole("USER");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        UserDTO result = userService.getUserById(1L);
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("John", result.getName());
    }

    @Test
    void getUserById_notFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(CareerConnectException.class, () -> userService.getUserById(1L));
    }

    @Test
    void getAllUsers_success() {
        User user1 = new User();
        user1.setId(1L);
        user1.setName("John");
        user1.setEmail("john@example.com");
        user1.setRole("USER");
        User user2 = new User();
        user2.setId(2L);
        user2.setName("Jane");
        user2.setEmail("jane@example.com");
        user2.setRole("ADMIN");
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));
        List<UserDTO> result = userService.getAllUsers();
        assertEquals(2, result.size());
        assertEquals("John", result.get(0).getName());
        assertEquals("Jane", result.get(1).getName());
    }

    @Test
    void updateUser_success() {
        User user = new User();
        user.setId(1L);
        user.setName("Old Name");
        user.setEmail("old@example.com");
        user.setRole("USER");
        UserDTO userDTO = new UserDTO();
        userDTO.setName("New Name");
        userDTO.setEmail("new@example.com");
        userDTO.setRole("ADMIN");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);
        UserDTO result = userService.updateUser(1L, userDTO);
        assertNotNull(result);
        assertEquals("New Name", result.getName());
        assertEquals("new@example.com", result.getEmail());
        assertEquals("ADMIN", result.getRole());
    }

    @Test
    void updateUser_notFound() {
        UserDTO userDTO = new UserDTO();
        userDTO.setName("New Name");
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> userService.updateUser(1L, userDTO));
    }

    @Test
    void deleteUser_success() throws CareerConnectException {
        when(userRepository.existsById(1L)).thenReturn(true);
        doNothing().when(userRepository).deleteById(1L);
        assertDoesNotThrow(() -> userService.deleteUser(1L));
    }

    @Test
    void deleteUser_notFound() {
        when(userRepository.existsById(1L)).thenReturn(false);
        assertThrows(CareerConnectException.class, () -> userService.deleteUser(1L));
    }
}
