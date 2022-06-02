package com.example.elGrande.model;

import com.example.elGrande.entity.Campaign;
import com.example.elGrande.entity.Opinion;

import java.util.List;

public class UserInfo {

    private Long id;
    private String username;
    private List<Campaign> campaignList;
    private List<Opinion> opinionList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Campaign> getCampaignList() {
        return campaignList;
    }

    public void setCampaignList(List<Campaign> campaignList) {
        this.campaignList = campaignList;
    }

    public List<Opinion> getOpinionList() {
        return opinionList;
    }

    public void setOpinionList(List<Opinion> opinionList) {
        this.opinionList = opinionList;
    }
}
