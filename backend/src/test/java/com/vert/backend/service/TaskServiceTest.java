package com.vert.backend.service;

import com.vert.backend.dto.request.TaskRequest;
import com.vert.backend.model.entity.Task;
import com.vert.backend.dto.response.TaskResponse;
import com.vert.backend.repository.TaskRepository;
import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void shouldReturnTask() {
        Task task = new Task();
        task.setId(1L);
        task.setTitle("Test title");
        task.setText("Test text");

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        // Act
        TaskResponse result = taskService.getTaskById(1L).orElseThrow();

        assertEquals("Test title", result.getTitle());
        assertEquals("Test text", result.getText());
    }

    @Test
    void shouldThrowExceptionWhenTaskNotFound() {
        when(taskRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> taskService.getTaskById(1L));

        assertEquals("Task not found", exception.getMessage());
    }

    @Test
    void shouldReturnAllTasks() {
        Task firstTask = new Task();
        Task secondTask = new Task();

        firstTask.setId(1L);
        firstTask.setTitle("Test title");
        firstTask.setText("Test text");

        secondTask.setId(2L);
        secondTask.setTitle("Test title");
        secondTask.setText("Test text");

        when(taskRepository.findAll(Sort
                .by(Sort.Direction.ASC, "id")))
                .thenReturn(List.of(firstTask, secondTask));


        List<TaskResponse> result;
        result = taskService.getAllTasks();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Test title", result.get(0).getTitle());
        assertEquals("Test text", result.get(0).getText());

        assertEquals("Test title", result.get(1).getTitle());
        assertEquals("Test text", result.get(1).getText());
    }

    @Test
    void shouldReturnAnEmptyList(){

        when(taskRepository.findAll(Sort
                .by(Sort.Direction.ASC, "id")))
                .thenReturn(List.of());


        List<TaskResponse> result = taskService.getAllTasks();

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(taskRepository).findAll(
                Sort.by(Sort.Direction.ASC, "id")
        );
    }

    @Test
    void shouldCreateTask(){
        String title = "new title";
        String text = "new text";

        TaskRequest request = new TaskRequest(title, text);

        Task savedTask = new Task();
        savedTask.setId(1L);
        savedTask.setTitle(title);
        savedTask.setText(text);

        when(taskRepository.save(any(Task.class)))
                .thenReturn(savedTask);

        TaskResponse result = taskService.createTask(request);

        assertEquals(1L, result.getId());
        assertEquals(title, result.getTitle());
        assertEquals(text, result.getText());

        verify(taskRepository).save(any(Task.class));
    }

    @Test
    void shouldChangeStatusFromFalseToTrue(){
        Task task = new Task();
        task.setId(1L);
        task.setStatus(false);

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        when(taskRepository.save(task)).thenReturn(task);
        taskService.updateTaskById(1L);

        assertTrue(task.isStatus());
    }

    @Test
    void shouldChangeStatusFromTrueToFalse() {
        Task task = new Task();
        task.setId(1L);
        task.setStatus(true);

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        when(taskRepository.save(task)).thenReturn(task);
        taskService.updateTaskById(1L);

        assertFalse(task.isStatus());
    }

    @Test
    void shouldThrowExceptionWhenUpdatingTaskNotFound(){

        when(taskRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> taskService.getTaskById(1L));

        assertEquals("Task not found", exception.getMessage());
    }

    @Test
    void shouldDeleteTask(){
        taskService.deleteTaskById(1L);

        verify(taskRepository).deleteById(1L);
    }

    @Test
    void shouldDeleteAllSelectedTasks(){
        List<Long> ids = List.of(1L, 2L, 3L);

        taskService.deleteTasks(ids);

        verify(taskRepository).deleteAllById(ids);
    }

    @Test
    void shouldThrowExceptionWhenEditingTaskNotFound() { // rewrite
        when(taskRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> taskService.getTaskById(1L));

        assertEquals("Task not found", exception.getMessage());
    }

    @Test
    void shouldEditTitleAndText() {
        Task task = new Task();
        task.setId(1L);
        task.setTitle("Title");
        task.setText("Text");

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        when(taskRepository.save(task)).thenReturn(task);

        String newTitle = "Edited title";
        String newText = "Edited text";
        TaskRequest request = new TaskRequest(newTitle, newText);

        taskService.editTaskById(1L, request);

        assertEquals(newTitle, task.getTitle());
        assertEquals(newText, task.getText());

        verify(taskRepository).save(task);
    }

    @Test
    void shouldEditOnlyTitle() {
        String text = "text";

        Task task = new Task();

        task.setId(1L);
        task.setTitle("Title");
        task.setText(text);

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        when(taskRepository.save(task))
                .thenReturn(task);

        String newTitle = "Edited title";
        TaskRequest request = new TaskRequest(newTitle, null);

        taskService.editTaskById(1L, request);

        assertEquals(newTitle, task.getTitle());
        assertEquals(text, task.getText());
    }

    @Test
    void shouldEditOnlyText(){
        String title = "title";

        Task task = new Task();
        task.setId(1L);
        task.setText("Text");
        task.setTitle(title);

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        when(taskRepository.save(task))
                .thenReturn(task);

        String newText = "Edited text";
        TaskRequest request = new TaskRequest(null, newText);

        taskService.editTaskById(1L, request);

        assertEquals(newText, task.getText());
        assertEquals(title, task.getTitle());
    }
}
