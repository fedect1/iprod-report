"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/** 
 * Datos para la sección estadística principal 
 * Puedes agregar o eliminar campos según tus necesidades
 */
const mainStats = [
  { label: "Order Target", value: 10 },
  { label: "Order Actual", value: 11 },
  { label: "Throughput kg/h Target", value: 2 },
  { label: "Throughput kg/h Actual", value: 1 },
  { label: "Width gross Target (mm)", value: 2 },
  { label: "Width gross Actual (mm)", value: 2 },
  { label: "M-weight Target (g/m)", value: 5 },
  { label: "M-weight Actual (g/m)", value: 5 },
  { label: "Haul off Speed Target (m/min)", value: 3 },
  { label: "Haul off Speed Actual (m/min)", value: 3 },
]

/** 
 * Datos para la tabla 
 */
const tableData = [
  {
    information: "Pt.Coex%",
    rawMaterialType: "-",
    targetPct: "-",
    actualPct: "-",
    consumption: "-",
  },
  {
    information: "Main component",
    rawMaterialType: "-",
    targetPct: "-",
    actualPct: "-",
    consumption: "-",
  },
  {
    information: "Dosing unit 1",
    rawMaterialType: "-",
    targetPct: "-",
    actualPct: "-",
    consumption: "-",
  },
  {
    information: "Dosing unit 2",
    rawMaterialType: "-",
    targetPct: "-",
    actualPct: "-",
    consumption: "-",
  },
  {
    information: "Dosing unit 3",
    rawMaterialType: "-",
    targetPct: "-",
    actualPct: "-",
    consumption: "-",
  },
]

const MachineCard = () => {
  return (
    <Card className="mx-auto w-full max-w-3xl rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Encabezado */}
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-semibold text-foreground">M21</CardTitle>
        <CardDescription>
          <div className="mt-3 grid grid-cols-2 gap-y-1 gap-x-1 text-sm sm:grid-cols-2 md:grid-cols-4">
            {mainStats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="font-semibold text-foreground">{stat.label}</span>
                <span>{stat.value}</span>
              </div>
            ))}
          </div>
        </CardDescription>
      </CardHeader>

      {/* Contenido: Tabla */}
      <CardContent>
        <div className="overflow-auto rounded border border-muted bg-card p-1">
          <table className="w-full table-auto border-collapse text-sm">
            <thead className="border-b">
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="px-1 py-1">Information</th>
                <th className="px-1 py-1">Raw Material Type</th>
                <th className="px-1 py-1">% Tgt.</th>
                <th className="px-1 py-1">% Actual</th>
                <th className="px-1 py-1">Consumption (kg/h)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none transition-colors hover:bg-accent/20"
                >
                  <td className="px-1 py-1">{row.information}</td>
                  <td className="px-1 py-1">{row.rawMaterialType}</td>
                  <td className="px-1 py-1">{row.targetPct}</td>
                  <td className="px-1 py-1">{row.actualPct}</td>
                  <td className="px-1 py-1">{row.consumption}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

    </Card>
  )
}

export default MachineCard
