package com.example.demo.criteria;

import com.example.demo.entity.Message;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
public class Sender  implements  Criteria{

    private Mail_service mailService;
    @Autowired
    public Sender(Mail_service mailService) {
        this.mailService = mailService;
    }

    @Autowired
    String Name;
    String str;

    public Sender(String name, String str) {
        Name = name;
        this.str = str;
    }

    @Override
    public List<Message> meetCriteria() {
        return mailService.Search("subject",str,Name);
    }
}
