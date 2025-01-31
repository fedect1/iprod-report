import { Order } from '@/app/interfaces/order.interface';
import { DataTable } from './ui/Data-table';
import { columns } from './ui/Columns';
import TitlePage from '../../../components/TitlePage';

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
      <div className='mx-10 my-5'>
        <TitlePage title='List of orders'/>
        <DataTable columns={columns} data={data}/>
      </div>
    );
  }