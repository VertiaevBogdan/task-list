package com.vert.backend.service;

import com.vert.backend.model.entity.Task;
import com.vert.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    
    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }
    
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }
    
    public Optional<Task> getTaskById(long id){
        return taskRepository.findById(id);
    }

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public void deleteTaskById(long id){
        taskRepository.deleteById(id);
    }

}
