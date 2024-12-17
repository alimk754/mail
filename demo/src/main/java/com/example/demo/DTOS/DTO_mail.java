package com.example.demo.DTOS;



import com.example.demo.DTOS.AttachmentDTO;
import com.example.demo.DTOS.ContactDTO;
import com.example.demo.entity.Message;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class DTO_mail {
    private String email;
    private String fromemail;
    private String subject;
    private int importance;
    private String toemail;
    private String password;
    List<Message> in=new ArrayList<>();
    List<Message> out=new ArrayList<>();
    List<Message> trash=new ArrayList<>();
    List<Message> drafts=new ArrayList<>();
    private String message;

    private LocalDateTime created_at;

    private List<AttachmentDTO> attachments = new ArrayList<>();
    private List<ContactDTO> contacts = new ArrayList<>();

    public List<Message> getDrafts() {
        return drafts;
    }

    public void setDrafts(List<Message> drafts) {
        this.drafts = drafts;
    }

    public List<ContactDTO> getContacts() {
        return contacts;
    }

    public void setContacts(List<ContactDTO> contacts) {
        this.contacts = contacts;
    }

    public List<AttachmentDTO> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<AttachmentDTO> attachments) {
        this.attachments = attachments;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public DTO_mail() {
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public int getImportance() {
        return importance;
    }

    public void setImportance(int importance) {
        this.importance = importance;
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

    public String  getMessage() {
        return message;
    }

    public void setMessage(String message) {
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

    public List<Message> getTrash() {
        return trash;
    }

    public void setTrash(List<Message> trash) {
        this.trash = trash;
    }
}
