package com.example.demo.entity;

public interface Subscriber {
    public void notify_deleteallsender(int id,Message m);
    public void notify_deleteformesender(int id,Message m);
    public void notify_deleteformereciver(int id,Message m);

}
