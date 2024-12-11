package com.example.demo.controller;

import com.example.demo.entity.Mail;
import com.example.demo.entity.message;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Mail_controller {
    Mail_service mailService;
    @Autowired
    public Mail_controller(Mail_service mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/mail")
    Mail sign_up(@RequestBody Mail m){
        return mailService.sign_up(m);
    }
    @PostMapping("/mail/login")
    Mail log_in(@RequestBody Mail m){
        return mailService.log_in(m);
    }
   

}
