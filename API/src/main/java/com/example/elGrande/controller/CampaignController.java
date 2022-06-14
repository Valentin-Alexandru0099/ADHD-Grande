package com.example.elGrande.controller;

import com.example.elGrande.entity.Campaign;
import com.example.elGrande.entity.User;
import com.example.elGrande.model.UserInfo;
import com.example.elGrande.service.CampaignService;
import com.example.elGrande.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("api/campaigns")
public class CampaignController {

    @Autowired
    private UserService userService;

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

    @GetMapping(value = "/get-user-by-campaign/{campaignId}")
    public ResponseEntity<?> getUserForCampaign(@PathVariable Long campaignId){
        Campaign campaign = campaignService.getCampaign(campaignId);
        User userObj = (User) userService.loadUserByUsername(campaign.getUser().getUsername());

        UserInfo userInfo = new UserInfo();
        userInfo.setId(userObj.getId());
        userInfo.setUsername(userObj.getUsername());

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping(value = "/campaign/{campaignId}")
    public Campaign getCampaign(@PathVariable Long campaignId) {
        return campaignService.getCampaign(campaignId);
    }

    @PostMapping(value = "/add-campaign/{userId}")
    public void addCampaign(@RequestBody Campaign campaign, @PathVariable Long userId) {
        userService.addCampaign(campaign, userId);
    }

    @DeleteMapping(value = "delete-campaign/{campaignId}")
    public void deleteCampaign(@PathVariable Long campaignId) {
        campaignService.deleteCampaign(campaignId);
    }

    @PutMapping(value = "update-campaign/{campaignId}")
    public void updateCampaign(@RequestBody Campaign campaign, @PathVariable Long campaignId){
        campaignService.updateCampaign(campaign, campaignId);
    }
}
