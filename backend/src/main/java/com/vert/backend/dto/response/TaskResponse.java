package com.vert.backend.dto.response;

import java.time.Instant;

public class TaskResponse {
    private final Long id;
    private final String title;
    private final String text;
    private final boolean status;
    private final Instant createdAt;

    public TaskResponse (Long id, String title, String text, boolean status, Instant createdAt){
        this.id = id;
        this.title = title;
        this.text = text;
        this.status = status;
        this.createdAt = createdAt;
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

    public Instant getCreatedAt(){
        return createdAt;
    }
}
