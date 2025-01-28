"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Material } from "@/app/interfaces/material.interface"

export const columns: ColumnDef<Material>[] = [
    {
        accessorKey: "rawmatKey",
        header: "Key"
    },
    {
        accessorKey: "rawmatName",
        header: "Name"
    },
    {
        accessorKey: "rawmatDensity",
        header: "Density"
    },
    {
        accessorKey: "rawmatTyp",
        header: "Type"
    },
    {
        accessorKey: "rawmatArtn",
        header: "Article"
    },

]