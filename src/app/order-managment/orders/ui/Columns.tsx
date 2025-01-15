"use client"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


export type Order = {
  id: string
  idWebMIP: number
  orderNumber: number
  recipe: string
  status: "pending" | "processing" | "success" | "failed"
  line: "M21" | "M22" | "M23"
  date: string
  article: number
}

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "idWebMIP",
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
       accessorKey: "line",
       header: ({ column }) => {
        return (
          <div className="flex items-center space-x-2">
            <span>Line:</span>
            <Select
              // El filtro se obtiene de 'column.getFilterValue()'
              value={(column.getFilterValue() as string) ?? ""}
              onValueChange={(value) => column.setFilterValue(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="All lines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All lines</SelectItem>
                <SelectItem value="M21">M21</SelectItem>
                <SelectItem value="M22">M22</SelectItem>
                <SelectItem value="M23">M23</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      },
      // 👇 Filtra por coincidencia exacta (o muestra todo si está vacío)
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || "all") return true
        return row.getValue(columnId) === filterValue
      }, 
    },
    {
        accessorKey: "article",
        header: "Article",
    },
    {
        accessorKey: "orderNumber",
        header: "Order",
    },
    {
        accessorKey: "recipe",
        header: "Recipe",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <ArrowUpDown className="ml-0 h-4 w-4" />
                Status
              </Button>
            )
          },
    },
]
