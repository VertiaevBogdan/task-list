package com.vert.backend.dto.response;

public class TaskResponse {
    private final Long id;
    private final String title;
    private final String text;
    private final boolean status;

    public TaskResponse (Long id, String title, String text, boolean status){
        this.id = id;
        this.title = title;
        this.text = text;
        this.status = status;
    }

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
}
