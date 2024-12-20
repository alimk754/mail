package com.example.demo.controller;

import com.example.demo.DTOS.DTO_mail;
import com.example.demo.DTOS.AttachmentDTO;

import com.example.demo.DTOS.Filter_DTO;
import com.example.demo.DTOS.Sort_DAO;
import com.example.demo.criteria.Criteria;
import com.example.demo.criteria.SubjectSender;
import com.example.demo.entity.*;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api")
public class Mail_controller {
    Mail_service mailService;
    DraftController draftController;

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
    ResponseEntity<Mail> log_in(@RequestBody DTO_mail m) {
        Mail mail = new Mail.builder().email(m.getEmail()).build();
        Mail DB_mail = mailService.log_in(mail);
        if (DB_mail.getPassword().equals(m.getPassword()))
            return ResponseEntity.ok(DB_mail);
        else throw new RuntimeException("Wrong Password");
    }
    @PutMapping("/message")
    Mail addin_message(@RequestBody DTO_mail obj) {
        Mail user1 = new Mail.builder().email(obj.getFromemail()).build();
        Mail mail1 = mailService.log_in((Mail) user1);
        Mail user2 = new Mail.builder().email(obj.getToemail()).build();
        Mail mail2;
        try {
            mail2 = mailService.log_in((Mail) user2);
        } catch (Exception e) {
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
        return mailService.uptade(mail1);
    }

    @PostMapping("/sort")
    public ResponseEntity<Mail> sort(@RequestBody Sort_DAO obj) {
        return ResponseEntity.ok(mailService.sort(obj.sortField, obj.isAsc, obj.id));
    }

    @DeleteMapping("/delete30/{id}")
    public void check(@PathVariable String id) {

        Mail m = mailService.log_in(new Mail.builder().email(id).build());
        List<Message> trash = m.getTrash();
        Iterator<Message> i = trash.iterator();
        while (i.hasNext()) {
            Message tmp = i.next();
            System.out.println(tmp.getDeletedAt().plusSeconds(10).isBefore(LocalDateTime.now()));
            if (tmp.getDeletedAt().plusDays(30).isBefore(LocalDateTime.now())) {
                m.getTrash().remove(tmp);
                mailService.handleDeleteMessage(tmp.getId());
            }
        }
    }

    @PutMapping("/filter")
    public void filter(@RequestBody Filter_DTO filter) {
       Mail m1=mailService.log_in(new Mail.builder().email(filter.receiver).build());
       List<Message> messages=m1.getIn();
       Criteria f=SubjectSender.getInstance(filter.subject, filter.Sender, messages);
       List<Message> userList=f.meetCriteria();
       List<UserFolder> u1=m1.getUserFolders();
       Iterator<UserFolder> i=u1.iterator();
       boolean flag= true;
       while (i.hasNext()){
           UserFolder tmp=i.next();
           if(tmp.getName().equals(filter.directory)){
               tmp.addList(userList);
               flag=false;
           }
       }
       if(flag) throw new RuntimeException("the folder doesn't exist");
       mailService.uptade(m1);
    }
}
