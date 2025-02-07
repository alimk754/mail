package com.example.demo.controller;


import com.example.demo.DTOS.ContactDTO;

import com.example.demo.entity.Contact;
import com.example.demo.entity.Mail;

import com.example.demo.modelService.ContactService;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {
    ContactService contactService;
    @Autowired
    ContactController(ContactService service){
        contactService=service;
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Contact>> getContacts(@PathVariable String email) {
       return contactService.getContacts(email);
    }

    @PostMapping("/add")
    public ResponseEntity<Contact> addContact(@RequestBody ContactDTO request) {
        return contactService.addContact(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @RequestBody ContactDTO contactDTO) {
        return contactService.updateContact(id,contactDTO);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
       return contactService.deleteContact(id);
    }
}