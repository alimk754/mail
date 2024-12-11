package com.example.demo.entity;

public class Returned {
    String message;
    long time;
    int status;
    public Returned() {
    }
    public Returned(String message, long time, int status) {
        this.message = message;
        this.time = time;
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
