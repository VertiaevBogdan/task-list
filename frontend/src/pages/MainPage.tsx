import TaskForm from "../components/TaskForm.tsx";
import {useState} from "react";

export type Task = {
    title: string;
    text: string;
};

export default function MainPage(){

    const [, setTask] = useState<Task | null>(null);

    return <main>
        <TaskForm onSave={setTask} />
    </main>
}