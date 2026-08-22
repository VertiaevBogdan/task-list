import { test, expect } from '@playwright/test';

test.describe("CRUD task", () => {

    test.use("http://localhost:8080/api/");

    test("create task", async ({ request }) => {
        const newTask = await request.post(`tasks`, {
            data: {
                title: "New title test",
                text: "test text"
            }
        });

        expect(newTask.status()).toBe(200);
    });


});