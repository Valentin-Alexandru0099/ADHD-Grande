package com.example.elGrande.service;

import com.example.elGrande.repository.OpinionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OpinionService {

    @Autowired
    private OpinionRepository opinionRepository;

    public void deleteOpinion(Long id) {
        opinionRepository.delete(opinionRepository.findById(id).get());
    }
}
