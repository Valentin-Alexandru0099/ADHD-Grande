package com.example.elGrande.service;

import com.example.elGrande.model.Campaign;
import com.example.elGrande.model.Opinion;
import com.example.elGrande.service.DAO.CampaignRepository;
import com.example.elGrande.service.DAO.OpinionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    public Long getCount(){
        return campaignRepository.count();
    }
    public List<Campaign> getAllCampaigns(){
        return  campaignRepository.findAll();
    }

    public Campaign getCampaign(Long id){
        Optional<Campaign> campaign = campaignRepository.findById(id);
        return campaign.orElse(null);
    }

    public Opinion addOpinion(Opinion opinion, Long campaignId){
        Campaign campaign = campaignRepository.findById(campaignId).get();
        campaign.addOpinion(opinion);
        campaignRepository.saveAndFlush(campaign);
        return opinion;
    }
}

