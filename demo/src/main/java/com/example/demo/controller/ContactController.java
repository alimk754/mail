package com.example.demo.controller;


import com.example.demo.ContactDTO;

import com.example.demo.entity.Contact;
import com.example.demo.entity.Mail;

import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/contacts")
public class ContactController {
    private final Mail_service mailService;

    @Autowired
    public ContactController(Mail_service mailService) {
        this.mailService = mailService;
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Contact>> getContacts(@PathVariable String email) {
        Mail mail = mailService.log_in(new Mail.builder().email(email).build());
        return ResponseEntity.ok(mail.getContacts());
    }

    @PostMapping("/add")
    public ResponseEntity<Contact> addContact(@RequestBody ContactDTO request) {

        String email = request.getEmail();
        String name = request.getName();
        List<String> emails = request.getEmails();


        Mail mail = mailService.log_in(new Mail.builder().email(email).build());


        Contact contact = new Contact();
        contact.setName(name);
        contact.setEmails(emails);
        contact.setMail(mail);


        mail.addContact(contact);
        mailService.uptade(mail);



        return ResponseEntity.ok(contact);
    }
    @GetMapping("/test")
    public String test() {
        return "Working!";
    }
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @RequestBody ContactDTO contactDTO) {
        Contact contact = mailService.getContactById(id);
        if (contact == null) {
            return ResponseEntity.notFound().build();
        }

        contact.setName(contactDTO.getName());
        contact.setEmails(contactDTO.getEmails());

//        Mail mail = contact.getMail();
//        mailService.uptade(mail);

        return ResponseEntity.ok(contact);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        Contact contact = mailService.getContactById(id);
        if (contact == null) {
            return ResponseEntity.notFound().build();
        }



//        Mail mail = contact.getMail();
//        mail.removeContact(contact);
//        mailService.uptade(mail);

        return ResponseEntity.ok().build();
    }
}