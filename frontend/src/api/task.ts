import {api} from "./axios";
import type {Task} from "../types/Types.ts";

export async function createTask(task: Task){
    const response = await api.post("/tasks", task);

    return response.data;
}

export async function getTasks(): Promise <Task[]>{
        const response = await api.get("/tasks");

        return response.data;
}