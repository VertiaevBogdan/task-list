import Form from "./Form.tsx";
import {useEffect, useRef, useState} from "react";
import type {CreateTask, Task} from "../types/Types.ts";

type Props = {
    task: Task | null;
    isOpen: boolean;
    onSave: (id: number, data: CreateTask) => void;
    onclose: () => void;
}

export default function EditForm({
                                     task,
                                     isOpen, onSave
}: Props) {

    const [form, setForm] = useState({
        title: "",
        text: ""
    });

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if(task){
            setForm({
                title: task.title,
                text: task.text
            });
        }
    }, [task]);

    useEffect(() => {
        if (isOpen){
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog
            ref={dialogRef}
            className="modal"
        >
                <Form
                    title="Edit task"
                    submitButtonText="Save"
                    form={form}
                    onTitleChange={(value) => {
                                setForm(prev => ({
                                    ...prev,
                                    title: value
                                }))
                            }}
                    onTextChange={(value) => {
                                setForm(prev => ({
                                    ...prev,
                                    text: value
                                }))
                            }}
                    onSubmit={
                    (e) => {
                        e.preventDefault();

                        if(!task){
                            return;
                        }

                        onSave(task.id, form);
                    }}
                />
        </dialog>
    )
}