import TaskForm from "../components/TaskForm.tsx";
import EditForm from "../components/EditForm.tsx";
import {createTask, getTasks, deleteTask, switchTaskStatus, editTask} from "../api/task.ts";
import type {CreateTask, Task, AlertTypeValue, AlertType} from "../types/Types.ts";
import TasksList from "../components/TasksList.tsx";
import {useState, useEffect} from "react";
import Alert from "../components/Alert.tsx";


export default function MainPage(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null); // evidue stav ticketu, ktery editujeme
    const [alert, setAlert] = useState<AlertType | null>(null);

    const showAlert = (message: string, type: AlertTypeValue) => {
        setAlert({
            message,
            type
        });
    };

    const closeAlert = () => {
        setAlert(null);
    };

    const loadTasks = async () =>{
        try {
            const response = await getTasks();
            setTasks(response);
        } catch (error){
            console.error(error);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    async function handleSave(task: CreateTask){
        try {
            await createTask(task);
            await loadTasks();
            showAlert("Task created successfully", "alert-success");
        } catch (error){
            console.error(error);
            showAlert("An error occurred while creating the task", "alert-error");

        }
    };

    const handleDelete = async (id: number)=> {
        try {
            await deleteTask(id);
            await loadTasks();
            showAlert("Task deleted successfully", "alert-success");
        } catch (error) {
            console.error(error);
            showAlert("An error occurred while deleting the task", "alert-error");
        }
    };

    const handleSwitch = async (id: number) => {
        try {
            await switchTaskStatus(id);
            await loadTasks(); // v budoucnu realizovat zmenu stavu bez reloadu vsech tasku
            showAlert("Task's status switched successfully", "alert-success");
        } catch (error){
            console.error(error);
            showAlert("An error occurred while switching task's status", "alert-error");
        }
    };

    const handleEdit = async (
        id:number,
        data:CreateTask
    )=>{
        try {
            await editTask(id,data);
            await loadTasks();

            showAlert("Task edited successfully", "alert-success");


            setIsModalOpen(false);
            setEditingTask(null);

        } catch(error){
            console.error(error);
            showAlert("An error occurred while editing the task", "alert-error");

        }
    };

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
        {alert && <Alert
            message={alert.message}
            type={alert.type}
            onClose={closeAlert}
        />}
    </main>
}