package com.vert.backend.dto.request;

public class UpdateTaskRequest {
    private final boolean status;

    public UpdateTaskRequest(boolean status){
        this.status = status;
    }
}
