package com.example.demo.modelService;

import com.example.demo.DTOS.AttachmentDTO;
import com.example.demo.DTOS.DTO_mail;
import com.example.demo.entity.Attachment;
import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Service
public class DraftService {

    Mail_service mailService;
    @Autowired
    public DraftService(Mail_service mailService) {
        this.mailService = mailService;
    }

    public void checkUserExists( String[] userName){
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
    public void deleteDraft( int id) {
        System.out.println(id);
        Mail m1 = new Mail.builder().email(mailService.getbyid(id).getFROM()).build();
        m1 = mailService.log_in((Mail) m1);
        m1.removeDraft(mailService.getbyid(id));
        mailService.handleDeleteMessage(id);
        mailService.update(m1);
    }

    public void deleteDrafts( List<Integer> id) {
        Iterator<Integer> i= id.iterator();
        while (i.hasNext()){
            int tmp= i.next();
            deleteDraft(tmp);
        }
    }

    public Mail addDraft( DTO_mail obj) {
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
        mailService.update(mail);
        return mail;
    }
}
