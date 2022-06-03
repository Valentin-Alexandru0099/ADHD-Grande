package com.example.elGrande.service;

import com.example.elGrande.entity.Opinion;
import com.example.elGrande.repository.OpinionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OpinionService {

    @Autowired
    private OpinionRepository opinionRepository;

    public void deleteOpinion(Long id) {
        opinionRepository.delete(opinionRepository.findById(id).get());
    }

    public Opinion getOpinion(Long id){
        Optional<Opinion> opinion = opinionRepository.findById(id);
        return opinion.orElse(null);
    }
    public void updateOpinion(Opinion data, Long opinionId ){
        Opinion opinion = getOpinion(opinionId);
        opinion.setDescription(data.getDescription());
        opinionRepository.saveAndFlush(opinion);
    }
}
