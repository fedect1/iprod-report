"use client"

import { ColumnDef } from "@tanstack/react-table"

/**
 * Cada "fila" pivotada es:
 * {
 *   rowName: string;            // "Throughput Act." | "Throughput Tgt." | ...
 *   [lineKey: string]: number | string | undefined;
 * }
 *
 * Por ejemplo: { rowName: "Throughput Act.", M21: 614.8, M22: 410.7, ... }
 */


export type PivotedRow = {
  rowName: string
  productionState: "Good" | "Down" | "Scrap"
  [lineKey: string]: number | string | undefined
}

/**
 * buildColumns(lines):
 * Recibe un array de line keys (["M21","M22","M23","M24","M25","M26","Total", ...])
 * Retorna las ColumnDef que utilizará la tabla, poniendo rowName al inicio.
 */
export function buildColumns(lines: string[]): ColumnDef<PivotedRow>[] {
  // 1) Primera columna para 'rowName'
  const rowNameColumn: ColumnDef<PivotedRow> = {
    id: "rowName",
    header: "", // Sin texto en la cabecera
    cell: ({ row }) => {
      // row.original = { rowName: "...", M21: x, ... }
      return <span className="font-bold">{row.original.rowName}</span>
    },
  }

  // 2) Creamos columnas dinámicas para cada "line"
  const dynamicCols: ColumnDef<PivotedRow>[] = lines.map((line) => ({
    accessorKey: line,
    header: line,
  }))

  // 3) Devolvemos un array con rowName como la PRIMERA columna, 
  //    seguido por las columnas M21, M22, etc.
  return [rowNameColumn, ...dynamicCols]
}
