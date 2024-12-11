package com.example.demo;

import com.example.demo.entity.Message;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

public class DTO_mail {
    private String email;
    private String fromemail;

    private String toemail;
    private String password;
    List<Message> in=new ArrayList<>();
    List<Message> out=new ArrayList<>();
    private Message message;

    public DTO_mail() {
    }

    public String getFromemail() {
        return fromemail;
    }

    public void setFromemail(String fromemail) {
        this.fromemail = fromemail;
    }

    public String getToemail() {
        return toemail;
    }

    public void setToemail(String toemail) {
        this.toemail = toemail;
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

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public List<Message> getIn() {
        return in;
    }

    public void setIn(List<Message> in) {
        this.in = in;
    }

    public List<Message> getOut() {
        return out;
    }

    public void setOut(List<Message> out) {
        this.out = out;
    }
}
