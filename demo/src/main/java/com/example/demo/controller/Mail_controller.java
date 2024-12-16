package com.example.demo.controller;

import com.example.demo.DTO_mail;
import com.example.demo.AttachmentDTO;

import com.example.demo.entity.Attachment;
import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.entity.Subscriber;
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
    @GetMapping("/retrieve/{id}/{receiver}")
    public void retrieve(@PathVariable int id,@PathVariable boolean receiver) {
        Message m = mailService.getbyid(id);


    }
    @DeleteMapping("/{id}/{type}")
    public Mail semi_delete_out_Meseage(@PathVariable int id,@PathVariable boolean type){
        Message message=mailService.getbyid(id);
        if(type)
        message.notify_deleteallsender(id,message);
        else message.notify_deleteformesender(id,message);
        Mail m1=new Mail.builder().email(message.getFROM()).build();
        m1=mailService.log_in((Mail) m1,"id");
        m1=mailService.uptade((Mail) m1);
        Mail m2=new Mail.builder().email(message.getTO()).build();
        m2=mailService.log_in((Mail) m2,"id");
        if(type) m1.notify_deleteallsender(id,message);
        else m1.notify_deleteformereciver(id,message);
        mailService.uptademess(message);
        return  m1;
    }
    @DeleteMapping("/mess/{id}")
    public Mail semi_delete_in_message(@PathVariable int id){
        Message message=mailService.getbyid(id);
        message.notify_deleteformereciver(id,new Message());
        Mail m1=new Mail.builder().email(message.getFROM()).build();
        m1=mailService.log_in((Mail) m1,"id");
        m1=mailService.uptade((Mail) m1);
        Mail m2=new Mail.builder().email(message.getTO()).build();
        m2=mailService.log_in((Mail) m2,"id");
        m2.notify_deleteformereciver(id,message);
        mailService.uptademess(message);
        return  m1;
    }

    @PutMapping("/deleteALl")
    public void deleteALl(@RequestBody DTO_mail m){
        if (!m.getIn().isEmpty()){
            for (Message message : m.getIn()) {
                semi_delete_out_Meseage(message.getId(),true);
            }
        }else if (!m.getOut().isEmpty()){
            for (Message message : m.getOut()) {
                semi_delete_in_message(message.getId());
            }
        }else if (!m.getTrash().isEmpty()) {
            for (Message mess : m.getTrash()) {
                delete(mess.getId());
            }
        }
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id){
        System.out.println("ffffff");

        Message message=mailService.getbyid(id);
        System.out.println(message.arenull());
        System.out.println(message.issendernull());
        System.out.println(message.isrecievernull());
        Mail m1=new Mail();
        if (message.arenull()) {
            mailService.handleDeleteMessage(message.getId());
            return;
        }
        else if(message.issendernull()){
            m1=mailService.log_in(new Mail.builder().email(message.getFROM()).build(),"id");
            m1.deletetrash(id);
        }
        else {
            System.out.println("ggggggggggggggg");
            m1 = mailService.log_in(new Mail.builder().email(message.getTO()).build(),"id");
            m1.deletetrash(id);
        }
        mailService.uptade(m1);
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
        Mail DB_mail= mailService.log_in(mail,"id");
        if(DB_mail.getPassword().equals(m.getPassword()))
            return ResponseEntity.ok(DB_mail);
        else throw new RuntimeException("Wrong Password");
    }
    @PutMapping("/message")
    Mail addin_message(@RequestBody DTO_mail obj) {
        Mail user1 = new Mail.builder().email(obj.getFromemail()).build();
        Mail mail1 = mailService.log_in((Mail) user1,"id");
        Mail user2 = new Mail.builder().email(obj.getToemail()).build();
        Mail mail2;
        try {
            mail2 = mailService.log_in((Mail) user2,"id");
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
                .sender((Mail) mail1)
                .reciever((Mail) mail2)
                .subject(obj.getSubject())
                .importance(obj.getImportance())
                .created_at()
                .attachments(attachments)
                .build();
        mail1.addout(m1);
        return mailService.uptade( mail1);
    }



}
