package com.safeher.safeher_backend.repository;

import com.safeher.safeher_backend.model.LowBatteryAlert;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LowBatteryAlertRepository
        extends JpaRepository<LowBatteryAlert, Long> {
}