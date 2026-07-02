import TaskForm from "../components/TaskForm.tsx";
import {createTask} from "../api/task.ts";
import type {Task} from "../types/Types.ts";

export default function MainPage(){
    async function handleSave(task: Task){
        try {
            await createTask(task);
        } catch (error){
            console.error(error);
        }
    }

    return <main>
        <TaskForm onSave={handleSave} />
    </main>
}