import {api} from "./axios";
import type {CreateTask, Task} from "../types/Types.ts";

export async function createTask(task: CreateTask){
    const response = await api.post("/tasks", task);

    return response.data;
}

export async function deleteTask(id: number){
    await api.delete(`/tasks/${id}`);
}

export async function getTasks(): Promise <Task[]>{
        const response = await api.get("/tasks");

        return response.data;
}

export async function switchTaskStatus(id: number){
        const response = await api.patch(`/tasks/${id}/status`);

        return response.data;
}

export async function editTask(
    id: number,
    data: CreateTask
) {
    const response = await api.patch(`/tasks/${id}`, {
        title: data.title,
        text: data.text
    });

    return response.data;
}