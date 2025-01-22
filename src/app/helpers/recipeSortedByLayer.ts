
interface RecipeDetailLayer {
    recipeId: number;
    component: number;
    material: string;
    materialId?: string; 
    materialProportion: number;
    density: number;
    rohstoff: string;
    rawmat: {
      color: number;
    };
  }
  
  interface RecipeLayer {
    layer: string;
    layerProportion: number;
    repznrMat: string;
    recipes: RecipeDetailLayer[];
  }
  
  export interface RecipeByLayer {
    repznrUni: string;
    layers: RecipeLayer[];
  }
  


export async function getRecipesByLayersRequest(reciptNumber: string): Promise<RecipeByLayer>{
    try{
        const query = `
                query GetRecipeSortedByLayer($reciptNumber: String!) {
                    getRecipeSortedByLayer(reciptNumber: $reciptNumber) {
                        repznrUni
                        layers {
                        layer
                        layerProportion
                        repznrMat
                        recipes {
                            recipeId
                            component
                            material
                            density
                            materialProportion
                            rohstoff
                            rawmat {
                            color
                            }
                        }
                        }
                    }
                    }

        
        `
        
        const variables = {reciptNumber};

        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
          });

        
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const { data, errors } = await response.json();

        if (errors) {
            console.error('GraphQL Errors:', errors);
            throw new Error('Error en la consulta GraphQL');
        }

        if (!data || !data.getRecipeSortedByLayer) {
            throw new Error('Respuesta inválida de la API GraphQL');
        }

        return data.getRecipeSortedByLayer;
    } catch(e) {
        console.error('Error en getRecipesByLayersRequest:', e);
        throw e;
    }
}