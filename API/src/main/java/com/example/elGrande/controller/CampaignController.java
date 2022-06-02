package com.example.elGrande.controller;

import com.example.elGrande.entity.Campaign;
import com.example.elGrande.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("api/campaigns")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignService.getAllCampaigns();
    }

    @GetMapping(value = "/count")
    public Long getCount() {
        return campaignService.getCount();
    }

    @GetMapping(value = "/campaign/{campaignId}")
    public Campaign getCampaign(@PathVariable Long campaignId) {
        return campaignService.getCampaign(campaignId);
    }

    @PostMapping(value = "/add-campaign")
    public void addCampaign(@RequestBody Campaign campaign) {
        campaignService.addCampaign(campaign);
    }

    @DeleteMapping(value = "delete-campaign/{campaignId}")
    public void deleteCampaign(@PathVariable Long campaignId) {
        campaignService.deleteCampaign(campaignId);
    }
}
