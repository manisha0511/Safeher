package com.safeher.safeher_backend.repository;

import com.safeher.safeher_backend.model.SOSAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SOSAlertRepository
        extends JpaRepository<SOSAlert, Long> {

    List<SOSAlert> findByUserEmail(
            String userEmail
    );

}