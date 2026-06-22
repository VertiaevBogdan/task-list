package com.vert.backend.repository;

import com.vert.backend.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Task findTaskByTitle(String title);

}
