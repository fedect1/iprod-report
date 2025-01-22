// app/api/recipes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getRecipesByLayersRequest } from '@/app/helpers/recipeSortedByLayer'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const recipeId = searchParams.get('recipe');
    if (!recipeId) {
      return NextResponse.json({ error: 'Falta parámetro recipe' }, { status: 400 });
    }

    const data = await getRecipesByLayersRequest(recipeId);

    return NextResponse.json(data); // Devolvemos la data al cliente
  } catch (err) {
    console.error('Error en /api/recipes', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
