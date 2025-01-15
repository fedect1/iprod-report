import { Order, columns } from "./Columns"
import { DataTable } from './Data-table'


async function getData(): Promise<Order[]> {
    return [
      {
        id: "728ed52f",
        idWebMIP: 202104260835,
        date: "2021-04-26T15:35:08.974Z",
        status: "pending",
        recipe: "AB586",
        orderNumber: 22251135,
        line: "M21",
        article: 55516
      },
      {
        id: "728ed52f",
        idWebMIP: 202104260835,
        date: "2021-04-26T15:35:08.974Z",
        status: "pending",
        recipe: "AB586",
        orderNumber: 22251135,
        line: "M22",
        article: 4513
      },
      {
        id: "728ed52f",
        idWebMIP: 202104260835,
        date: "2021-04-26T15:35:08.974Z",
        status: "pending",
        recipe: "AB586",
        orderNumber: 22251135,
        line: "M23",
        article: 4513
      },
    ]
  }

  export default async function OrdersForm() {
    const data = await getData()
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }

