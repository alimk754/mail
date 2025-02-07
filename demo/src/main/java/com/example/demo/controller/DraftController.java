package com.example.demo.controller;

import com.example.demo.DTOS.AttachmentDTO;
import com.example.demo.DTOS.DTO_mail;
import com.example.demo.entity.Attachment;
import com.example.demo.entity.Mail;
import com.example.demo.entity.Message;
import com.example.demo.modelService.DraftService;
import com.example.demo.service.Mail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@RestController
@RequestMapping("api")
public class DraftController {
    DraftService draftService;
  @Autowired
    public DraftController(DraftService draftService) {
        this.draftService = draftService;
    }

    @GetMapping("/check/{userName}")
    public void checkUserExists(@PathVariable String[] userName){
       draftService.checkUserExists(userName);
    }
    @DeleteMapping("/deleteDrafts/{id}")
    public void deleteDrafts(@PathVariable List<Integer> id) {
        draftService.deleteDrafts(id);
    }
    @PostMapping("/addDraft")
    public Mail addDraft(@RequestBody DTO_mail obj) {
       return draftService.addDraft(obj);
    }

}
