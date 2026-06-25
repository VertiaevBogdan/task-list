package com.vert.backend.dto.request;

public class CreateTaskRequest {
    private String title;
    private String text;

    public String getTitle() {
        return title;
    }

    public String getText(){
        return text;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public void setText(String text){
        this.text = text;
    }
}
