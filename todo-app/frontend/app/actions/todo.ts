const BACKEND_URL = process.env.BACKEND_URL;
export async function createTodo(
    { title, description, priority }:
        { title: string, description: string, priority: string }) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/todo`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, priority })
            }
        )

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add todo")
        }
        const result = await response.json()
        return {
            status: 200,
            success: true,
            result
        }
    } catch (error) {
        console.error("Error adding todos:", error);
        throw error;
    }
}


export async function getTodos(
) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/todos`,
        )

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to get todo")
        }

        const result = await response.json()
        return {
            status: 200,
            success: true,
            result
        }
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
}


export async function updateTodo(
    { id, title, description, priority }:
        { id: string, title: string, description: string, priority: string }) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/todo/${id}`,
            {
                method: "PATCH",
                headers: {
                },
                body: JSON.stringify({ title, description, priority })
            }
        )

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update todo")
        }
        const result = await response.json()
        return {
            status: 200,
            success: true,
            result
        }
    } catch (error) {
        console.error("Error updating todos:", error);
        throw error;
    }
}


export async function deleteTodo(id: string
) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/todo/${id}`,
        )

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add todo")
        }
        const result = await response.json()
        return {
            status: 200,
            success: true,
            result
        }
    } catch (error) {
        console.error("Error deleting todos:", error);
        throw error;
    }
}