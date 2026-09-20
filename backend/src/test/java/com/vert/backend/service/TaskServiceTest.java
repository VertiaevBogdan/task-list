package com.vert.backend.service;

import com.vert.backend.dto.request.TaskRequest;
import com.vert.backend.model.entity.Task;
import com.vert.backend.dto.response.TaskResponse;
import com.vert.backend.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {
    final private Task task = new Task();
    final private Task firstTask = new Task();
    final private Task secondTask = new Task();

    final Long firstId = 1L;
    final Long secondId = 2L;
    final Long thirdId = 3L;
    final String title = "Test title";
    final String newTitle = "Edited title";
    final String text = "Test text";
    final String newText = "Edited text";


    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void shouldReturnTask() {
        task.setId(firstId);
        task.setTitle(title);
        task.setText(text);

        when(taskRepository.findById(firstId)).thenReturn(Optional.of(task));

        // Act
        TaskResponse result = taskService.getTaskById(firstId).orElseThrow();

        assertEquals(title, result.getTitle());
        assertEquals(text, result.getText());
    }

    @Test
    void shouldThrowExceptionWhenTaskNotFound() {
        when(taskRepository.findById(firstId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> taskService.getTaskById(firstId));

        assertEquals("Task not found", exception.getMessage());
    }

    @Test
    void shouldReturnAllTasks() {
        firstTask.setId(firstId);
        firstTask.setTitle(title);
        firstTask.setText(text);

        secondTask.setId(secondId);
        secondTask.setTitle(title);
        secondTask.setText(text);

        when(taskRepository.findAll(Sort.by(Sort.Direction.ASC, "id"))).thenReturn(List.of(firstTask, secondTask));


        List<TaskResponse> result;
        result = taskService.getAllTasks();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(title, result.get(0).getTitle());
        assertEquals(text, result.get(0).getText());

        assertEquals(title, result.get(1).getTitle());
        assertEquals(text, result.get(1).getText());
    }

    @Test
    void shouldReturnAnEmptyList() {

        when(taskRepository.findAll(Sort.by(Sort.Direction.ASC, "id"))).thenReturn(List.of());


        List<TaskResponse> result = taskService.getAllTasks();

        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(taskRepository).findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Test
    void shouldCreateTask() {
        TaskRequest request = new TaskRequest(title, text);

        task.setId(firstId);
        task.setTitle(title);
        task.setText(text);

        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskResponse result = taskService.createTask(request);

        assertEquals(firstId, result.getId());
        assertEquals(title, result.getTitle());
        assertEquals(text, result.getText());

        verify(taskRepository).save(any(Task.class));
    }

    @Test
    void shouldChangeStatusFromFalseToTrue() {
        task.setId(firstId);
        task.setStatus(false);

        when(taskRepository.findById(firstId)).thenReturn(Optional.of(task));

        when(taskRepository.save(task)).thenReturn(task);
        taskService.updateTaskById(firstId);

        assertTrue(task.isStatus());
    }

//    @Test
//    void shouldChangeStatusForAllSelectedTasks(){
//        firstTask.setId(firstId);
//        firstTask.setStatus(false);
//        secondTask.setId(secondId);
//        secondTask.setStatus(false);
//        List<Long> ids = List.of(firstTask.getId(), secondTask.getId());
//
//        when(taskRepository.findAllById(ids))
//                .thenReturn(Iterable([firstTask, secondTask]));
//
//        when(taskRepository.saveAll(ids)).thenReturn(firstTask, secondTask);
//        taskService.changeTasksStatus(ids);
//
//        assertTrue(firstTask.isStatus());
//        assertTrue(secondTask.isStatus());
//
//        verify(taskRepository.findAllById(ids));
//    }

    @Test
    void shouldChangeStatusFromTrueToFalse() {
        task.setId(firstId);
        task.setStatus(true);

        when(taskRepository.findById(firstId)).thenReturn(Optional.of(task));

        when(taskRepository.save(task)).thenReturn(task);
        taskService.updateTaskById(firstId);

        assertFalse(task.isStatus());
    }

    @Test
    void shouldThrowExceptionWhenUpdatingTaskNotFound() {

        when(taskRepository.findById(firstId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> taskService.getTaskById(firstId));

        assertEquals("Task not found", exception.getMessage());
    }

    @Test
    void shouldDeleteTask() {
        taskService.deleteTaskById(firstId);

        verify(taskRepository).deleteById(firstId);
    }

    @Test
    void shouldDeleteAllSelectedTasks() {
        List<Long> ids = List.of(firstId, secondId, thirdId);

        taskService.deleteTasks(ids);

        verify(taskRepository).deleteAllById(ids);
    }

    @Test
    void shouldThrowExceptionWhenEditingTaskNotFound() { // rewrite
        when(taskRepository.findById(firstId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> taskService.getTaskById(firstId));

        assertEquals("Task not found", exception.getMessage());
    }

    @Test
    void shouldEditTitleAndText() {
        task.setId(firstId);
        task.setTitle(title);
        task.setText(text);

        when(taskRepository.findById(firstId)).thenReturn(Optional.of(task));

        when(taskRepository.save(task)).thenReturn(task);

        TaskRequest request = new TaskRequest(newTitle, newText);

        taskService.editTaskById(firstId, request);

        assertEquals(newTitle, task.getTitle());
        assertEquals(newText, task.getText());

        verify(taskRepository).save(task);
    }

    @Test
    void shouldEditOnlyTitle() {
        task.setId(firstId);
        task.setTitle(title);
        task.setText(text);

        when(taskRepository.findById(firstId)).thenReturn(Optional.of(task));

        when(taskRepository.save(task)).thenReturn(task);

        TaskRequest request = new TaskRequest(newTitle, null);

        taskService.editTaskById(firstId, request);

        assertEquals(newTitle, task.getTitle());
        assertEquals(text, task.getText());
    }

    @Test
    void shouldEditOnlyText() {

        task.setId(firstId);
        task.setText(text);
        task.setTitle(title);

        when(taskRepository.findById(firstId)).thenReturn(Optional.of(task));

        when(taskRepository.save(task)).thenReturn(task);

        TaskRequest request = new TaskRequest(null, newText);

        taskService.editTaskById(firstId, request);

        assertEquals(newText, task.getText());
        assertEquals(title, task.getTitle());
    }

}
