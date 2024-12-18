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
        String result = String.join(",", obj.getNamesToCheck());
        System.out.println(result);
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
        m1.setMultiRecipients(String.join(",", obj.getNamesToCheck()));
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
    @DeleteMapping("/deleteDrafts/{id}")
    public void deleteDrafts(@PathVariable List<Integer> id) {
        Iterator<Integer> i= id.iterator();
        while (i.hasNext()){
            int tmp= i.next();
            delete(tmp);
        }
    }


    @DeleteMapping("/{id}/{type}")
    public Mail semi_delete_out_Meseage(@PathVariable int id, @PathVariable boolean type) {
        Message message = mailService.getbyid(id);
        if (type)
            message.notify_deleteallsender(id, message);
        else message.notify_deleteformesender(id, message);
        Mail m1 = new Mail.builder().email(message.getFROM()).build();
        m1 = mailService.log_in(m1);
        m1 = mailService.uptade(m1);
        Mail m2 = new Mail.builder().email(message.getTO()).build();
        m2 = mailService.log_in(m2);
        if (type) m1.notify_deleteallsender(id, message);
        else m1.notify_deleteformereciver(id, message);
        mailService.uptademess(message);
        return m1;
    }
    @DeleteMapping("/aa/{id}/{type}")
    public void semi_delete_out_Meseag(@PathVariable  List<Integer> id, @PathVariable boolean type) {
        Iterator<Integer> i = id.iterator();
        while (i.hasNext()) {
            int tmp = i.next();
            semi_delete_out_Meseage(tmp,type);
        }

    }

    @DeleteMapping("/mess/{id}")
    public Mail semi_delete_in_message(@PathVariable int id) {
        Message message = mailService.getbyid(id);
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
    @DeleteMapping("/mess/aa/{id}")
    public void semi_delete_in_messag(@PathVariable List<Integer> id) {
        Iterator<Integer> i = id.iterator();
        while (i.hasNext()) {
            int tmp = i.next();
            semi_delete_in_message(tmp);
        }
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
    public ResponseEntity<Mail> delete(@PathVariable int id) {

        System.out.println(id);
        Message message = mailService.getbyid(id);
        Mail m1 = new Mail();
        if (message.arenull()) {
            mailService.handleDeleteMessage(message.getId());
            return ResponseEntity.notFound().build();
        } else if (message.issendernull()) {
            m1 = mailService.log_in(new Mail.builder().email(message.getFROM()).build());
            m1.deletetrash(id);
        } else {

            m1 = mailService.log_in(new Mail.builder().email(message.getTO()).build());
            m1.deletetrash(id);
        }
        System.out.println("bring deleted");
        return ResponseEntity.ok(mailService.uptade(m1));
    }
    @DeleteMapping("/delet/{id}")
    public void deleteApi(@PathVariable List<Integer> id) {
        Iterator<Integer> i= id.iterator();
        while (i.hasNext()){
            int tmp= i.next();
            delete(tmp);
        }
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
    @GetMapping("/check/{userName}")
    public void checkUserExists(@PathVariable String[] userName){
        Set<String> uniqueUserNames = new HashSet<>(Arrays.asList(userName));
        if (uniqueUserNames.size() < userName.length) {
            throw new RuntimeException("Error, There is Duplicated Name");
        }
        for (String s : userName) {
            try {
                Mail user2 = new Mail.builder().email(s).build();
                mailService.log_in((Mail) user2);
            }catch (Exception e) {
                throw new RuntimeException("User " + s + " Not Found");
            }
        }
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
