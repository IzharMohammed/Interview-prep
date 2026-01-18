const BACKEND_URL = "http://localhost:4000";

export async function getProducts({ page, limit, search }: { page: string, limit: string, search: string }) {

    try {
        const params = { page, limit, search }
        const url = `${BACKEND_URL}/api/products?` + new URLSearchParams(params);
        const response = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        const result = await response.json();
        return {
            status: 200,
            success: true,
            result,
        }
    } catch (error) {
        console.error("Error fetching products");
        throw error;
    }
}