package com.example.demo.controller;

import com.example.demo.DTOS.Folder_DTO;
import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.entity.UserFolder;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api/folder")
public class Folder_controller {
    @Autowired
    Mail_service mailService;
    @PutMapping("/add")
    public void add(@RequestBody Folder_DTO folder){
        Mail m=mailService.log_in(new Mail.builder().email(folder.id).build());
        UserFolder u=new UserFolder(folder.name);
        Iterator<UserFolder> i=m.getUserFolders().iterator();
        while (i.hasNext()) {
            UserFolder temp = i.next();
            if (temp.getName().equals(folder.name)) {
                throw new RuntimeException("already exists");
            }
        }
        m.addFolder(u);
        mailService.uptade(m);
        return;
    }
    @DeleteMapping("/delete/{id}/{userName}")
    public void delete(@PathVariable String id,@PathVariable String userName){
        System.out.println(id+" "+userName);
        Mail m1=mailService.log_in(new Mail.builder().email(userName).build());
        System.out.println(id+" "+userName);
        Iterator<UserFolder> i=m1.getUserFolders().iterator();
        while (i.hasNext()) {
            UserFolder temp = i.next();
            if (temp.getName().equals(id)) {
               m1.removeFolder(temp);
               break;
            }
        }
        System.out.println(id+" "+userName);
        mailService.uptade(m1);
        System.out.println(id+" "+userName);
        return;
    }
}
