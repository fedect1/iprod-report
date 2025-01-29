import { Order } from "@/app/interfaces/order.interface";

export async function getOrderRequest(): Promise<Order[]> {
    try{
        const query = `
            query GetAllOrders {
                orderOffset {
                    idwebmip
                    number
                    position
                    recipe
                    system
                    datetime
                    status
                }
            }
        `;

        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data, errors } = await response.json();

        if (errors) {
            console.error('GraphQL Errors:', errors);
            throw new Error('Error en la consulta GraphQL');
        }

        if (!data || !data.orderOffset) {
            throw new Error('Respuesta inválida de la API GraphQL');
        }

        const orders: Order[] = data.orderOffset;
        
        if (orders.length === 0) {
            return [];
        }

        return orders;

    } catch(e) {
        console.error("Error en la request", e)
        return []
    }
}