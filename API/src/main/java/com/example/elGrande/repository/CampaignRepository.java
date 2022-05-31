package com.example.elGrande.repository;

import com.example.elGrande.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    Campaign findCampaignsByName(String name);
}
