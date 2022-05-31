package com.example.elGrande.controller;

import com.example.elGrande.entity.Opinion;
import com.example.elGrande.service.CampaignService;
import com.example.elGrande.service.OpinionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("api/opinions")
public class OpinionController {

    @Autowired
    private CampaignService campaignService;

    @Autowired
    private OpinionService opinionService;

    @PostMapping(value = "/add-opinion/{campaignId}")
    public Opinion addOpinion(@RequestBody Opinion opinion, @PathVariable Long campaignId) {
        return campaignService.addOpinion(opinion, campaignId);
    }

    @DeleteMapping(value = "/delete-opinion/{opinionId}")
    public void deleteOpinion(@PathVariable Long opinionId) {
        opinionService.deleteOpinion(opinionId);
    }
}
