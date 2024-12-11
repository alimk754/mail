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
    @PostMapping("/mail/login")
    Mail log_in(@RequestBody DTO_mail m){
        Mail mail=new Mail.builder().email(m.getEmail()).build();
        return mailService.log_in(mail);
    }
    @PutMapping("/inmessages")
    Mail addin_message(@RequestBody DTO_mail obj){
        Message m1=obj.getMessage().clone();
        Mail mail1=new Mail.builder().email(obj.getFromemail()).build();

        Mail mail2=new Mail.builder().email(obj.getToemail()).build();
        Mail DB_mail=mailService.log_in(mail1);
        DB_mail.addin(m1);
        mailService.uptade(DB_mail);
        Mail DB_mail2=mailService.log_in(mail2);
        DB_mail2.addout(m1);
        mailService.uptade(DB_mail2);
        return DB_mail;
    }



}
