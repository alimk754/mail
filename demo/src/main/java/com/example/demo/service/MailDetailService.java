package com.example.demo.service;

import com.example.demo.DTOS.UserDetailRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


public class MailDetailService implements UserDetailsService {
    @Autowired UserDetailRepositry userDetailRepositry;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("hellooooooooooo");
        System.out.println();
        UserDetails userDetails = userDetailRepositry.findById(username).get();
        System.out.println(userDetails.getUsername());
        System.out.println(userDetails.getPassword());
        return userDetails;
    }
}
