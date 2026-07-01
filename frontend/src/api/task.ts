import {api} from "./axios";
import type {Task} from "../pages/MainPage.tsx";


export async function createTask(task: Task){
    const response = await api.post("/tasks", task);

    return response.data;
}

