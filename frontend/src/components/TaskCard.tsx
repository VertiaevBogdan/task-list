import type {Task} from "../types/Types.ts";
import Button from "./Button.tsx";

type Props = {
    task: Task;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (task: Task) => void;
}



export default function TaskCard({task, onDelete, onToggle, onEdit}: Props){

    const statusButtonText = task.status ? "Undo" : "Done";
    const statusButtonStyle = task.status ? "btn-error" : "btn-success";

    return (
        <li className="card bg-base-100 max-h-[10em] w-96 shadow-sm relative">
            <button
                className="btn hover:btn-error btn-square btn-sm absolute top-2 right-2"
                onClick={() => onDelete(task.id)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
            <div className="card-body">
                <h2 className="card-title">{task.title}</h2>
                <p>{task.text}</p>

                <div className="card-actions justify-between">
                    <Button
                        buttonText="Edit"
                        buttonClass="btn-warning"
                        onClick={() => {
                            onEdit(task);
                        }
                    }
                    />
                    <Button
                        buttonText={statusButtonText}
                        buttonClass={statusButtonStyle}
                        onClick={() => onToggle(task.id)}
                    />
                </div>
            </div>
        </li>
    )
}