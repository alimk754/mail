package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name="mail")
public class Mail {
    @Id
    @Column(name = "id")
    private String email;
    @Column(name = "pass")
    private String password;
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name="email_idin")
    List<Message> in=new ArrayList<>();
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name="email_idout")
    List<Message> out=new ArrayList<>();

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
