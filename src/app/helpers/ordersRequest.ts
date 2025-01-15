// getOrdersRequest.ts
// Este helper está escrito en TypeScript y devuelve un array de `Order`.

export interface OrderList {
  idwebmip: number;
  number: string;
  position: number;
  article: string;
  recipe: string;
  system: number;
  extruder: string;
  datetime: string; // O Date, si deseas parsearlo
  status: number;
}

/**
 * Helper que obtiene la lista de órdenes paginadas desde tu API GraphQL
 * 
 * @param page - Número de página (por defecto 1)
 * @returns Promise<Order[]>
 */
export async function getOrdersRequest(page = 1): Promise<OrderList[]> {
  try {
    // 1) Definimos nuestro query GraphQL
    const query = `
      query ($page: Int!) {
        orderOffset(page: $page) {
          idwebmip
          number
          position
          article
          recipe
          system
          extruder
          datetime
          status
        }
      }
    `;

    // 2) Realizamos la petición al endpoint GraphQL
    const response = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { page },
      }),
    });

    // 3) Parseamos el JSON y extraemos la data
    const { data } = await response.json();

    // 4) Retornamos el array de órdenes
    return data.orderOffset;
  } catch (err) {
    console.error('Error al obtener órdenes:', err);
    return []; // o lanza el error si prefieres
  }
}
