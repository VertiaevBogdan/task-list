import TaskForm from "../components/TaskForm.tsx";
import {createTask} from "../api/task.ts";


export type Task = {
    title: string;
    text: string;
};

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