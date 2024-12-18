package com.example.demo.criteria;

import com.example.demo.entity.Message;
import com.example.demo.service.Mail_service;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class SubjectCriteria implements Criteria{
        String str;
        List<Message> list=new ArrayList<>();
        public SubjectCriteria( String str, List<Message> list) {
            this.str = str;
            this.list=list;
        }

        @Override
        public List<Message> meetCriteria() {
            List<Message> messageList=new ArrayList<>();
            Iterator<Message> i=list.iterator();
            while (i.hasNext()){
                Message tmp=i.next();
                if(tmp.getSubject().equals(str)){
                    messageList.add(tmp);
                }

            }
            return messageList;
        }
}
