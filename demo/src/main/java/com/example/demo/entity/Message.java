package com.example.demo.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "message")
public class Message {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "ID")
        private int id;
        @Column(name="message")
        private String message;

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

        public Message() {}

        public Message(String message) {
            this.message = message;
        }
        public Message clone(){
            String message=this.getMessage();
            return new Message(message);
        }

}
