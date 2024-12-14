package com.example.demo.controller;

import com.example.demo.DTO_mail;
import com.example.demo.AttachmentDTO;

import com.example.demo.entity.Attachment;
import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class Mail_controller {
    Mail_service mailService;
    @Autowired
    public Mail_controller(Mail_service mailService) {
        this.mailService = mailService;
    }
    @DeleteMapping("/{id}")
    public Mail semi_deleteMessage(@PathVariable int id){
        Message message=mailService.getbyid(id);
        message.setSender(null);
        message.setReciever(null);
        Mail m1=new Mail.builder().email(message.getFROM()).build();
        m1=mailService.log_in(m1);
        m1.deleteout(id);
        m1.deleteout(id);
        m1.addtrash(message);
        m1=mailService.uptade(m1);
        Mail m2=new Mail.builder().email(message.getTO()).build();
        m2=mailService.log_in(m2);
        m2.deletein(id);
        m2.deleteout(id);
        m2=mailService.uptade(m2);
        mailService.uptademess(message);
        return m1;
    }
    @DeleteMapping("/mess/{id}")
    public Mail semi_delete(@PathVariable int id){
        System.out.println(id);
        Message message=mailService.getbyid(id);
        message.setReciever(null);
        Mail m1=new Mail.builder().email(message.getTO()).build();
        Mail m2=new Mail.builder().email(message.getFROM()).build();
        m1=mailService.log_in(m1);
        m1.deleteout(id);
        m1.deleteout(id);
        m1.addtrash(message);

        mailService.uptademess(message);
        mailService.uptade(m1);
        return mailService.log_in(m2);
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
        Mail user1 = new Mail.builder().email(obj.getFromemail()).build();
        Mail mail1 = mailService.log_in(user1);
        Mail user2 = new Mail.builder().email(obj.getToemail()).build();
        Mail mail2;
        try {
            mail2 = mailService.log_in(user2);
        } catch(Exception e) {
            throw new RuntimeException("User Not Found");
        }


        List<Attachment> attachments = new ArrayList<>();
        if (obj.getAttachments() != null) {
            for (AttachmentDTO attachmentDTO : obj.getAttachments()) {
                Attachment attachment = new Attachment();
                attachment.setFileName(attachmentDTO.getFileName());
                attachment.setContentType(attachmentDTO.getContentType());
                attachment.setFileSize(attachmentDTO.getFileSize());
                attachment.setData(attachmentDTO.getData());
                attachments.add(attachment);
            }
        }

        Message m1 = new Message.massageBuilder()
                .message(obj.getMessage())
                .sender(mail1)
                .reciever(mail2)
                .subject(obj.getSubject())
                .importance(obj.getImportance())
                .created_at()
                .attachments(attachments)
                .build();

        mail1.addout(m1);
        return mailService.uptade(mail1);
    }



}
