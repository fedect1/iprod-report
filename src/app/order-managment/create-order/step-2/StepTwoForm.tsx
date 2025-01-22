'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Recipe } from '@/app/helpers/recipeRequest';

interface StepTwoFormProps {
  data: Recipe[];
  onSelectRecipe: (idRecipe: string) => void;
}

const StepTwoForm: React.FC<StepTwoFormProps> = ({ data, onSelectRecipe }) => {
  return (
    <Select
      onValueChange={(value) => {
        onSelectRecipe(value);
      }}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a recipe" />
      </SelectTrigger>

      <SelectContent>
        {data.length > 0 ? (
          data.map((recipe) => (
            <SelectItem key={recipe.idRecipe} value={recipe.idRecipe}>
              {recipe.idRecipe}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-recipes" disabled>
            No hay recetas
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default StepTwoForm;
