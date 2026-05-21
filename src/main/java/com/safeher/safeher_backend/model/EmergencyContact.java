package com.safeher.safeher_backend.model;

import jakarta.persistence.*;

@Entity
public class EmergencyContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String relation;
    private String phone;
    private String userEmail;

    public EmergencyContact() {
    }

    public EmergencyContact(
            String name,
            String relation,
            String phone,
            String userEmail
    ) {
        this.name = name;
        this.relation = relation;
        this.phone = phone;
        this.userEmail = userEmail;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getRelation() {
        return relation;
    }

    public String getPhone() {
        return phone;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}