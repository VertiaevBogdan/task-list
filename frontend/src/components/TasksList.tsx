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
        <section>
            <span className="w-full p-4 pb-2 text-l opacity-60 tracking-wide">All tasks</span>
            <ul className="bg-base-200 rounded-box shadow-md grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))] gap-4 p-4">
                {tasks.map(task => (
                    <TaskCard task={task}/>
                ))}
            </ul>
        </section>
    )
}