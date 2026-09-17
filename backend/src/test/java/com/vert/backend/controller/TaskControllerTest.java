package com.vert.backend.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.vert.backend.service.TaskService;
import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(TaskController.class)
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TaskService taskService;

    @Test
    void shouldDeleteSelectedTasks() throws Exception {

        List<Long> taskIds = List.of(1L, 2L, 3L);

        mockMvc.perform(
                delete("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper
                                .writeValueAsString(Map
                                        .of("taskIds", taskIds)))
        ).andExpect(status().isNoContent());

        verify(taskService).deleteTasks(taskIds);
    }
}
