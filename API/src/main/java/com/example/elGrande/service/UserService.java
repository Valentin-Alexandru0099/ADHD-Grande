package com.example.elGrande.service;

import com.example.elGrande.entity.Campaign;
import com.example.elGrande.entity.User;
import com.example.elGrande.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;


@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public Long getCount() {
        return userRepository.count();
    }

    public void addUser(User user) {
        user.setPassword(passwordEncoder().encode(user.getPassword()));
        user.getRoles().add("ROLE_USER");
        userRepository.save(user);
    }

    public User getUser(Long id){
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);

    }

    public void addCampaign(Campaign campaign, Long userId){
        campaign.setSubmissionTime(LocalDate.now());
        campaign.setCurrentValue(BigDecimal.valueOf(0));

        User user = getUser(userId);
        user.addCampaign(campaign);

        userRepository.saveAndFlush(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (null == user) {
            throw new UsernameNotFoundException("User Not Found with userName " + username);
        }
        return user;
    }
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
