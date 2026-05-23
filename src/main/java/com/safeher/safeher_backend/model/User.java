package com.safeher.safeher_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String name;

    private String phone;

    private String email;

    private String password;

    private String bloodGroup;

    private String address;

    @Column(
            name = "profile_image",
            columnDefinition = "LONGTEXT"
    )
    private String profileImage;

    // GET ID
    public Long getId() {

        return id;

    }

    // SET ID
    public void setId(Long id) {

        this.id = id;

    }

    // GET NAME
    public String getName() {

        return name;

    }

    // SET NAME
    public void setName(String name) {

        this.name = name;

    }

    // GET PHONE
    public String getPhone() {

        return phone;

    }

    // SET PHONE
    public void setPhone(String phone) {

        this.phone = phone;

    }

    // GET EMAIL
    public String getEmail() {

        return email;

    }

    // SET EMAIL
    public void setEmail(String email) {

        this.email = email;

    }

    // GET PASSWORD
    public String getPassword() {

        return password;

    }

    // SET PASSWORD
    public void setPassword(String password) {

        this.password = password;

    }

    // GET BLOOD GROUP
    public String getBloodGroup() {

        return bloodGroup;

    }

    // SET BLOOD GROUP
    public void setBloodGroup(String bloodGroup) {

        this.bloodGroup = bloodGroup;

    }

    // GET ADDRESS
    public String getAddress() {

        return address;

    }

    // SET ADDRESS
    public void setAddress(String address) {

        this.address = address;

    }

    // GET PROFILE IMAGE
    public String getProfileImage() {

        return profileImage;

    }

    // SET PROFILE IMAGE
    public void setProfileImage(String profileImage) {

        this.profileImage = profileImage;

    }

}