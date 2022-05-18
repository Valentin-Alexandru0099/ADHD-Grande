package com.example.elGrande.model;


import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;

    @OneToMany(cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Campaign> campaignList;

    @OneToMany(cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Opinion> opinionList;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", campaignList=" + campaignList +
                ", opinionList=" + opinionList +
                '}';
    }
}
