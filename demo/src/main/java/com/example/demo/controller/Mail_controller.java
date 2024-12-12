package com.example.demo.controller;

import com.example.demo.DTO_mail;

import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class Mail_controller {
    Mail_service mailService;
    @Autowired
    public Mail_controller(Mail_service mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/mail")
    public ResponseEntity<Mail> signUp(@RequestBody DTO_mail m) {
        Mail mail = new Mail.builder()
                .email(m.getEmail())
                .password(m.getPassword())
                .build();

        Mail savedMail = mailService.sign_up(mail);
        return ResponseEntity.ok(savedMail);
    }
    @PostMapping("/mail/login")
    ResponseEntity<Mail> log_in(@RequestBody DTO_mail m){
        Mail mail=new Mail.builder().email(m.getEmail()).build();
        Mail DB_mail= mailService.log_in(mail);
        if(DB_mail.getPassword().equals(m.getPassword()))
            return ResponseEntity.ok(DB_mail);
        else throw new RuntimeException("Wrong Password");
    }
    @PutMapping("/message")
    Mail addin_message(@RequestBody DTO_mail obj) {
         Mail user1=new Mail.builder().email(obj.getFromemail()).build();
         Mail mail1=mailService.log_in(user1);
         Mail user2=new Mail.builder().email(obj.getToemail()).build();
         Mail mail2=mailService.log_in(user2);
         Message m1=new Message.massageBuilder()
                 .message(obj.getMessage())
                 .sender(mail1).reciever(mail2)
                 .subject(obj.getSubject())
                 .importance(obj.getImportance())
                 .created_at()
                 .build();
         mail1.addout(m1);

         Mail returned_mail=mailService.uptade(mail1);
         return returned_mail;
    }



}
