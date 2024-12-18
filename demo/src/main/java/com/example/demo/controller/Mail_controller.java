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
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api")
public class Mail_controller {
    Mail_service mailService;

    @Autowired
    public Mail_controller(Mail_service mailService) {
        this.mailService = mailService;
    }

    @GetMapping("/retrieve/{id}/{receiver}/{checkUser}")
    public void retrieve(@PathVariable int id, @PathVariable boolean receiver, @PathVariable boolean checkUser) {
        try {
            System.out.println("Retrieving message with ID: " + id);

            Message m = mailService.getbyid(id);
            System.out.println(LocalDateTime.now());
            if (checkUser) {
                m.setCreatedAt(LocalDateTime.now());
                mailService.uptademess(m);
            }


            if (m == null) {
                throw new RuntimeException("not found");
            }
            if (!receiver) {
                Mail mail1 = mailService.log_in(new Mail.builder().email(m.getFROM()).build());
                m.setSender(mail1);
                mail1.deletetrash(id);
            }

            Mail mail2 = mailService.log_in(new Mail.builder().email(m.getTO()).build());
            m.setReciever(mail2);
            mail2.deletetrash(id);
            mailService.uptademess(m);
            mailService.uptade(mail2);
        } catch (Exception e) {
            System.err.println("Error in retrieve method: " + e.getMessage());
            e.printStackTrace();
        }
        return;
    }

    @PostMapping("/addDraft")
    public Mail addDraft(@RequestBody DTO_mail obj) {
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
        Mail mail = mailService.log_in(new Mail.builder().email(obj.getFromemail()).build());
        Message m1 = new Message.massageBuilder()
                .message(obj.getMessage())
                .subject(obj.getSubject())
                .attachments(attachments)
                .importance(obj.getImportance())
                .created_at()
                .build();
        m1.setTO(obj.getToemail());
        m1.setFROM(obj.getFromemail());
        mail.addDraft(m1);
        mailService.uptade(mail);
        return mail;
    }

    @DeleteMapping("/deleteDraft/{id}")
    public void deleteDraft(@PathVariable int id) {
        System.out.println(id);
        Mail m1 = new Mail.builder().email(mailService.getbyid(id).getFROM()).build();
        m1 = mailService.log_in((Mail) m1);
        m1.removeDraft(mailService.getbyid(id));
        mailService.handleDeleteMessage(id);
        mailService.uptade(m1);
    }


    @DeleteMapping("/{id}/{type}")
    public Mail semi_delete_out_Meseage(@PathVariable int id, @PathVariable boolean type) {
        Message message = mailService.getbyid(id);
        message.setDeletedAt(LocalDateTime.now());
        if (type)
            message.notify_deleteallsender(id, message);
        else message.notify_deleteformesender(id, message);
        Mail m1 = new Mail.builder().email(message.getFROM()).build();
        m1 = mailService.log_in((Mail) m1);
        m1 = mailService.uptade((Mail) m1);
        Mail m2 = new Mail.builder().email(message.getTO()).build();
        m2 = mailService.log_in((Mail) m2);
        if (type) m1.notify_deleteallsender(id, message);
        else m1.notify_deleteformereciver(id, message);
        mailService.uptademess(message);
        return m1;
    }

    @DeleteMapping("/mess/{id}")
    public Mail semi_delete_in_message(@PathVariable int id) {
        Message message = mailService.getbyid(id);
        message.setDeletedAt(LocalDateTime.now());
        message.notify_deleteformereciver(id, new Message());
        Mail m1 = new Mail.builder().email(message.getFROM()).build();
        m1 = mailService.log_in((Mail) m1);
        m1 = mailService.uptade((Mail) m1);
        Mail m2 = new Mail.builder().email(message.getTO()).build();
        m2 = mailService.log_in((Mail) m2);
        m2.notify_deleteformereciver(id, message);
        mailService.uptademess(message);
        return m1;
    }

    @PutMapping("/deleteALl")
    public void deleteALl(@RequestBody DTO_mail m) {
        if (!m.getIn().isEmpty()) {
            for (Message message : m.getIn()) {
                semi_delete_out_Meseage(message.getId(), true);
            }
        } else if (!m.getOut().isEmpty()) {
            for (Message message : m.getOut()) {
                semi_delete_in_message(message.getId());
            }
        } else if (!m.getTrash().isEmpty()) {
            for (Message mess : m.getTrash()) {
                delete(mess.getId());
            }
        } else if (!m.getDrafts().isEmpty()) {
            for (Message message : m.getDrafts()) {
                deleteDraft(message.getId());
            }
        }
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {


        Message message = mailService.getbyid(id);
        Mail m1 = new Mail();
        if (message.arenull()) {
            mailService.handleDeleteMessage(message.getId());
            return;
        } else if (message.issendernull()) {
            m1 = mailService.log_in(new Mail.builder().email(message.getFROM()).build());
            m1.deletetrash(id);
        } else {

            m1 = mailService.log_in(new Mail.builder().email(message.getTO()).build());
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
    public void check(@PathVariable String userName) {
        Mail m = mailService.log_in(new Mail.builder().email(userName).build());
        List<Message> trash = m.getTrash();
        Iterator<Message> i = trash.iterator();
        while (i.hasNext()) {
            Message tmp = i.next();
            if (tmp.getDeletedAt().plusDays(30).isAfter(LocalDateTime.now())) {
                mailService.handleDeleteMessage(tmp.getId());
            }
        }
    }

    @PutMapping("/filter")
    public void filter(@RequestBody Filter_DTO filter) {
        System.out.println(filter.subject+" "+filter.directory+" "+filter.receiver);
        Criteria filtering = SubjectSender.getInstance(filter.subject, filter.Sender, filter.Sender);
        List<Message> messages = filtering.meetCriteria();
        Mail m = mailService.log_in(new Mail.builder().email(filter.receiver).build());
        List<UserFolder> u = m.getUserFolders();
        Iterator<UserFolder> i = u.iterator();
        while (i.hasNext()) {
            UserFolder tmp = i.next();
            if (tmp.getName().equals(filter.directory)) {
                tmp.addList(messages);
            }
        }
        mailService.uptade(m);
    }
}
