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
    List<message> in=new ArrayList<>();
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name="email_idout")
    List<message> out=new ArrayList<>();

    public List<message> getIn() {
        return in;
    }

    public void setIn(List<message> in) {
        this.in = in;
    }
    public void addin(message m){

        in.add(m);
    }
    public void addout(message m){

        out.add(m);

    }

    public List<message> getOut() {
        return out;
    }

    public void setOut(List<message> out) {
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

    public Mail(String email, String password) {
        this.email = email;
        this.password = password;
    }
    static class builder{
        private String email;
        private String password;

        public builder password(String pass){
            password=pass;
            return this;
        }
        public builder email(String email1){
            email=email1;
            return this;
        }
        public Mail build(){
            return new Mail(email,password);
        }
    }

}
