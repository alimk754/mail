package com.example.demo.controller;

import com.example.demo.DTOS.DTO_mail;
import com.example.demo.DTOS.AttachmentDTO;

import com.example.demo.DTOS.Filter_DTO;
import com.example.demo.DTOS.Sort_DAO;
import com.example.demo.criteria.Criteria;
import com.example.demo.criteria.SubjectSender;
import com.example.demo.entity.*;
import com.example.demo.modelService.MailService;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api")
public class Mail_controller {
    MailService mailService;


    @Autowired
    public Mail_controller(MailService mailService) {
        this.mailService = mailService;
    }


    @PostMapping("/mail")
    public ResponseEntity<Mail> signUp(@RequestBody DTO_mail m) {
        return mailService.signUp(m);
    }

    @PostMapping("/mail/login")
    ResponseEntity<Mail> log_in(@RequestBody DTO_mail m) {
        return mailService.log_in(m);
    }

    @PutMapping("/message")
    Mail addin_message(@RequestBody DTO_mail obj) {
        return mailService.addin_message(obj);
    }

    @PostMapping("/sort")
    public ResponseEntity<Mail> sort(@RequestBody Sort_DAO obj) {
        return mailService.sort(obj);
    }

    @DeleteMapping("/delete30/{id}")
    public void check(@PathVariable String id) {
        mailService.check(id);
    }

    @PutMapping("/filter")
    public void filter(@RequestBody Filter_DTO filter) {
         mailService.filter(filter);
    }
}
