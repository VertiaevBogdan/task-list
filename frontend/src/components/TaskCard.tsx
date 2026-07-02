import type {Task} from "../types/Types.ts";

export default function TaskCard({task}: {task: Task}){
    return (
        <li className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{task.title}!</h2>
                <p>{task.text}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </li>
    )
}