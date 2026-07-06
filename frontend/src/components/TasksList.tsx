import {getTasks} from "../api/task.ts";
import {useState, useEffect} from "react";
import TaskCard from "./TaskCard.tsx"
import type {Task} from "../types/Types.ts";



export default function TasksList(){

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getTasks()
            .then(response => {
                setTasks(response)
            })
            .catch(error => {
                console.error(error);
            })
    }, [tasks])

    return (
        <ul className="list bg-base-200 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">All tasks</li>
            {tasks.map(task => (
                <TaskCard task={task}/>
            ))}
        </ul>
    )
}