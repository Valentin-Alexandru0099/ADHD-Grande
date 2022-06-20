package com.example.elGrande.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private BigDecimal targetValue;
    private BigDecimal currentValue;
    private Currency currency;
    private LocalDate submissionTime;

    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "campaign",
            orphanRemoval = true)
    private List<Opinion> opinionList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "campaign",
            orphanRemoval = true)
    private List<Payment> paymentList = new ArrayList<>();


    public void addOpinion(Opinion opinion) {
        this.opinionList.add(opinion);
        opinion.setCampaign(this);
    }

    public void removeOpinion(Opinion opinion) {
        opinionList.remove(opinion);
        opinion.setCampaign(null);
    }

    public void addPayment(Payment payment){
        paymentList.add(payment);
        payment.setCampaign(this);
    }

    @Override
    public String toString() {
        return "Campaign{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", targetValue=" + targetValue +
                ", currentValue=" + currentValue +
                ", currency=" + currency +
                ", submissionTime=" + submissionTime +
                ", opinionList=" + opinionList +
                ", user=" + user +
                '}';
    }
}
