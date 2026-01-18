"use server"
import { revalidatePath } from "next/cache";

const BACKEND_URL = "http://localhost:4000"

export async function getVote() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/votes`)

        const result = await response.json();
        if (!response.ok) {
            const errorText = await response.text()
            console.log(`Error ${response.status}: ${errorText}`);
        }
        console.log(result);

        return {
            success: true,
            status: 200,
            result,
        }
    } catch (error) {
        console.error("Error fetching votes:", error);
        throw error;
    }
}

export async function giveVote(team: string) {
    try {
        console.log(team);

        if (!["A", "B", "C"].includes(team)) {
            return {
                success: false,
                status: 400,
                error: "Invalid team name"
            }

        }
        const response = await fetch(`${BACKEND_URL}/api/vote`,
            {
                method: "POST",
                body: JSON.stringify({ team }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add item to cart");
        }

        revalidatePath("/")
        return {

        }
    } catch (error) {
        console.error("Error adding vote:", error);
        throw error;
    }
}