import TaskForm from "../components/TaskForm.tsx";
import {createTask} from "../api/task.ts";
import type {CreateTask} from "../types/Types.ts";
import TasksList from "../components/TasksList.tsx";


export default function MainPage(){
    async function handleSave(task: CreateTask){
        try {
            await createTask(task);
        } catch (error){
            console.error(error);
        }
    }

    return <main>
        <TaskForm onSave={handleSave} />
        <TasksList />
    </main>
}