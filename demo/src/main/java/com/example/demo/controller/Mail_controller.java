package com.example.demo.controller;

import com.example.demo.DTO_mail;

import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
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
    Mail sign_up(@RequestBody DTO_mail m){
        Mail mail=new Mail.builder().email(m.getEmail()).password(m.getPassword()).build();
        return mailService.sign_up(mail);
    }
    @GetMapping("/mail/login")
    Mail log_in(@RequestBody DTO_mail m){
        Mail mail=new Mail.builder().email(m.getEmail()).build();
        Mail DB_mail= mailService.log_in(mail);
        if(DB_mail.getPassword()!=m.getPassword()){
            throw new RuntimeException();
        }
        else return DB_mail;
    }
    @PutMapping("/message")
    Mail addin_message(@RequestBody DTO_mail obj) {
         Mail user1=new Mail.builder().email(obj.getFromemail()).build();
         Mail mail1=mailService.log_in(user1);
         Mail user2=new Mail.builder().email(obj.getToemail()).build();
         Mail mail2=mailService.log_in(user2);
         Message m1=new Message.builder().message(obj.getMessage().getMessage()).sender(mail1).reciever(mail2).build();
         mail1.addin(m1);

         Mail returned_mail=mailService.uptade(mail1);
         return returned_mail;
    }



}
