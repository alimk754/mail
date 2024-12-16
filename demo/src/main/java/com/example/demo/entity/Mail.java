package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.*;

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
    List<Message> in;
    @OneToMany(mappedBy = "sender",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    List<Message> out;
    @ManyToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    @JoinTable(name = "trash",
            joinColumns = @JoinColumn(name="mail_id"),
            inverseJoinColumns = @JoinColumn(name = "message_id")
    )
    List<Message> trash;

    @OneToMany(mappedBy = "mail",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<Contact> contacts = new ArrayList<>();

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<UserFolder> userFolders=new ArrayList<>();

    public List<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }
    public void addFolder(Contact contact) {
        contacts.add(contact);
        contact.setMail(this);
    }

    public void removeFolder(Contact contact) {
        contacts.remove(contact);
        contact.setMail(null);
    }
    public void addContact(Contact contact) {
        contacts.add(contact);
        contact.setMail(this);
    }

    public void removeContact(Contact contact) {
        contacts.remove(contact);
        contact.setMail(null);
    }

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
        trash=new ArrayList<>();
    }

    public Mail(String email, String password, List<Message> in, List<Message> out) {
        this.email = email;
        this.password = password;
        this.in = in;
        this.out = out;
    }

    @Override
    public void notify_deleteallsender(int id, Message m) {
        this.deleteout(id);
        this.deletein(id);
        this.addtrash(m);
    }

    @Override
    public void notify_deleteformesender(int id, Message m) {
        this.deleteout(id);
        this.addtrash(m);
    }

    @Override
    public void notify_deleteformereciver(int id, Message m) {
        this.deletein(id);
        this.addtrash(m);
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
