package com.vert.backend.dto.request;

public class CreateTaskRequest {
    private final String title;
    private final String text;

    public CreateTaskRequest(String title, String text){
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
