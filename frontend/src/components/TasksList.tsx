import TaskCard from "./TaskCard.tsx"
import type {Task} from "../types/Types.ts";

type Props = {
    tasks: Task[];
};
export default function TasksList({tasks} : Props){
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