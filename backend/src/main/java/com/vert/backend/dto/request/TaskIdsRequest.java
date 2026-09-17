package com.vert.backend.dto.request;

import java.util.List;

public class TaskIdsRequest {
    private List<Long> taskIds;
    public TaskIdsRequest(List<Long> taskIds) {
        this.taskIds = taskIds;
    }

    public List<Long> getTaskIds() {
        return taskIds;
    }
}

