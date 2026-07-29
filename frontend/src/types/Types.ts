export type Task = {
    id: number;
    title: string;
    text: string;
    status: boolean;
    createdAt: string;
};

export type CreateTask = {
    title: string;
    text: string;
}

export type AlertTypeValue = "alert-success" | "alert-error";

export type AlertType = {
    message: string;
    type: AlertTypeValue;
}

export type SortField =
    | "id"
    | "title"
    | "status"
    | "createdAt";


export type SortDirection =
    | "asc"
    | "desc";