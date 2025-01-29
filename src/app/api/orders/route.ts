import { NextRequest, NextResponse } from 'next/server';
import { getOrderRequest } from './orders.request';

export async function GET(req: NextRequest) {
  try {
    const data = await getOrderRequest();
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No orders found' }, { status: 404 });
    }
    return NextResponse.json(data); // Asegúrate de que la data se está devolviendo correctamente
  } catch (err) {
    console.error('Error en /api/orders', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
