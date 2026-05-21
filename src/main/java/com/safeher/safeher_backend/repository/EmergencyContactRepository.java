package com.safeher.safeher_backend.repository;

import com.safeher.safeher_backend.model.EmergencyContact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmergencyContactRepository
        extends JpaRepository<EmergencyContact, Long> {

    List<EmergencyContact> findByUserEmail(String userEmail);
}
