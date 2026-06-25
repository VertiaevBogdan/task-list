package com.vert.backend.controller;

import com.vert.backend.dto.request.CreateTaskRequest;
import com.vert.backend.dto.response.TaskResponse;
import com.vert.backend.model.entity.Task;
import com.vert.backend.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService){
        this.taskService  = taskService;
    }

    @GetMapping
    public List<TaskResponse> getAllTasks(){
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Optional<TaskResponse> getTaskById(Long id){
        return taskService.getTaskById(id);
    }

    @PostMapping
    public TaskResponse createTask(@RequestBody CreateTaskRequest request){
        return taskService.createTask(request);
    }

    @DeleteMapping("/{id}")
    public void deleteTaskById(@PathVariable Long id) {
        taskService.deleteTaskById(id);
    }

}
