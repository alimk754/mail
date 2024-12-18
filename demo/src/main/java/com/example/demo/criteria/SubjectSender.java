package com.example.demo.criteria;

import com.example.demo.entity.Message;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class SubjectSender implements Criteria{

    private String name;
    private String Sender;
    private String subject;
    private static SubjectSender instance=null;
    private Criteria subjectCriteria=new SubjectCriteria(name,subject);
    private Criteria senderCriteria=new Sender(name,Sender);
    private List<Message> bySubject=subjectCriteria.meetCriteria();
    private List<Message> bySender=senderCriteria.meetCriteria();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSender() {
        return Sender;
    }

    public void setSender(String sender) {
        Sender = sender;
    }

    public String getSubject() {
        return subject;
    }

    private SubjectSender(String name, String sender, String subject) {
        this.name = name;
        Sender = sender;
        this.subject = subject;
    }

    public static SubjectSender getInstance(String subject, String name, String sender) {
        if(instance==null) instance=new SubjectSender(name,sender,subject);
        else {
            instance.setSubject(subject);
            instance.setName(name);
            instance.setSender(sender);
        }
        return instance;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    @Override
    public List<Message> meetCriteria() {
        Iterator<Message> i=bySender.iterator();
        List<Message> messages=new ArrayList<>();
        while (i.hasNext()){
            Message tmp=i.next();
            if(bySubject.contains(tmp)) messages.add(tmp);
        }
        return messages;
    }
}
