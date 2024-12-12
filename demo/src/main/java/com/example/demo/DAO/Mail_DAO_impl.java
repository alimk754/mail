package com.example.demo.DAO;

import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.entity.Returned;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Repository
public class Mail_DAO_impl implements Mail_DAO{
    EntityManager entityManager;
    @Autowired
    Mail_DAO_impl(EntityManager entityManager){
        this.entityManager=entityManager;
    }

    @Override
    public Mail sign_up(Mail m) {
            Mail mail=entityManager.find(Mail.class,m.getEmail());
            if(mail==null) {
                Mail DB_M = entityManager.merge(m);
                return DB_M;
            }
            else throw new RuntimeException("Email already registered");
    }

    @Override
    public Mail log_in(Mail m) {
        Mail mail=entityManager.find(Mail.class,m.getEmail());
        if(mail!=null) {
            return mail;
        }
        else throw new RuntimeException("Username Not found");
    }

    @Override
    public Mail uptade(Mail m) {
        Mail mail=entityManager.merge(m);
        return mail;
    }


    @ExceptionHandler
    ResponseEntity<Returned> handle(RuntimeException e){
        Returned r=new Returned();
        r.setMessage(e.getMessage());
        r.setStatus(HttpStatus.CONFLICT.value());
        r.setTime(System.currentTimeMillis());
        return new ResponseEntity<>(r,HttpStatus.NOT_FOUND);
    }
}