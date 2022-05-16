package com.example.elGrande.controller;

import com.example.elGrande.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("api/campaign")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;


    @GetMapping(value = "/count")
    public Long getCount(){
        return campaignService.getCount();
    }
}
