package com.example.elGrande.controller;

import com.example.elGrande.model.Opinion;
import com.example.elGrande.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("api/opinions")
public class OpinionController {

    @Autowired
    private CampaignService campaignService;

    @PostMapping(value = "/add-opinion/{campaignId}")
    public Opinion addOpinion(@RequestBody Opinion opinion, @PathVariable Long campaignId){
       return campaignService.addOpinion(opinion, campaignId);
    }
}
