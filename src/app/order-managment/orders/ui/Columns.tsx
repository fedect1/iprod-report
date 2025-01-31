"use client"

import { Order } from "@/app/interfaces/order.interface"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"



export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "idwebmip",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <ArrowUpDown className="ml-0 h-4 w-4" />
                ID webMIP
              </Button>
            )
          },

    },
    {
       accessorKey: "number",
       header: "Number"
    },
    {
        accessorKey: "recipe",
        header: "Recipe",
    },
    {
        accessorKey: "system",
        header: "Line",
    },
    {
        accessorKey: "datetime",
        header: "Date",
        cell: ({ getValue }) => {
          const date = new Date(getValue() as string)
          return new Intl.DateTimeFormat('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(date)
        }
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    {
        accessorKey: "position",
        header: "Position"
    },
]
