package com.example.elGrande.controller;

import com.example.elGrande.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("api/users")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping(value = "/count")
    public Long getCount(){
        return userService.getCount();
    }
}
