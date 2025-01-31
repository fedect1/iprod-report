// page.tsx
import { Material } from "@/app/interfaces/material.interface";
import { columns } from "./Columns"
import { DataTable } from './Data-table'
import DialogNewOrder from "./DialogNewOrder";
import TitlePage from "@/components/TitlePage";

export default async function MaterialPage() {
  const res = await fetch(`http://localhost:3000/api/materials`, {
    cache: 'no-store', // Opcional: evita el caché para datos siempre actualizados
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch materials');
  }

  const data: Material[] = await res.json();

  return (
    <div>
      <TitlePage title='Material list'/>
      <div className="flex justify-end m-5">
      <DialogNewOrder />
      </div>
      <div className="m-5">
        <DataTable columns={columns} data={data} />
      </div>

    </div>
  );
}
