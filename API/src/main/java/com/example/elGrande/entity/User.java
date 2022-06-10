package com.example.elGrande.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;
    private LocalDate submissionTime;
    private String description;
    private String phoneNumber;
    @ElementCollection(fetch = FetchType.EAGER)
    @JsonIgnore
    private List<String> roles = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "user",
            orphanRemoval = true)
    @JsonIgnore
    private List<Campaign> campaignList;

    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "user",
            orphanRemoval = true)
    @JsonIgnore
    private List<Opinion> opinionList;

    public void addCampaign(Campaign campaign) {
        campaignList.add(campaign);
        campaign.setUser(this);
    }

    public void addOpinion(Long campaignId, Opinion opinion) {
        for (Campaign campaign : campaignList) {
            if (Objects.equals(campaign.getId(), campaignId)) {
                campaign.addOpinion(opinion);
                opinion.setCampaign(campaign);
                break;
            }
        }
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
