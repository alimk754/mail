package com.example.demo.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    @Column(name = "toemail")
    private String TO;

    @Column(name = "fromemail")
    private String FROM;
    @Column(name = "created_at", updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL")
    private LocalDate createdAt;
    public String getTO() {
        return TO;
    }

    public void setSender(Mail sender) {
        this.sender = sender;
    }

    public void setReciever(Mail reciever) {
        this.reciever = reciever;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public void setTO(String TO) {
        this.TO = TO;
    }

    public String getFROM() {
        return FROM;
    }

    public void setFROM(String FROM) {
        this.FROM = FROM;
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
            m.FROM = user1.getEmail();
            return this;
        }

        public massageBuilder reciever(Mail user) {
            m.reciever = user;
            m.TO=user.getEmail();
            return this;
        }

        public massageBuilder created_at() {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
            m.createdAt= LocalDateTime.now().toLocalDate();
            return this;
        }

        public Message build() {
            return m;
        }

    }

}

