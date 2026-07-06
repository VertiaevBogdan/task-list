import TaskForm from "../components/TaskForm.tsx";
import {createTask, getTasks} from "../api/task.ts";
import type {CreateTask, Task} from "../types/Types.ts";
import TasksList from "../components/TasksList.tsx";
import {useState, useEffect} from "react";


export default function MainPage(){
    const [tasks, setTasks] = useState<Task[]>([]);

    const loadTasks = async () =>{
        try {
            const response = await getTasks();
            setTasks(response);
        } catch (error){
            console.error(error);
        }
    }

    useEffect(() => {
        loadTasks();
    }, [])

    async function handleSave(task: CreateTask){
        try {
            await createTask(task);
            await loadTasks();
        } catch (error){
            console.error(error);
        }
    }





    return <main>
        <TaskForm onSave={handleSave} />
        <TasksList tasks={tasks}/>
    </main>
}