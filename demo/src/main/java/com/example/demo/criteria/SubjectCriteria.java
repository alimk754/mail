package com.example.demo.criteria;

import com.example.demo.entity.Message;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class SubjectCriteria implements Criteria{

    private Mail_service mailService;
    @Autowired

    private String Name;
    private String str;

    public SubjectCriteria(String name, String str) {
        Name = name;
        this.str = str;
    }

    @Override
    public List<Message> meetCriteria() {
        return mailService.Search("subject",str,Name);
    }
}
