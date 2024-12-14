package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="mail")
public class Mail implements Subscriber{
    @Id
    @Column(name = "id")
    private String email;
    @Column(name = "pass")
    private String password;
    @OneToMany(mappedBy = "reciever",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    Set<Message> in;
    @OneToMany(mappedBy = "sender",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    Set<Message> out;
    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    @JoinColumn(name = "trash")
    Set<Message> trash;

    public Set<Message> getIn() {
        return in;
    }
    public void setIn(HashSet<Message> in) {
        this.in = in;
    }
    public void addin(Message m){
        in.add(m);
    }
    public void addout(Message m){
        out.add(m);
    }
    public void addtrash(Message m) {trash.add(m);}
    public void deletein(int id){
        Iterator<Message> iterator = in.iterator();
        while (iterator.hasNext()) {
            Message m = iterator.next();
            if (m.getId()==id) {
                iterator.remove();
            }
        }
    }

    public Set<Message> getTrash() {
        return trash;
    }

    public void setTrash(HashSet<Message> trash) {
        this.trash = trash;
    }

    public void deleteout(int id){
        Iterator<Message> iterator = out.iterator();
        while (iterator.hasNext()) {
            Message m = iterator.next();
            if (m.getId()==id) {
                iterator.remove();
            }
        }
    }
    public void deletetrash(int id){
        Iterator<Message> iterator = trash.iterator();
        while (iterator.hasNext()) {
            Message m = iterator.next();
            if (m.getId()==id) {
                iterator.remove();
            }
        }
    }
    public Set<Message> getOut() {
        return out;
    }
    public void setOut(HashSet<Message> out) {
        this.out = out;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public Mail() {
        in=new HashSet<>();
        out=new HashSet<>();
        trash=new HashSet<>();
    }

    public Mail(String email, String password, HashSet<Message> in, HashSet<Message> out) {
        this.email = email;
        this.password = password;
        this.in = in;
        this.out = out;
    }

    @Override
    public void notify_delete(int id,Message message) {
        deleteout(id);
        deleteout(id);
        addtrash(message);
    }

    public static class builder{
        private String email;
        private String password;
        private HashSet <Message> in;
        private HashSet <Message> out;

        public builder password(String pass){
            password=pass;
            return this;
        }
        public builder email(String email1){
            email=email1;
            return this;
        }
        public builder in(HashSet<Message> in){
            in=in;
            return this;
        }
        public builder out(HashSet<Message> out){
            out=out;
            return this;
        }

        public Mail build(){
            return new Mail(email,password,out,in);
        }
    }

}
