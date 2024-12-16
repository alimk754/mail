package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "message")
public class Message implements Subscriber{
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
    @ManyToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    @JoinTable(name = "trash",
            joinColumns = @JoinColumn(name="message_id"),
            inverseJoinColumns = @JoinColumn(name = "mail_id")
    )
    List<Message> mails;
    @Column(name = "fromemail")
    private String FROM;
    @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL")
    @JsonFormat(pattern = "yyyy/MM/dd/HH:mm:ss")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Attachment> attachments = new ArrayList<>();

    public boolean arenull(){
        return this.sender==null&&this.reciever==null&&mails.isEmpty();
    }
    public boolean issendernull(){
        return this.sender==null;
    }
    public boolean isrecievernull(){
        return this.reciever==null;
    }
    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    public void addAttachment(Attachment attachment) {
        attachments.add(attachment);
        attachment.setMessage(this);
    }

    public void removeAttachment(Attachment attachment) {
        attachments.remove(attachment);
        attachment.setMessage(null);
    }
    public void removeTrash(Mail mail) {
        mails.remove(mail);
        mail.deletetrash(this.id);
    }
    public void addTrash(Mail mail) {
        mails.remove(mail);
        mail.addtrash(this);
    }


    public String getTO() {
        return TO;
    }

    public void setSender(Mail sender) {
        this.sender = sender;
    }

    public void setReciever(Mail reciever) {
        this.reciever = reciever;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
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

    @Override
    public void notify_deleteallsender(int id, Message m) {
        this.setSender(null);
        this.setReciever(null);
    }

    @Override
    public void notify_deleteformesender(int id, Message m) {
        this.setSender(null);
    }

    @Override
    public void notify_deleteformereciver(int id, Message m) {
        this.setReciever(null);
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
            m.createdAt= LocalDateTime.now();
            return this;
        }
        public massageBuilder attachments(List<Attachment> attachments) {
            m.attachments = attachments;
            attachments.forEach(attachment -> attachment.setMessage(m));
            return this;
        }

        public Message build() {
            return m;
        }

    }

}

