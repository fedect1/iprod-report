import { Order } from '@/app/interfaces/order.interface';
import OrdersForm from './ui/OrdersForm';

export default async function OrderManagmentPage() {
    const res = await fetch(`http://localhost:3000/api/orders`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch Orders');
    }
    const data: Order[] = await res.json();
    console.log(data)
    return (
      <div>
        <OrdersForm/>
      </div>
    );
  }