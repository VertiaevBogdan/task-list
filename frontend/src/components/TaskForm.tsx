import { useState } from "react";
import * as React from "react";
import type { Task } from "../pages/MainPage"

export default function TaskForm({onSave} : {
    onSave: (task: Task) => void;
}){
    const [form, setForm] = useState<Task>({
        title: "New task",
        text: "",
    });

    const handleSubmit = (e: React.FormEvent)=> {
        e.preventDefault();
        onSave(form);
    }

    return (
        <form onSubmit={handleSubmit} className="flex  justify-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Create task</legend>

                <label className="label">Title</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Input task title"
                    value={form.title}
                    onChange={(e) => {
                        setForm({...form, title: e.target.value})
                    }}
                />

                <label className="label">Text</label>
                <input
                    type="text"
                    className="textarea"
                    value={form.text}
                    onChange={(e) => {
                        setForm({...form, text: e.target.value})
                    }}
                />

                <button className="btn btn-success mt-4" type="submit">Create</button>
            </fieldset>
        </form>
    )
}