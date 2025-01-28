// app/(tu-ruta)/page.tsx
import { getRecipesRequest, Recipe } from '@/app/helpers/recipeRequest';
import StepTwoClient from './StepTwoClient';

export const metadata = {
  title: 'Recipt selection',
};

export default async function StepTwoPage() {

  const data: Recipe[] = await getRecipesRequest();

  return <StepTwoClient recipes={data} />;
}
