package com.example.elGrande.model;


import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Currency;
import java.util.List;

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
    orphanRemoval = true)
    private List<Opinion> opinionList;
}
