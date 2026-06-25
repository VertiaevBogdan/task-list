package com.vert.backend.dto.response;

public class TaskResponse {
    private Long id;
    private String title;
    private String text;
    private boolean status;


    public Long getId(){
        return id;
    }

    public String getTitle(){
        return title;
    }

    public String getText(){
        return text;
    }

    public boolean getStatus(){
        return status;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setId(Long id){
        this.id = id;
    }

    public void isStatus(boolean status){
        this.status = status;
    }
}
