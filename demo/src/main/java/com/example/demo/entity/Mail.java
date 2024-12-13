package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
@Entity
@Table(name="mail")
public class Mail {
    @Id
    @Column(name = "id")
    private String email;
    @Column(name = "pass")
    private String password;
    @OneToMany(mappedBy = "reciever",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    List<Message> in=new ArrayList<>();
    @OneToMany(mappedBy = "sender",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    List<Message> out=new ArrayList<>();
    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    @JoinColumn(name = "trash")
    List<Message> trash=new ArrayList<>();

    public List<Message> getIn() {
        return in;
    }
    public void setIn(List<Message> in) {
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

    public List<Message> getTrash() {
        return trash;
    }

    public void setTrash(List<Message> trash) {
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
    public List<Message> getOut() {
        return out;
    }
    public void setOut(List<Message> out) {
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
        in=new ArrayList<>();
        out=new ArrayList<>();
    }

    public Mail(String email, String password, List<Message> in, List<Message> out) {
        this.email = email;
        this.password = password;
        this.in = in;
        this.out = out;
    }

    public static class builder{
        private String email;
        private String password;
        private List <Message> in;
        private List <Message> out;

        public builder password(String pass){
            password=pass;
            return this;
        }
        public builder email(String email1){
            email=email1;
            return this;
        }
        public builder in(List<Message> in){
            in=in;
            return this;
        }
        public builder out(List<Message> out){
            out=out;
            return this;
        }

        public Mail build(){
            return new Mail(email,password,out,in);
        }
    }

}
