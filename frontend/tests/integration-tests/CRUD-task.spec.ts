import { test, expect } from '@playwright/test';


test.describe.serial("CRUD task", () => {

    let id: number;

    test("CREATE task", async ({ request }) => {
        const response = await request.post(`tasks`, {
            data: {
                title: "New title test1",
                text: "test text"
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        id = responseBody.id;
    });

    test("READ tasks", async ({ request }) => {
       const response = await request.get(`tasks`);

       expect(response.status()).toBe(200);
    });

    test("READ task by id", async ({ request }) => {
        const response = await request.get(`tasks/${id}`);

        expect(response.status()).toBe(200);
    });

    test("UPDATE task by id", async ({ request }) => {
        const response = await request.patch(`tasks/${id}`, {
            data: {
                title: "Edited title",
                text: "Edited text"
            }
        });

        expect(response.status()).toBe(200);

    });

    test("UPDATE task status by id", async ({ request }) => {
        const response = await request.patch(`tasks/${id}/status`);

        expect(response.status()).toBe(200);
    });

    test("DELETE task by id", async ({ request }) => {
        const response = await request.delete(`tasks/${id}`);

        expect(response.status()).toBe(204);
    });

    test("Delete tasks", async ({ request }) =>{
        const response = await request.delete("tasks", {
            data: {
                taskIds: [141, 142, 144]
            }
        })

        expect(response.status()).toBe(204);
    });

});