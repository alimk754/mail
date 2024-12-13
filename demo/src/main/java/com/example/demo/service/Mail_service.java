package com.example.demo.service;

import com.example.demo.DAO.Mail_DAO;
import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class Mail_service implements Mail_DAO{
    Mail_DAO mail_dao;
    @Autowired
    public Mail_service(Mail_DAO mail_dao) {
        this.mail_dao = mail_dao;
    }
    @Override
    @Transactional
    public Mail sign_up(Mail m){
        return mail_dao.sign_up(m);
    }

    @Override
    @Transactional
    public Mail log_in(Mail m) {
        return mail_dao.log_in(m);
    }

    @Override
    @Transactional
    public Mail uptade(Mail m) {
        return mail_dao.uptade(m);
    }

    @Override
    @Transactional
    public Message getbyid(int id) {
        return mail_dao.getbyid(id);
    }


}
