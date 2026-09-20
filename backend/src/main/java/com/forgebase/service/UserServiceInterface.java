package com.forgebase.service;

import com.forgebase.dto.CreateUserRequest;
import com.forgebase.dto.UserRequestDTO;
import com.forgebase.dto.UserResponseDTO;

import java.util.List;

public interface UserServiceInterface {
    UserResponseDTO createUser(CreateUserRequest request);
    UserResponseDTO getUserById(String id);
    UserResponseDTO getUserByEmail(String email);
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO updateUser(String id, UserRequestDTO dto);
    void deleteUser(String id);
    boolean existsByEmail(String email);
    UserResponseDTO syncUser(String clerkId, String email, String name);
    UserResponseDTO signUpUser(String clerkId, String email, String name);
}
