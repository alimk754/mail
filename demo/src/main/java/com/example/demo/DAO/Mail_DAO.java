package com.example.demo.DAO;

import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;

import java.util.List;

public interface Mail_DAO {
    Mail sign_up(Mail m);
    Mail log_in(Mail m);
    Mail uptade(Mail m);
    Message getbyid(int id);


}
