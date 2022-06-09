package com.example.elGrande.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Opinion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private LocalDate submissionTime;

    @Enumerated(EnumType.ORDINAL)
    private Emote feeling;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Campaign campaign;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    @Override
    public String toString() {
        return "Opinion{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", campaign=" + campaign +
                ", user=" + user +
                '}';
    }
}