export type Task = {
    id: number;
    title: string;
    text: string;
    status: boolean;
};

export type CreateTask = {
    title: string;
    text: string;
}

