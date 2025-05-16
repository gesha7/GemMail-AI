package com.email.writer;


import lombok.Data; // This will help to generate getters, setters and generators

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
