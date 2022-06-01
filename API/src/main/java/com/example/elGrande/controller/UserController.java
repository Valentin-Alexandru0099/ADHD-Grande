package com.example.elGrande.controller;

import com.example.elGrande.entity.User;
import com.example.elGrande.security.JWTTokenHelper;
import com.example.elGrande.security.LoginResponse;
import com.example.elGrande.security.AuthenticationRequest;
import com.example.elGrande.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JWTTokenHelper jWTTokenHelper;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/count")
    public Long getCount() {
        return userService.getCount();
    }

    @PostMapping(value = "/register")
    public void register(@RequestBody User user) {
        userService.addUser(user);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        String jwtToken = jWTTokenHelper.generateToken(user.getUsername(), user.getId());
        System.out.println(jwtToken);
        LoginResponse response = new LoginResponse();
        response.setToken(jwtToken);
        return ResponseEntity.ok(response);
    }
}
