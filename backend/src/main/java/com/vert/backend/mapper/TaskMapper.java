package com.vert.backend.mapper;

import com.vert.backend.model.entity.Task;
import org.springframework.stereotype.Service;
import com.vert.backend.dto.request.TaskRequest;
import com.vert.backend.dto.response.TaskResponse;

@Service
public class TaskMapper {
    public static TaskResponse toResponse(Task task){
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getText(),
                task.isStatus()
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
