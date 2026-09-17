package com.vert.backend.dto.request;

public class TaskRequest {
    public final String title;
    public final String text;

    public TaskRequest(String title, String text){
        this.title = title;
        this.text = text;
    }

    public String getTitle() {
        return title;
    }

    public String getText(){
        return text;
    }
}
