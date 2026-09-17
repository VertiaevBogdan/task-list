package com.vert.backend.model.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

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

    @CreationTimestamp
    @Column (name = "CREATED_AT", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "UPDATED_AT", nullable = true)
    private Instant updatedAt;

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

    public boolean isStatus(){
        return status;
    }

    public Instant getCreatedAt(){
        return createdAt;
    }

    public Instant getUpdatedAt(){
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setUpdatedAt(Instant timeStamp){
        this.updatedAt = timeStamp;
    }
}
