package com.example.demo.controller;

import com.example.demo.DTOS.DTO_mail;
import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("api")
public class DeleteController {
    Mail_service mailService;
    DraftController draftController;

    @Autowired
    public DeleteController(Mail_service mailService) {
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
    public Mail semiDeleteoutMeseage(@PathVariable int id, @PathVariable boolean type) {
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
    public void semiDeleteOutMeseages(@PathVariable List<Integer> id, @PathVariable boolean type) {
        Iterator<Integer> i = id.iterator();
        while (i.hasNext()) {
            int tmp = i.next();
            semiDeleteoutMeseage(tmp,type);
        }

    }

    public Mail semiDeleteInMessage(@PathVariable int id) {
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
    public void semi_delete_in_messages(@PathVariable List<Integer> id) {
        Iterator<Integer> i = id.iterator();
        while (i.hasNext()) {
            int tmp = i.next();
            semiDeleteInMessage(tmp);
        }
    }

    @PutMapping("/deleteALL")
    public void deleteALl(@RequestBody DTO_mail m) {

        if (!m.getTrash().isEmpty()) {
            for (Message mess : m.getTrash()) {
                delete(mess.getId());
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

}
