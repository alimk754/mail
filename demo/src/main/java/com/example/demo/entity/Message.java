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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_email")
    private Mail sender;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_email")
    private Mail reciever;

    public Message(String message, Mail sender, Mail reciever) {
        this.message = message;
        this.sender = sender;
        this.reciever = reciever;
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

    public static class builder {
        private String message;
        private Mail sender;
        private Mail reciever;

        public builder message(String pass) {
            message = pass;
            return this;
        }

        public builder sender(Mail user1) {
            sender = user1;
            return this;
        }

        public builder reciever(Mail user) {
            reciever = user;
            return this;
        }


        public Message build() {
            return new Message(message, sender, reciever);
        }

    }
}
