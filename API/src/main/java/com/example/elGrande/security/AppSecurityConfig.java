package com.example.elGrande.security;

import com.example.elGrande.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final JWTTokenHelper jWTTokenHelper;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    public AppSecurityConfig(UserService userService, JWTTokenHelper jWTTokenHelper, AuthenticationEntryPoint authenticationEntryPoint) {
        this.userService = userService;
        this.jWTTokenHelper = jWTTokenHelper;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint).and()
                .authorizeRequests((request) -> request.antMatchers(
                        "/",
                        "/api/*/count",
                        "/api/campaigns",
                        "/api/campaigns/campaign/*",
                        "/api/campaigns/get-user-by-campaign/*",
                        "/api/opinions/get-user-by-opinion/*",
                        "/api/users/register",
                        "/api/users/login",
                        "/api/users/user/*",
                        "/api/opinions/*",
                        "/api/payment/create-payment-intent",
                        "/api/payment/add-payment/*/*/*",
                        "/api/payment/get-user-by-payment/*").permitAll()

                )
                .authorizeRequests((request) -> request.antMatchers(
                                "/api/campaigns/add-campaign/*",
                                "/api/opinions/add-opinion/*",
                                "/api/campaigns/delete-campaign/*",
                                "/api/opinions/delete-opinion/*"
                        ).hasRole("USER")
                        .anyRequest().authenticated())
                .addFilterBefore(new JWTAuthenticationFilter(userService, jWTTokenHelper),
                        UsernamePasswordAuthenticationFilter.class);
        http.csrf().disable().cors().and().headers().frameOptions().disable();


    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
