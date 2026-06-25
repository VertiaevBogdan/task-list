package com.vert.backend.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "TASKS")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TASK_TITLE", length = 100)
    private String title;

    @Column(name = "TEXT", nullable = false)
    private String text;

    @Column(name = "STATUS", nullable = false)
    private boolean status = false;

    public Task() {}

    public Task(String taskTitle, String text, boolean status){
        this.title = taskTitle;
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

    public void setTitle(String title){
        this.title = title;
    }

    public void setText(String text){
        this.text = text;
    }

    public void setStatus(boolean status){
        this.status = status;
    }
}
