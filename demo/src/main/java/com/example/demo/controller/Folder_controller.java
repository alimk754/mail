package com.example.demo.controller;

import com.example.demo.DTOS.Folder_DTO;
import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.entity.UserFolder;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api/folder")
public class Folder_controller {
    @Autowired
    Mail_service mailService;
    @PutMapping("/add")
    public void add(@RequestBody Folder_DTO folder){
        Mail m=mailService.log_in(new Mail.builder().email(folder.email).build());
        UserFolder u=new UserFolder(folder.name);
        m.addFolder(u);
        mailService.uptade(m);
        return;
    }
    @PutMapping("/{userName}/{id}/{Category}")
    public void addLists(@PathVariable String userName,@PathVariable String Category,@PathVariable List<Integer> id){
        Iterator<Integer> i= id.iterator();
        Mail m=mailService.log_in(new Mail.builder().email(userName).build());
        List<UserFolder> userFolders=m.getUserFolders();
        List<Message> messageList=new ArrayList<>();
        while (i.hasNext()){
            int tmp=i.next();
            messageList.add(mailService.getbyid(tmp));
        }
        Iterator<UserFolder> iterator=userFolders.iterator();
        boolean flag=true;
        while (iterator.hasNext()){
            UserFolder tmp=iterator.next();
            if(tmp.getName().equals(Category)){
                tmp.addList(messageList);
                flag=false;
            }
        }
        if(flag) throw new RuntimeException("Category doesn't exist");
        mailService.uptade(m);
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
               mailService.removeFolder(temp.getId());
               break;
            }
        }
        System.out.println(id+" "+userName);
        mailService.uptade(m1);
        System.out.println(id+" "+userName);
        return;
    }
    @PutMapping("/rename")
    public void rename(@RequestBody Folder_DTO folder){
        Mail m1=mailService.log_in(new Mail.builder().email(folder.email).build());
        if(folder.name.isEmpty()){throw new RuntimeException("cannot create an empty field");}
        Iterator<UserFolder> i=m1.getUserFolders().iterator();
        while (i.hasNext()) {
            UserFolder temp = i.next();
            if (temp.getName().equals(folder.name)) {
                throw new RuntimeException("this folder already exists");
            }
        }
        i=m1.getUserFolders().iterator();
        while (i.hasNext()) {
            UserFolder temp = i.next();
            if (temp.getName().equals(folder.oldName)) {
                temp.setName(folder.name);
            }
        }
        mailService.uptade(m1);

        return;
    }
    @DeleteMapping("/{id}/{title}/{message_id}")
    public void delete(@PathVariable int message_id,@PathVariable String title,@PathVariable String id){
        System.out.println(id+" "+message_id+" "+title);
        Mail mail=mailService.log_in(new Mail.builder().email(id).build());
        Message m=mailService.getbyid(message_id);
        List<UserFolder> list=mail.getUserFolders();
        Iterator<UserFolder> iterator=list.iterator();
        while (iterator.hasNext()){
            UserFolder tmp=iterator.next();
            if(tmp.getName().equals(title)){
                tmp.getMessages().remove(m);
                System.out.println(tmp);
                break;
            }
        }
        mail.setUserFolders(list);
        mailService.uptade(mail);
    }
    @DeleteMapping("/folders/{id}/{title}/{message_id}")
    public void deletes(@PathVariable List<Integer> message_id,@PathVariable String id,@PathVariable String title){
        Iterator<Integer> i=message_id.iterator();
        while (i.hasNext()){
            int tmp = i.next();
            delete(tmp,title,id);
        }
    }

}
