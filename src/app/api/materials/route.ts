// app/api/recipes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getRecipesRequest } from './materials.request';

export async function GET(req: NextRequest) {
  try {
    const data = await getRecipesRequest();
    return NextResponse.json(data); // Devolvemos la data al cliente
  } catch (err) {
    console.error('Error en /api/recipes', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
