package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.List;
@Entity
@Table(name="mail")
public class Mail {
    @Id
    @Column(name = "id")
    private String email;
    @Column(name = "pass")
    private String password;

    @ManyToMany(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(
            name = "mapping",
            joinColumns = @JoinColumn(name = "mail_id"),
            inverseJoinColumns = @JoinColumn(name="message_id")
    )
    private List<Message> messages;

    public List<Message> getMessages() {
        return messages;
    }
    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
    public Mail() {
    }

    public Mail(String email, String password, List<Message> messages) {
        this.email = email;
        this.password = password;
        this.messages = messages;
    }
    static class builder{
        private String email;
        private String password;
        private List<Message> messages;
        public builder messages(List<Message> m){
            messages=m;
            return this;
        }
        public builder password(String pass){
            password=pass;
            return this;
        }
        public builder email(String email1){
            email=email1;
            return this;
        }
        public Mail build(){
            return new Mail(email,password,messages);
        }
    }

}
