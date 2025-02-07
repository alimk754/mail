package com.example.demo.modelService;

import com.example.demo.DTOS.AttachmentDTO;
import com.example.demo.DTOS.DTO_mail;
import com.example.demo.DTOS.Filter_DTO;
import com.example.demo.DTOS.Sort_DAO;
import com.example.demo.criteria.Criteria;
import com.example.demo.criteria.SubjectSender;
import com.example.demo.entity.Attachment;
import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.entity.UserFolder;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class MailService {
    Mail_service mailService;


    @Autowired
    public MailService(Mail_service mailService) {
        this.mailService = mailService;
    }



    public ResponseEntity<Mail> signUp( DTO_mail m) {
        Mail mail = new Mail.builder()
                .email(m.getEmail())
                .password(m.getPassword())
                .build();

        Mail savedMail = mailService.sign_up(mail);
        return ResponseEntity.ok(savedMail);
    }


    public ResponseEntity<Mail> log_in( DTO_mail m) {
        Mail mail = new Mail.builder().email(m.getEmail()).build();
        Mail DB_mail = mailService.log_in(mail);
        if (DB_mail.getPassword().equals(m.getPassword()))
            return ResponseEntity.ok(DB_mail);
        else throw new RuntimeException("Wrong Password");
    }

    public Mail addin_message( DTO_mail obj) {
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
        return mailService.update(mail1);
    }
    public ResponseEntity<Mail> sort( Sort_DAO obj) {
        return ResponseEntity.ok(mailService.sort(obj.sortField, obj.isAsc, obj.id));
    }
    public void check( String id) {

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
    public void filter( Filter_DTO filter) {
        Mail m1=mailService.log_in(new Mail.builder().email(filter.receiver).build());
        List<Message> messages=m1.getIn();
        Criteria f= SubjectSender.getInstance(filter.subject, filter.Sender, messages);
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
        mailService.update(m1);
    }
}
