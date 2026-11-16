package com.vert.backend.mapper;

import com.vert.backend.model.entity.Task;
import com.vert.backend.dto.request.TaskRequest;
import com.vert.backend.dto.response.TaskResponse;

public class TaskMapper {
    private TaskMapper(){}

    public static TaskResponse toResponse(Task task){
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getText(),
                task.isStatus(),
                task.getCreatedAt()
        );
    }

    public static Task toEntity(TaskRequest request){
        return new Task(
                request.getTitle(),
                request.getText(),
                false
        );
    }
}
