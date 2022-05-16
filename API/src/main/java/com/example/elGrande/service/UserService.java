package com.example.elGrande.service;

import com.example.elGrande.service.DAO.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Long getCount(){
        return  userRepository.count();
    }
}
