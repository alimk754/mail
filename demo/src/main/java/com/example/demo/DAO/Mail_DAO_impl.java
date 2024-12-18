package com.example.demo.DAO;

import com.example.demo.entity.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

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
            TypedQuery<Message> query = entityManager.createQuery(
                    "SELECT m FROM Message m WHERE m.reciever.email = :email ORDER BY m.createdAt DESC",
                    Message.class
            );
            query.setParameter("email", m.getEmail());
            mail.setIn(query.getResultList());
            TypedQuery<Message> queryin = entityManager.createQuery(
                    "SELECT m FROM Message m WHERE m.sender.email = :email ORDER BY m.createdAt DESC",
                    Message.class
            );
            queryin.setParameter("email", m.getEmail());
            mail.setOut(queryin.getResultList());
            return mail;
        }
        else throw new RuntimeException("Username Not found");
    }

    @Override
    public Mail uptade(Mail m) {
        Mail mail=entityManager.merge(m);
        return mail;
    }

    @Override
    public Message getbyid(int id) {
        return entityManager.find(Message.class,id);
    }
    @Override
    public Contact getContactById(long id) {
        return entityManager.find(Contact.class,id);
    }

    @Override
    public Message uptademess(Message m) {
        return entityManager.merge(m);
    }

    @Override
    public void handleDeleteMessage(int id) {

        entityManager.remove(entityManager.find(Message.class,id));
    }

    @Override
    public Mail sort(String sortField, String Asc,String id) {
        System.out.println(id);
        System.out.println(sortField);
        System.out.println(Asc);
        Mail mail=entityManager.find(Mail.class,id);
        if(mail!=null) {
            TypedQuery<Message> query = entityManager.createQuery(
                    "SELECT m FROM Message m WHERE m.reciever.email = :email ORDER BY m."+sortField+" "+Asc,
                    Message.class
            );
            query.setParameter("email", id);
            mail.setIn(query.getResultList());
            TypedQuery<Message> queryin = entityManager.createQuery(
                    "SELECT m FROM Message m WHERE m.sender.email = :email ORDER BY m."+sortField+" "+Asc,
                    Message.class
            );
            queryin.setParameter("email", id);

            mail.setOut(queryin.getResultList());
            TypedQuery<Message> queryDraft = entityManager.createQuery(
                    "SELECT m FROM Mail mail " +
                            "JOIN mail.drafts m " +
                            "WHERE mail.id = :email " +
                            "ORDER BY m."+sortField+" "+Asc,
                    Message.class
            );
            queryDraft.setParameter("email", id);
            mail.setDrafts(queryDraft.getResultList());
            TypedQuery<Message> queryTrash = entityManager.createQuery(
                    "SELECT c FROM Mail s JOIN s.trash c " +
                            "WHERE s.id = :id " +
                            "ORDER BY c."+sortField+" " +Asc,
                    Message.class
            );
            queryTrash.setParameter("id", id);
            mail.setTrash(queryTrash.getResultList());




            return mail;
        }
        else throw new RuntimeException();
    }

    @Override
    public List<Message> Search(String type, String like, String receiver) {
        TypedQuery<Message> query = entityManager.createQuery(
                        "SELECT m FROM Message m WHERE m.reciever.email = :email AND m." + type + " LIKE :likeParam",
                        Message.class
                )
                .setParameter("email", receiver)
                .setParameter("likeParam", "%" + like + "%");

        return query.getResultList();
    }

    @Override
    public void removeContact(long id) {
        entityManager.remove(entityManager.find(Contact.class,id));
    }

    @Override
    public void removeFolder(int id) {
        entityManager.remove(entityManager.find(UserFolder.class,id));
    }

}



