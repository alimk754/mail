package com.example.demo.service;

import com.example.demo.DAO.Mail_DAO;
import com.example.demo.entity.Contact;
import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class Mail_service {
    Mail_DAO mail_dao;
    @Autowired
    public Mail_service(Mail_DAO mail_dao) {
        this.mail_dao = mail_dao;
    }
    @Transactional
    public Mail sign_up(Mail m){
        return mail_dao.sign_up(m);
    }

    @Transactional
    public Mail log_in(Mail m) {
        return mail_dao.log_in(m);
    }

    @Transactional
    public Mail uptade(Mail m) {
        return mail_dao.uptade(m);
    }

    @Transactional
    public Message getbyid(int id) {
        return mail_dao.getbyid(id);
    }
    @Transactional
    public Contact getContactById(long id) {
        return mail_dao.getContactById(id);
    }

    @Transactional
    public Message uptademess(Message m) {
        return mail_dao.uptademess(m);
    }

    @Transactional
    public void handleDeleteMessage(int id) {
        mail_dao.handleDeleteMessage(id);
    }
    @Transactional
    public Mail sort(String sortField,boolean isAsc,String id){
       String Asc;

       if(isAsc) Asc="ASC";
       else Asc="DESC";
        System.out.println(id);
        System.out.println(sortField);
        System.out.println(Asc);
       return mail_dao.sort(sortField,Asc,id);

    }
    @Transactional
   public List<Message> Search(String type, String Like, String receiver){
        return mail_dao.Search(type,Like,receiver);
    }


}
