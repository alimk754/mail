package com.example.demo.modelService;

import com.example.demo.DTOS.ContactDTO;
import com.example.demo.entity.Contact;
import com.example.demo.entity.Mail;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class ContactService {
    private final Mail_service mailService;

    @Autowired
    public ContactService(Mail_service mailService) {
        this.mailService = mailService;
    }


    public ResponseEntity<List<Contact>> getContacts( String email) {
        Mail mail = mailService.log_in(new Mail.builder().email(email).build());
        return ResponseEntity.ok(mail.getContacts());
    }


    public ResponseEntity<Contact> addContact(ContactDTO request) {

        String email = request.getEmail();
        String name = request.getName();
        List<String> emails = request.getEmails();

        Set<String> unique=new HashSet<>(emails);
        if(unique.size()!=emails.size())throw new RuntimeException("Duplicate email found");

        Mail mail = mailService.log_in(new Mail.builder().email(email).build());
        List<Contact> c=mail.getContacts();


        for (String e:emails){
            if (email != null && email.equals(e)) {
                throw new RuntimeException("can't add your account");
            }
            for(int i=0;i<c.size();i++){
                if(c.get(i).getEmails().contains(e))throw new RuntimeException("email already in contacts");
                if(c.get(i).getName().equals(name))throw new RuntimeException("This contact name used before");
            }

            Mail exist=new Mail.builder().email(e).build();
            mailService.log_in(exist);
        }




        Contact contact = new Contact();
        contact.setName(name);
        contact.setEmails(emails);
        contact.setMail(mail);


        mail.addContact(contact);
        mailService.update(mail);



        return ResponseEntity.ok(contact);
    }


    public ResponseEntity<Contact> updateContact( Long id, ContactDTO contactDTO) {

        String email = contactDTO.getEmail();
        String name = contactDTO.getName();
        List<String> emails = contactDTO.getEmails();

        Set<String> unique=new HashSet<>(emails);
        if(unique.size()!=emails.size())throw new RuntimeException("Duplicate email found");

        Mail mail = mailService.log_in(new Mail.builder().email(email).build());
        List<Contact> c=mail.getContacts();




        for (String e:emails){
            if (email != null && email.equals(e)) {
                throw new RuntimeException("can't add your account");
            }
            for(int i=0;i<c.size();i++){
                if(Objects.equals(c.get(i).getId(), id))continue;
                if(c.get(i).getEmails().contains(e))throw new RuntimeException("email already in contacts");
                if(c.get(i).getName().equals(name))throw new RuntimeException("This contact name used before");
            }

            Mail exist=new Mail.builder().email(e).build();
            mailService.log_in(exist);
        }


        Contact contact = mailService.getContactById(id);
        if (contact == null) {
            return ResponseEntity.notFound().build();
        }


        contact.setName(name);
        contact.setEmails(emails);

        Mail mail1 = contact.giveMail();
        mailService.update(mail1);

        return ResponseEntity.ok(contact);
    }

    public ResponseEntity<Void> deleteContact( Long id) {
        Contact contact = mailService.getContactById(id);
        if (contact == null) {
            return ResponseEntity.notFound().build();
        }
        Mail mail = contact.giveMail();
        mail.removeContact(contact);
        mailService.removeContact(id);
        mailService.update(mail);

        return ResponseEntity.ok().build();
    }
}
