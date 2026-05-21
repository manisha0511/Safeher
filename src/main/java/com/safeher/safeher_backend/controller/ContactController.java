package com.safeher.safeher_backend.controller;

import com.safeher.safeher_backend.model.Contact;
import com.safeher.safeher_backend.repository.ContactRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contacts")
@CrossOrigin("*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    // ADD CONTACT
    @PostMapping("/add")
    public Contact addContact(
            @RequestBody Contact contact
    ) {

        return contactRepository.save(contact);

    }

    // GET CONTACTS BY EMAIL
    @GetMapping("/{email}")
    public List<Contact> getContacts(
            @PathVariable String email
    ) {

        return contactRepository.findByUserEmail(email);

    }
}