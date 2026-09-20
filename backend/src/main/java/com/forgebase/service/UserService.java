package com.forgebase.service;

import com.forgebase.dto.CreateUserRequest;
import com.forgebase.dto.UserRequestDTO;
import com.forgebase.dto.UserResponseDTO;
import com.forgebase.entity.User;
import com.forgebase.exception.DuplicateResourceException;
import com.forgebase.exception.ResourceNotFoundException;
import com.forgebase.mapper.UserMapper;
import com.forgebase.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements UserServiceInterface {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponseDTO createUser(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateResourceException("User", "email", request.email());
        }
        if (userRepository.existsById(request.clerkId())) {
            throw new DuplicateResourceException("User", "clerkId", request.clerkId());
        }
        User user = new User();
        user.setClerkId(request.clerkId());
        user.setEmail(request.email());
        user.setName(request.name());
        User savedUser = userRepository.save(user);
        return userMapper.toResponseDTO(savedUser);
    }

    @Override
    public UserResponseDTO getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return userMapper.toResponseDTO(user);
    }

    @Override
    public UserResponseDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return userMapper.toResponseDTO(user);
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO updateUser(String id, UserRequestDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userMapper.updateEntityFromDTO(dto, user);
        User updatedUser = userRepository.save(user);
        return userMapper.toResponseDTO(updatedUser);
    }

    @Override
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User", "id", id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserResponseDTO syncUser(String clerkId, String email, String name) {
        User user = userRepository.findById(clerkId).orElse(null);
        if (user == null) {
            // Create new user
            user = new User();
            user.setClerkId(clerkId);
            user.setEmail(email);
            user.setName(name);
            User savedUser = userRepository.save(user);
            return userMapper.toResponseDTO(savedUser);
        } else {
            // Update existing user
            user.setEmail(email);
            user.setName(name);
            User updatedUser = userRepository.save(user);
            return userMapper.toResponseDTO(updatedUser);
        }
    }

    @Override
    public UserResponseDTO signUpUser(String clerkId, String email, String name) {
        if (userRepository.existsById(clerkId)) {
            throw new DuplicateResourceException("User", "clerkId", clerkId);
        }
        User newUser = new User();
        newUser.setClerkId(clerkId);
        newUser.setEmail(email);
        newUser.setName(name);
        User savedUser = userRepository.save(newUser);
        return userMapper.toResponseDTO(savedUser);
    }
}
