package com.example.demo.controller;

import com.example.demo.DTOS.DTO_mail;
import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.modelService.DeleteService;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("api")
public class DeleteController {
    DeleteService deleteService;


    @Autowired
    public DeleteController(DeleteService mailService) {
        this.deleteService = mailService;
    }

    @GetMapping("/retrieve/{id}/{receiver}/{checkUser}")
    public void retrieve(@PathVariable int id, @PathVariable boolean receiver, @PathVariable boolean checkUser) {
        deleteService.retrieve(id,receiver,checkUser);
    }

    @PutMapping("/deleteALL")
    public void deleteALl(@RequestBody DTO_mail m) {
        deleteService.deleteALl(m);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Mail> delete(@PathVariable int id) {
        return deleteService.delete(id);
    }
    @DeleteMapping("/delet/{id}")
    public void deleteApi(@PathVariable List<Integer> id) {
        deleteService.deleteApi(id);
    }
    @DeleteMapping("/delete1/{id}/{type}")
    void deleteSender(@PathVariable List<Integer> id,@PathVariable  boolean type){
        System.out.println("gggg");
         deleteService.semiDeleteOutMeseages(id,type);
    }
    @DeleteMapping("/delete2/{id}")
    void deleteInbox(@PathVariable List<Integer> id){
        System.out.print("gggggg");
        deleteService.semiDeleteInMessages(id);
    }


}
