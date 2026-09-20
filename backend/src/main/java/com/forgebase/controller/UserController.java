package com.forgebase.controller;

import com.forgebase.dto.CreateUserRequest;
import com.forgebase.dto.SyncUserRequest;
import com.forgebase.dto.UserRequestDTO;
import com.forgebase.dto.UserResponseDTO;
import com.forgebase.exception.AccessDeniedException;
import com.forgebase.service.UserServiceInterface;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceInterface userService;

    private String getUserIdFromRequest() {
        Object userIdObj = org.springframework.web.context.request.RequestContextHolder
                .currentRequestAttributes()
                .getAttribute("userId", org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST);
        if (userIdObj == null) {
            throw new AccessDeniedException("User ID not found in request");
        }
        return userIdObj.toString();
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody CreateUserRequest request) {
        UserResponseDTO createdUser = userService.createUser(request);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/sync")
    public ResponseEntity<UserResponseDTO> syncUser(@RequestBody SyncUserRequest request) {
        UserResponseDTO syncedUser = userService.syncUser(request.clerkId(), request.email(), request.name());
        return ResponseEntity.ok(syncedUser);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDTO> signUpUser(@RequestBody SyncUserRequest request) {
        UserResponseDTO createdUser = userService.signUpUser(request.clerkId(), request.email(), request.name());
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable String id) {
        UserResponseDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserResponseDTO> getUserByEmail(@PathVariable String email) {
        UserResponseDTO user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/exists/email/{email}")
    public ResponseEntity<Boolean> checkEmailExists(@PathVariable String email) {
        boolean exists = userService.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable String id,
            @Valid @RequestBody UserRequestDTO dto) {
        String authenticatedUserId = getUserIdFromRequest();
        if (!id.equals(authenticatedUserId)) {
            throw new AccessDeniedException("You can only update your own profile");
        }
        UserResponseDTO updatedUser = userService.updateUser(id, dto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        String authenticatedUserId = getUserIdFromRequest();
        if (!id.equals(authenticatedUserId)) {
            throw new AccessDeniedException("You can only delete your own profile");
        }
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
