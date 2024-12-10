package com.example.demo.entity;

import jakarta.persistence.*;
import org.hibernate.engine.internal.Cascade;

import javax.lang.model.element.Name;
import java.util.List;

@Entity
@Table(name = "message")

public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "message")
    private String message;
    @ManyToMany(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(
            name = "mapping",
            joinColumns = @JoinColumn(name = "messages_id"),
            inverseJoinColumns = @JoinColumn(name="mail_id")
    )
    List<Mail> mails;

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

}
