'use client';

import React, { useState, useEffect } from 'react';
import StepTwoForm from './StepTwoForm';
import CardDos from './CardDos';
import { Recipe } from '@/app/helpers/recipeRequest';
import { RecipeByLayer } from '@/app/helpers/recipeSortedByLayer';
import Autocomplete from './ui/Autocomplete';

// Props del componente
export interface StepTwoClientProps {
  recipes: Recipe[];
}

export default function StepTwoClient({ recipes }: StepTwoClientProps) {
  const [selectedId, setSelectedId] = useState<string>('');
  const [recipeDetails, setRecipeDetails] = useState<RecipeByLayer | null>(null);

  // Cada vez que cambia 'selectedId', hacemos el fetch a nuestra API
  useEffect(() => {
    if (!selectedId) return;

    const fetchRecipeByLayer = async () => {
      try {
        const res = await fetch(`/api/recipes?recipe=${selectedId}`);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data: RecipeByLayer = await res.json();
        setRecipeDetails(data);
      } catch (err) {
        console.error('Error fetching recipe by layer:', err);
      }
    };

    fetchRecipeByLayer();
  }, [selectedId]);

  // Callback para el <select> en StepTwoForm
  function handleSelectRecipe(id: string) {
    setSelectedId(id);
  }

  return (
    <div className="space-y-4">
      {/* Form con el <Select> para elegir la receta */}
      <div className="mb-3">
        <StepTwoForm data={recipes} onSelectRecipe={handleSelectRecipe} />
        <Autocomplete options={recipes}/>
      </div>

      {/* Renderizar una CardDos por cada layer */}
      {recipeDetails?.layers?.map((layerObj) => (
        <CardDos
          key={layerObj.layer}
          // Prop “layer” para mostrar en la cabecera
          layer={layerObj.layer}
          // Convertimos cada “recipe” en un objeto que contenga
          // .layer y .layerProportion para que CardDos lo muestre igual
          details={layerObj.recipes.map((recipe) => ({
            ...recipe,
            layer: layerObj.layer,
            layerProportion: layerObj.layerProportion,
          }))}
        />
      ))}

    </div>
  );
}
