import type {CreateTask} from "../types/Types.ts";
import Button from "./Button.tsx";

type Props = {
    title: string;
    text: string;

    submitButtonText: string;

    form: CreateTask;

    onTitleChange: (value: string) => void;
    onTextChange: (value: string) => void;

    onSubmit: (e: React.FormEvent) => void;
}

export default function Form({
    title,
    submitButtonText,
    form,
    onTitleChange,
    onTextChange,
    onSubmit
}: Props){
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

                <Button
                    buttonText={submitButtonText}
                    buttonClass="btn-success"
                    type="submit"
                />
            </fieldset>
        </form>
    )
}