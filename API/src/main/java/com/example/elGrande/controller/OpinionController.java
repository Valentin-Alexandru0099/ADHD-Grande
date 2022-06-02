package com.example.elGrande.controller;

import com.example.elGrande.entity.Opinion;
import com.example.elGrande.service.CampaignService;
import com.example.elGrande.service.OpinionService;
import com.example.elGrande.service.UserService;
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

    @Autowired
    private UserService userService;

    @PostMapping(value = "/add-opinion/{campaignId}/{userId}")
    public void addOpinion(@RequestBody Opinion opinion, @PathVariable Long campaignId,@PathVariable Long userId) {
        userService.addOpinion(opinion, campaignId, userId);
    }

    @DeleteMapping(value = "/delete-opinion/{opinionId}")
    public void deleteOpinion(@PathVariable Long opinionId) {
        opinionService.deleteOpinion(opinionId);
    }
}
