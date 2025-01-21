'use client';

import React, { useState, useEffect } from 'react';
import {
  getRecipeDetails,
  Recipe,
  RecipeDetail,
  RecipeDetailList
} from '@/app/helpers/recipeRequest';
import StepTwoForm from './StepTwoForm';
import CardDos from './CardDos';

interface StepTwoClientProps {
  recipes: Recipe[];
}

export default function StepTwoClient({ recipes }: StepTwoClientProps) {
  const [selectedId, setSelectedId] = useState<string>('');
  const [selectedDetails, setSelectedDetails] = useState<RecipeDetailList>({
    recipeDetailList: [],
  });

  // Cada vez que cambie 'selectedId', hacemos la request de detalles
  useEffect(() => {
    if (!selectedId) return;
    getRecipeDetails(selectedId).then((details) => {
      // Filtramos duplicados si tienen la misma (layer + material + component)
      const uniqueDetails = [
        ...new Map(
          details.recipeDetailList.map((item) => [
            `${item.layer}-${item.material}-${item.component}`,
            item
          ])
        ).values()
      ];
  
      setSelectedDetails({ recipeDetailList: uniqueDetails });
    });
  }, [selectedId]);

  // Callback para el <Select>
  function handleSelectRecipe(id: string) {
    setSelectedId(id);
  }

  // -- Agrupamos por 'layer' --
  // 1. Creamos un diccionario: { [layer]: RecipeDetail[] }
  const groupByLayer: Record<string, RecipeDetail[]> = {};

  for (const detail of selectedDetails.recipeDetailList) {
    if (!groupByLayer[detail.layer]) {
      groupByLayer[detail.layer] = [];
    }
    groupByLayer[detail.layer].push(detail);
  }

  // 2. Convertimos ese objeto en un array de [layer, details]
  //    y para cada capa, renderizamos una CardDos
  const cardsPorLayer = Object.entries(groupByLayer).map(([layer, details]) => (
    <CardDos key={layer} layer={layer} details={details} />
  ));

  return (
    <div>
      {/* Form con el <Select> para elegir la receta */}
      <div className='mb-3'>

      <StepTwoForm data={recipes} onSelectRecipe={handleSelectRecipe} />

      </div>
      <div className="bg-gray-100 p-4 m-t">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
          {/* Renderizamos cada "layer" como una CardDos distinta */}
          {cardsPorLayer}
        </div>
      </div>

      {/* O, si quisieras debug, puedes verlo en crudo también */}
      <code>{JSON.stringify(selectedDetails, null, 2)}</code> 
    </div>
  );
}
