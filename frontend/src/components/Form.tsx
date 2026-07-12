import type {CreateTask} from "../types/Types.ts";
import Button from "./Button.tsx";
import * as React from "react";

type Props = {
    title: string;
    text: string;

    submitButtonText: string;

    form: CreateTask;

    onTitleChange: (value: string) => void;
    onTextChange: (value: string) => void;

    onSubmit: (e: React.FormEvent) => void;

    extraButtons?: React.ReactNode;
}

export default function Form({
    title,
    submitButtonText,
    form,
    onTitleChange,
    onTextChange,
    onSubmit,
    extraButtons
}: Props){

    const hasExtraButtons = Boolean(extraButtons);

    const submitButtonClass = hasExtraButtons
        ? "btn-success flex-1"
        : "btn-success w-full";

    const buttons = (
        <div className="flex gap-2 mt-4">
            {extraButtons}
            <Button
                buttonText={submitButtonText}
                buttonClass={submitButtonClass}
                type="submit"
            />
        </div>
    );


    return (
        <form onSubmit={onSubmit} className="flex  justify-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Create task</legend>

                <label className="label">{title}</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Input task title"
                    value={form.title}
                    onChange={(event) => onTitleChange(event.target.value)}
                />

                <label className="label">Text</label>
                <input
                    type="text"
                    className="textarea"
                    value={form.text}
                    onChange={(event) => onTextChange(event.target.value)}
                />
                {buttons}
            </fieldset>
        </form>
    )
}