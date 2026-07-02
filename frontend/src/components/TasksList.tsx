import {getTasks} from "../api/task.ts";
import {useState, useEffect} from "react";
import type {Task} from "../types/Types.ts";


export default function TasksList(){

    const [tasks, setTasks] = useState<Task>([]);

    useEffect(() => {
        async function loadTasks(){
            const data = await getTasks();

            setTasks(data);
        }
    })

    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">All tasks</li>

            <Task />
        </ul>
    )
}