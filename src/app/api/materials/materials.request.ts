import { Material } from "@/app/interfaces/material.interface";

export async function getRecipesRequest(): Promise<Material[]> {
    try{
        const query = `
            query GetAllMaterial {
                getAllMaterial {
                    rawmatKey
                    rawmatName
                    rawmatShort
                    rawmatTyp
                    rawmatProducer
                    rawmatDensity
                    rawmatBulkdens
                    rawmatMFinal
                    rawmatColor
                    rawmatArtn
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

        if (!data || !data.getAllMaterial) {
            throw new Error('Respuesta inválida de la API GraphQL');
        }

        const materials: Material[] = data.getAllMaterial
        
        if (materials.length === 0) {
            return [];
        }

        return materials;

    } catch(e) {
        console.error("Error en la request", e)
        return []
    }
}