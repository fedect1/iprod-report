import TitlePage from '@/components/TitlePage';
import RecipeForm from './RecipeForm';
import { Material } from "@/app/interfaces/material.interface";

export default async function RecipesPage() {
  const res = await fetch(`http://localhost:3000/api/materials`, {
    cache: 'no-store', 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch materials');
  }
  const materialList: Material[] = await res.json();

    return (
      <div>
        <TitlePage title='Add a new recipe'/>
        <RecipeForm materialList={materialList}/>
      </div>
    );
  }