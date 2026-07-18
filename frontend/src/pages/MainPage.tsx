import TaskForm from "../components/TaskForm.tsx";
import EditForm from "../components/EditForm.tsx";
import {createTask, getTasks, deleteTask, switchTaskStatus, editTask} from "../api/task.ts";
import type {CreateTask, Task} from "../types/Types.ts";
import TasksList from "../components/TasksList.tsx";
import {useState, useEffect} from "react";


export default function MainPage(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null); // evidue stav ticketu, ktery editujeme

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

    const handleDelete = async (id: number)=> {
        await deleteTask(id);
        await loadTasks();
    }

    const handleSwitch = async (id: number) => {
        try {
            await switchTaskStatus(id);
            await loadTasks(); // v budoucnu realizovat zmenu stavu bez reloadu vsech tasku
        } catch (error){
            console.error(error);
        }
    }

    const handleEdit = async (
        id:number,
        data:CreateTask
    )=>{
        try {
            await editTask(id,data);
            await loadTasks();

            setIsModalOpen(false);
            setEditingTask(null);

        } catch(error){
            console.error(error);
        }
    }

    const handleCloseEdit = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    }
    return <main>
        <TaskForm onSave={handleSave} />
        <EditForm
            task={editingTask}
            isOpen={isModalOpen}
            onSave={handleEdit}
            onClose={handleCloseEdit}
        />
        <TasksList
            tasks={tasks}
            onEdit={(task) => {
                setEditingTask(task);
                setIsModalOpen(true);
            }}
            onDelete={handleDelete}
            onToggle={handleSwitch}
        />
    </main>
}