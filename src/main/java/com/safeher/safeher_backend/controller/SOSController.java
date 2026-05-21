package com.safeher.safeher_backend.controller;

import com.safeher.safeher_backend.model.Contact;
import com.safeher.safeher_backend.model.SOSAlert;
import com.safeher.safeher_backend.repository.ContactRepository;
import com.safeher.safeher_backend.repository.SOSAlertRepository;
import com.safeher.safeher_backend.service.SmsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/sos")
@CrossOrigin("*")
public class SOSController {

    @Autowired
    private SOSAlertRepository sosAlertRepository;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private SmsService smsService;

    // SEND SOS
    @PostMapping("/send")
    public SOSAlert sendSOS(
            @RequestBody SOSAlert alert
    ) {

        // SAVE TIME
        alert.setAlertTime(
                LocalDateTime.now().toString()
        );

        // SAVE ALERT
        SOSAlert savedAlert =
                sosAlertRepository.save(alert);

        // GET CONTACTS
        List<Contact> contacts =
                contactRepository.findByUserEmail(
                        alert.getUserEmail()
                );

        // GOOGLE MAP LINK
        String mapLink =
                "https://maps.google.com/?q="
                        + alert.getLatitude()
                        + ","
                        + alert.getLongitude();

        // SEND SMS
        for (Contact contact : contacts) {

            String sms =
                    "🚨 EMERGENCY ALERT!\n\n"
                    + "User needs help.\n\n"
                    + "Live Location:\n"
                    + mapLink;

            try {

                smsService.sendSMS(
                        contact.getPhone(),
                        sms
                );

            } catch (Exception e) {

                e.printStackTrace();

            }

        }

        return savedAlert;

    }

    // GET HISTORY
    @GetMapping("/{email}")
    public List<SOSAlert> getHistory(
            @PathVariable String email
    ) {

        return sosAlertRepository
                .findByUserEmail(email);

    }

}