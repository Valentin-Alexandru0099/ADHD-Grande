package com.example.elGrande.service;

import com.example.elGrande.model.Campaign;
import com.example.elGrande.service.DAO.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
