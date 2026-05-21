package com.safeher.safeher_backend.controller;

import com.safeher.safeher_backend.model.LowBatteryAlert;
import com.safeher.safeher_backend.repository.LowBatteryAlertRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/battery")
@CrossOrigin("*")
public class LowBatteryController {

    @Autowired
    private LowBatteryAlertRepository repository;

    @PostMapping("/alert")
    public LowBatteryAlert sendAlert(
            @RequestBody LowBatteryAlert alert
    ) {

        return repository.save(alert);

    }
}
