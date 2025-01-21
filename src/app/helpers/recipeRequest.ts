// recipeRequest.ts

export interface Recipe {
    idRecipe: string;
}

export interface RecipeDetail {
    layer: string;
    material: string;
    component: number;
    layerProportion: number;
    density: number;
    materialProportion: number;
    rawmat: {
      color: number;
    };
  }

export interface RecipeDetailList{
    recipeDetailList: RecipeDetail[];
}

interface GetRecipesIdResponse {
    data: {
      getRecipesId: {
        layer: string;
        material: string;
        component: number;
        layerProportion: number;
        density: number;
        materialProportion: number;
        rawmat: {
          color: number;
        };
      }[];
    };
    errors?: any;
  }

export async function getRecipesRequest(): Promise<Recipe[]> {
    try {
        const query = `
            query {
                uniqueRecipes
            }
        `;

        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        // Verificar si la respuesta HTTP fue exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data, errors } = await response.json();

        // Manejo de errores de GraphQL
        if (errors) {
            console.error('GraphQL Errors:', errors);
            throw new Error('Error en la consulta GraphQL');
        }

        // Verificar que los datos existan y sean válidos
        if (!data || !data.uniqueRecipes) {
            throw new Error('Respuesta inválida de la API GraphQL');
        }

        // Transformar los datos recibidos en el formato esperado por la interfaz Recipe
        const recipes: Recipe[] = data.uniqueRecipes.map((repznrUni: string) => ({
            idRecipe: repznrUni,
        }));

        // Verificar si hay recetas
        if (recipes.length === 0) {
            // Retornar un arreglo con un objeto que contiene el mensaje "No hay recetas"
            return [{ idRecipe: "No hay recetas" }];
        }

        return recipes;
    } catch (e) {
        console.error('Error en getRecipesRequest:', e);
        // Retornar un arreglo con un objeto que contiene el mensaje "No hay recetas"
        return [{ idRecipe: "No hay recetas" }];
    }
}


export async function getRecipeDetails(idRecipe: string): Promise<RecipeDetailList> {
    try {
      const query = `
        query GetRecipes($idRecipe: String!) {
          getRecipesId(reciptNumber: $idRecipe) {
            layer
            material
            component
            layerProportion
            density
            materialProportion
            rawmat {
              color
            }
          }
        }
      `;
  
      const variables = { idRecipe };
  
      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Asumimos que la respuesta sigue la interfaz "GetRecipesIdResponse"
      const { data, errors } = (await response.json()) as GetRecipesIdResponse;
  
      if (errors) {
        console.error('GraphQL Errors:', errors);
        throw new Error('Error en la consulta GraphQL');
      }
  
      if (!data || !data.getRecipesId) {
        throw new Error('Respuesta inválida de la API GraphQL');
      }
  
      // Ahora TypeScript sabe que recipe es del tipo correspondiente, no "any".
      const recipeDetails: RecipeDetail[] = data.getRecipesId.map((recipe) => ({
        layer: recipe.layer,
        material: recipe.material,
        component: recipe.component,
        layerProportion: recipe.layerProportion,
        density: recipe.density,
        materialProportion: recipe.materialProportion,
        rawmat: {
          color: recipe.rawmat.color,
        },
      }));
  
      return { recipeDetailList: recipeDetails };
    } catch (error) {
      console.error('Error en getRecipeDetails:', error);
      return { recipeDetailList: [] };
    }
  }