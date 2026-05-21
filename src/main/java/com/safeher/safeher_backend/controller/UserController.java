package com.safeher.safeher_backend.controller;

import com.safeher.safeher_backend.security.JwtUtil;
import com.safeher.safeher_backend.model.User;
import com.safeher.safeher_backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // SIGNUP API
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {

        return userRepository.save(user);

    }

    // LOGIN API
    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {

        User user =
                userRepository.findByEmail(
                        loginUser.getEmail()
                );

        if (
                user != null &&
                user.getPassword().equals(
                        loginUser.getPassword()
                )
        ) {

            return JwtUtil.generateToken(
                    user.getEmail()
            );

        } else {

            return "Invalid Email or Password";

        }
    }

    // GET USER BY EMAIL
    @GetMapping("/{email}")
    public User getUserByEmail(
            @PathVariable String email
    ) {

        return userRepository.findByEmail(email);

    }

    // UPDATE USER
    @PutMapping("/update")
    public User updateUser(@RequestBody User updatedUser) {
        return userRepository.save(updatedUser);
    }
}