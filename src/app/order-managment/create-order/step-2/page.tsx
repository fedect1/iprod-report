// app/(tu-ruta)/page.tsx
import { getRecipesRequest, Recipe } from '@/app/helpers/recipeRequest';
import StepTwoClient from './StepTwoClient'; // <-- Nuestro Client Component

export default async function StepTwoPage() {
  // Esta parte se ejecuta en el servidor, antes de renderizar
  // Cargamos la lista de recetas solo UNA vez
  const data: Recipe[] = await getRecipesRequest();

  // Pasamos esas recetas al Client Component
  return <StepTwoClient recipes={data} />;
}
