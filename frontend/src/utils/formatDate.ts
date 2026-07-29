export function formatDate(timeStamp: string): string {
    const date = new Date(timeStamp);

    return new Intl.DateTimeFormat("cz-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
}