package com.example.demo.controller;

import com.example.demo.DTOS.Folder_DTO;
import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.entity.UserFolder;
import com.example.demo.modelService.FolderService;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api/folder")
public class Folder_controller {

    FolderService service;
    @Autowired
    public Folder_controller(FolderService mailService) {
        this.service = mailService;
    }

    @PutMapping("/add")
    public void add(@RequestBody Folder_DTO folder){
       service.add(folder);
    }
    @PutMapping("/{userName}/{id}/{Category}")
    public void addLists(@PathVariable String userName,@PathVariable String Category,@PathVariable List<Integer> id){
       service.addLists(userName,Category,id);
    }
    @DeleteMapping("/delete/{id}/{userName}")
    public void delete(@PathVariable String id,@PathVariable String userName){
       service.delete(id,userName);
    }
    @PutMapping("/rename")
    public void rename(@RequestBody Folder_DTO folder){
       service.rename(folder);
    }
    @DeleteMapping("/{id}/{title}/{message_id}")
    public void delete(@PathVariable int message_id,@PathVariable String title,@PathVariable String id){
       service.delete(message_id,title,id);
    }
    @DeleteMapping("/folders/{id}/{title}/{message_id}")
    public void deletes(@PathVariable List<Integer> message_id,@PathVariable String id,@PathVariable String title){
       service.deletes(message_id,id,title);
    }

}
