import { getOrdersRequest, transformOrderListToOrders } from "@/app/helpers/ordersRequest";
import { Order, columns } from "./Columns"
import { DataTable } from './Data-table'




  export default async function OrdersForm() {
    const orderList = await getOrdersRequest();
    const data: Order[] = transformOrderListToOrders(orderList);
    return (
      <div className="container mx-auto py-10">
        <h1>Order List</h1>
        <DataTable columns={columns} data={data} />
      </div>
    )
  }

