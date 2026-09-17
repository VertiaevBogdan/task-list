import { useState } from "react";
import * as React from "react";
import type { CreateTask } from "../types/Types.ts";
import Form from "./Form.tsx"
type Props = {
    onSave: (task:CreateTask) => void;
}

const initialForm = {
    title: "New task",
    text: "",
}

export default function TaskForm({onSave} : Props){
    const [form, setForm] = useState <CreateTask>(initialForm);

    const handleSubmit = (e: React.FormEvent)=> {
        e.preventDefault();
        onSave(form);
        setForm(initialForm);
    }

    return (
        <Form
            title="Task title"
            submitButtonText="Create"
            form={form}

            onTitleChange={(value) =>
                setForm({ ...form, title: value })}

            onTextChange={(value) =>
                setForm({...form, text: value})}

            onSubmit={handleSubmit}
        />
    )
}