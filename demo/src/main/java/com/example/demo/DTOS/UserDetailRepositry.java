package com.example.demo.DTOS;

import com.example.demo.entity.Mail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailRepositry extends JpaRepository<Mail,String> {
}
