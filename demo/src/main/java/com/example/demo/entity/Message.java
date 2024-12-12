package com.example.demo.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;
    @Column(name = "message")
    private String message;
    @Column(name = "subject")
    private String subject;
    @Column(name="importance")
    private int importance;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_email")
    private Mail sender;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_email")
    private Mail reciever;
    @Column(name = "name of")
    private String recieved;

    public String getRecieved() {
        return recieved;
    }

    public int getImportance() {
        return importance;
    }

    public void setImportance(int importance) {
        this.importance = importance;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Message() {
    }

    public Message(String message) {
        this.message = message;
    }

    public Message clone() {
        String message = this.getMessage();
        return new Message(message);
    }

    public static class massageBuilder {
        private Message m;

        public massageBuilder() {
            m = new Message();
        }

        public massageBuilder message(String message) {
            m.message = message;
            return this;
        }
        public massageBuilder subject(String message) {
            m.subject = message;
            return this;
        }
        public massageBuilder importance(int imp) {
            m.importance = imp;
            return this;
        }

        public massageBuilder sender(Mail user1) {
            m.sender = user1;
            return this;
        }

        public massageBuilder reciever(Mail user) {
            m.reciever = user;
            m.recieved=user.getEmail();
            return this;
        }


        public Message build() {
            return m;
        }

    }

}

