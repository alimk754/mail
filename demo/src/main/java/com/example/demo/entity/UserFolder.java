package com.example.demo.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "folder")
public class UserFolder {
    @Column(name = "id")
    private int id;
    @Column(name = "folder_name")
    private String name;
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "message_id")
    List<Message> messages;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    void add(Message m1){
        messages.add(m1);
    }
    void remove(Message m1){
        messages.remove(m1);
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public UserFolder() {
        messages=new ArrayList<>();
    }
}
