package com.vert.backend.service;

import com.vert.backend.dto.request.CreateTaskRequest;
import com.vert.backend.dto.response.TaskResponse;
import com.vert.backend.mapper.TaskMapper;
import com.vert.backend.model.entity.Task;
import com.vert.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;


@Service
public class TaskService {

    private final TaskRepository taskRepository;
    
    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }
    
    public List<TaskResponse> getAllTasks(){
        return taskRepository.findAll().stream().map(TaskMapper::toResponse).toList();
    }
    
    public Optional<TaskResponse> getTaskById(Long id){

        Task task = taskRepository.findTaskById(id);

        return Optional.of(TaskMapper.toResponse(task));
    }

    public TaskResponse createTask(CreateTaskRequest request){
        Task task = TaskMapper.toEntity(request);

        Task saved = taskRepository.save(task);

        return TaskMapper.toResponse(saved);
    }

    public void deleteTaskById(Long id){
        taskRepository.deleteById(id);
    }

}
