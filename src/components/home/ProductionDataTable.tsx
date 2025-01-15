"use client"

import React from "react"

import { Check } from "lucide-react"

// 1. Importamos los componentes de tabla de shadcn/ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// 2. Definimos las columnas
const columns = [
  "Parameter",
  "M21",
  "M22",
  "M23",
  "M24",
  "M25",
  "M26",
  "Total",
]

// 3. Definimos las filas (datos)
const rows = [
  {
    parameter: "Throughput Act. [kg/h]",
    values: [614.8, 410.7, 411.7, 340.0, 0.0, 264.1, 2041.3],
  },
  {
    parameter: "Throughput Tgt. [kg/h]",
    values: [615.0, 410.2, 412.3, 340.0, 368.4, 265.0, 2410.9],
  },
  {
    parameter: "Prod. Standard Tgt. [kg/h]",
    values: [600.0, 380.0, 425.0, 450.0, 375.0, 250.0, 2480.0],
  },
  {
    parameter: "ID webMIP",
    values: [57542, 57304, 57007, 57523, 27435, 56947, "-"],
  },
  {
    parameter: "Production state",
    values: ["Good", "Good", "Good", "Good", "Down", "Scrap", "-"],
  },
  {
    parameter: "Finishing time End [h:min]",
    values: ["10:43", "19:45", "14:41 +1", "10:43 +1", "22:16", "14:38", "-"],
  },
  {
    parameter: "Rest runtime A End [h:min]",
    values: ["10:25", "11:16", "12:04", "11:20", "10:25", "13:47", "-"],
  },
  {
    parameter: "Rest runtime B End [h:min]",
    values: ["10:25", "11:17", "12:03", "11:20", "10:25", "13:49", "-"],
  },
  {
    parameter: "ID OL",
    values: [28222, 28112, 27968, 28211, 25354, 27945, "-"],
  },
  {
    parameter: "Tube Reel Act.",
    values: [4, 3, 2, 2, 28, 31, "-"],
  },
  {
    parameter: "Width gross Tgt. [mm]",
    values: [1817, 2100, 1780, 1325, 1050, 1208, "-"],
  },
  {
    parameter: "Width gross Act. [mm]",
    values: [1810, 2099, 1780, 1341, 0, 1205, "-"],
  },
  {
    parameter: "M-weight Tgt. [g/m]",
    values: [228.0, 271.4, 163.7, 64.0, 138.0, 71.5, "-"],
  },
  {
    parameter: "M-weight Act. [g/m]",
    values: [228.2, 270.1, 163.6, 63.9, 18.2, 71.6, "-"],
  },
  {
    parameter: "Thickn. Tgt. [µm]",
    values: [68.1, 70.1, 50.0, 25.6, 71.5, 32.1, "-"],
  },
  {
    parameter: "Thickn. Act. [µm]",
    values: [68.5, 69.8, 50.0, 25.3, 0.0, 32.2, "-"],
  },
  {
    parameter: "Profile Act. [%]",
    values: [4.8, 3.0, 3.8, 5.3, "-", 2.1, "-"],
  },
  {
    parameter: "Temp. Film MWT Act. [°C]",
    values: [76.3, 65.8, 71.0, 78.3, 78.7, 65.0, "-"],
  },
  {
    parameter: "Haul off Speed Tgt. [m/min]",
    values: [45.0, 25.2, 42.0, 88.5, 44.5, 61.8, "-"],
  },
  {
    parameter: "Haul off Speed Act. [m/min]",
    values: [44.9, 25.3, 42.0, 88.7, 0.0, 61.5, 262.4],
  },
]

// 4. Componente que renderiza la tabla
export function ProductionDataTable() {
  // Estado para saber cuál fila se acaba de copiar
  const [justCopiedRow, setJustCopiedRow] = React.useState<number | null>(null)

  // Función para copiar la fila al portapapeles
  const copyRowToClipboard = (
    row: { parameter: string; values: (string | number)[] },
    rowIndex: number
  ) => {
    // Construimos la cadena de texto:
    // Primera línea => row.parameter
    // Segunda línea => "M21: 123 M22: 456 ..."
    const columnsExceptParameter = columns.slice(1) // ["M21", "M22", ... "Total"]
    const rowString = [
      row.parameter,
      columnsExceptParameter
        .map((colName, i) => `${colName}: ${row.values[i]}`)
        .join(" "),
    ].join("\n")

    navigator.clipboard.writeText(rowString).then(() => {
      // Guardamos el índice de la fila que se acaba de copiar
      setJustCopiedRow(rowIndex)

      // Ocultamos el check luego de 1 segundo
      setTimeout(() => {
        setJustCopiedRow(null)
      }, 1000)
    })
  }

  return (
    <div className="w-full">
      <Table className="w-full table-auto">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.parameter}
              onClick={() => copyRowToClipboard(row, index)}
              className={`
                ${index % 2 === 0 ? "bg-gray-50" : ""}
                hover:bg-green-200 
                transition-colors 
                cursor-pointer
                relative
              `}
            >
              {/* Primera celda => Parameter */}
              <TableCell className="flex items-center">
                {row.parameter}

                {/* Si esta fila se acaba de copiar, mostramos el ícono con animación */}
                {justCopiedRow === index && (
                  <span className="ml-2 text-green-600 animate-bounce">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </TableCell>

              {/* Resto de celdas => valores */}
              {row.values.map((value, idx) => (
                <TableCell key={idx}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}