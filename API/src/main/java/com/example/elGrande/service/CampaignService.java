package com.example.elGrande.service;

import com.example.elGrande.entity.Campaign;
import com.example.elGrande.entity.Opinion;
import com.example.elGrande.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    public Long getCount() {
        return campaignRepository.count();
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Campaign getCampaign(Long id) {
        Optional<Campaign> campaign = campaignRepository.findById(id);
        return campaign.orElse(null);
    }

    public void deleteCampaign(Long id) {
        campaignRepository.delete(campaignRepository.findById(id).get());
    }

    public void updateCampaign(Campaign data, Long id){
        Campaign campaign = getCampaign(id);
        campaign.setName(data.getName());
        campaign.setDescription(data.getDescription());
        campaign.setTargetValue(data.getTargetValue());
        campaignRepository.saveAndFlush(campaign);
    }
}

