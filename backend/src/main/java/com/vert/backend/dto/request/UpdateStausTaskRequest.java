package com.vert.backend.dto.request;

public class UpdateStausTaskRequest {
    private final boolean status;

    public UpdateStausTaskRequest(boolean status){
        this.status = status;
    }
}
