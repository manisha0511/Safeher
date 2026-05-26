package com.safeher.safeher_backend.repository;

import com.safeher.safeher_backend.model.Contact;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository
        extends JpaRepository<Contact, Long> {

    List<Contact> findByUserEmail(
            String userEmail
    );

}