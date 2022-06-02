package com.example.elGrande.controller;

import com.example.elGrande.entity.Campaign;
import com.example.elGrande.entity.Opinion;
import com.example.elGrande.entity.User;
import com.example.elGrande.model.UserInfo;
import com.example.elGrande.service.CampaignService;
import com.example.elGrande.service.OpinionService;
import com.example.elGrande.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("api/opinions")
public class OpinionController {

    @Autowired
    private OpinionService opinionService;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/get-user-by-opinion/{opinionId}")
    public ResponseEntity<?> getUserForCampaign(@PathVariable Long opinionId){
        Opinion opinion = opinionService.getOpinion(opinionId);
        User userObj = (User) userService.loadUserByUsername(opinion.getUser().getUsername());

        UserInfo userInfo = new UserInfo();
        userInfo.setId(userObj.getId());
        userInfo.setUsername(userObj.getUsername());

        return ResponseEntity.ok(userInfo);
    }

    @PostMapping(value = "/add-opinion/{campaignId}/{userId}/{campaignUserId}")
    public void addOpinion(@RequestBody Opinion opinion,
                           @PathVariable Long campaignId,
                           @PathVariable Long userId,
                           @PathVariable Long campaignUserId) {
        userService.addOpinion(opinion, campaignId, userId, campaignUserId);
    }

    @DeleteMapping(value = "/delete-opinion/{opinionId}")
    public void deleteOpinion(@PathVariable Long opinionId) {
        opinionService.deleteOpinion(opinionId);
    }

    @PutMapping(value = "/update-opinion/{opinionId}")
    public void updateOpinion(@RequestBody Opinion opinion, @PathVariable Long opinionId){
        opinionService.updateOpinion(opinion, opinionId);
    }
}
