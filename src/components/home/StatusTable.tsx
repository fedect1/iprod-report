"use client"

import { getStatus, Status } from "@/data/status.data"
import { buildColumns, PivotedRow } from "./data-table/columns"
import { DataTable } from "./data-table/data-table";

/**
 * Definimos primero la lista de "parámetros" que formarán las filas de la tabla pivotada,
 * junto a la clave (prop) del objeto `Status`.
 * Ejemplo: "Throughput Act." corresponde a status.ThrAct
 */
const paramMap = [
  { rowName: "Throughput Act.", prop: "ThrAct" },
  { rowName: "Throughput Tgt.", prop: "ThrTgt" },
  { rowName: "Prod. Standard Tgt.", prop: "pStdTgt" },
  { rowName: "ID webMIP", prop: "idWebMIP" },
  { rowName: "Production state", prop: "prodState" },
  { rowName: "Finishing time End (s)", prop: "fTimeEnd" },
  { rowName: "Rest runtime A End (s)", prop: "rRunAEnd" },
  { rowName: "Rest runtime B End (s)", prop: "rRunBEnd" },
  { rowName: "ID OL", prop: "idOl" },
  { rowName: "Tube Reel Act.", prop: "tubeReelAct" },
  { rowName: "Width gross Tgt.", prop: "widthGrossTgt" },
  { rowName: "Width gross Act.", prop: "widthGrossAct" },
  { rowName: "M-weight Tgt.", prop: "weightTgt" },
  { rowName: "M-weight Act.", prop: "weightAct" },
  { rowName: "Thickn. Tgt.", prop: "thicknTgt" },
  { rowName: "Thickn. Act.", prop: "thicknAct" },
  { rowName: "Profile Act.", prop: "profileAct" },
  { rowName: "Temp. Film MWT Act.", prop: "tempFilmMWTAct" },
  { rowName: "Haul off Speed Tgt.", prop: "haulOffSpeedTgt" },
  { rowName: "Haul off Speed Act.", prop: "haulOffSpeedAct" },
];

/**
 * Transpone el array de Status (líneas) a un array de filas (PivotedRow).
 * - lines = ["M21","M22","M23","M24","M25","M26","Total"]
 * - Cada PivotedRow = { rowName: "Throughput Act.", M21: 614.8, M22: 410.7, ... }
 */
function pivotStatus(data: Status[]): PivotedRow[] {
  // 1) Recolectar las "líneas" disponibles, en el orden que aparezcan
  const lines = data.map((item) => item.line)

  // 2) Crear un diccionario line -> el objeto Status correspondiente
  const mapByLine: Record<string, Status> = {}
  data.forEach((item) => {
    mapByLine[item.line] = item
  })

  // 3) Para cada "parámetro" (fila), construimos un PivotedRow
  const pivoted = paramMap.map(({ rowName, prop }) => {
    // Creamos un objeto base con rowName
    const rowData: PivotedRow = { rowName }

    // A cada "line" le asignamos rowData[line] = valor
    lines.forEach((line) => {
      // Valor en la propiedad `prop` del Status de esa línea
      rowData[line] = mapByLine[line]?.[prop]
    })

    return rowData
  })

  return pivoted
}

export default function StatusTable() {
  // 1) Obtenemos la data original
  const originalData = getStatus

  // 2) Sacamos la lista de lines (ej: ["M21","M22","M23","M24","M25","M26","Total"])
  const lines = originalData.map((d) => d.line)

  // 3) Construimos las columnas dinámicamente
  const columns = buildColumns(lines)

  // 4) Transponemos la data a la estructura PivotedRow
  const pivotedData = pivotStatus(originalData)

  // 5) Renderizamos la tabla
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-bold">Status Table</h1>
      <DataTable columns={columns} data={pivotedData} />
    </section>
  )
}
