package com.example.demo.criteria;

import com.example.demo.entity.Message;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class SubjectSender implements Criteria{

    private List<Message> list;
    private String Sender;
    private String subject;
    private static SubjectSender instance=null;
    private Criteria subjectCriteria=new SubjectCriteria(subject,list);
    private Criteria senderCriteria=new Sender(Sender,list);




    public String getSender() {
        return Sender;
    }

    public void setSender(String sender) {
        Sender = sender;
    }

    public String getSubject() {
        return subject;
    }

    public List<Message> getList() {
        return list;
    }

    public void setList(List<Message> list) {
        this.list = list;
    }

    private SubjectSender(String sender, String subject, List<Message> list) {
        this.list=list;
        Sender = sender;
        this.subject = subject;
        subjectCriteria=new SubjectCriteria(subject,list);
        senderCriteria=new Sender(Sender,list);
    }

    public static SubjectSender getInstance(String subject ,String sender,List<Message> m) {
        if(instance==null) instance=new SubjectSender(sender,subject,m);
        else {
            instance.setSubject(subject);
            instance.setSender(sender);
            instance.setList(m);
            instance.subjectCriteria=new SubjectCriteria(subject,m);
            instance.senderCriteria=new Sender(sender,m);
        }
        return instance;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    @Override
    public List<Message> meetCriteria() {
        List<Message>bySubject=subjectCriteria.meetCriteria();
        List<Message>bySender=senderCriteria.meetCriteria();
        Iterator<Message> i=bySender.iterator();
        List<Message> messages=new ArrayList<>();
        while (i.hasNext()){
            Message tmp=i.next();
            if(bySubject.contains(tmp)) messages.add(tmp);
        }
        return messages;
    }
}
