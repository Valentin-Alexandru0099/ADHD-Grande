package com.example.elGrande.service.DAO;

import com.example.elGrande.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
