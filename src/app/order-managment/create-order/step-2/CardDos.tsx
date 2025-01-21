// CardDos.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RecipeDetail } from "@/app/helpers/recipeRequest";

// Definimos la interfaz que describe las props que va a recibir CardDos
interface CardDosProps {
  layer: string;               // "A", "B", "C", etc.
  details: RecipeDetail[];     // Listado de objetos con material, density, etc.
}

const CardDos: React.FC<CardDosProps> = ({ layer, details }) => {
  const layerProportion =
    details.length > 0 ? details[0].layerProportion : 0;
  return (
    <Card className="max-w-4xl shadow-lg rounded-lg bg-white">
      <CardHeader className="bg-green-900 text-white rounded-t-lg py-2">
        <CardTitle className="text-lg font-semibold text-center">
          Dos. {layer} | {layerProportion}%
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-xs">
                <th className="px-1 py-1 border">Material</th>
                <th className="px-1 py-1 border">Color</th>
                <th className="px-1 py-1 border">Component</th>
                <th className="px-1 py-1 border">Density</th>
                <th className="px-1 py-1 border">Material Proportion</th>
              </tr>
            </thead>
            <tbody>
              {details.map((item, idx) => {
                // Convertimos 'color' decimal a un string hexadecimal (ej. "#FF00AA")
                const colorHex = "#" + item.rawmat.color.toString(16).padStart(6, '0');
                
                return (
                  <tr key={idx} className="hover:bg-gray-100 text-xs">
                    <td className="px-1 py-1 border text-center">
                      {item.material}
                    </td>
                    <td className="px-1 py-1 border text-center">
                      {/* Círculo con el color proveniente de item.rawmat.color */}
                      <div
                        style={{
                          backgroundColor: colorHex,
                          width: "1rem",
                          height: "1rem",
                          borderRadius: "9999px",
                          margin: "0 auto",
                        }}
                      />
                    </td>
                    <td className="px-1 py-1 border text-center">
                      {item.component == 1 ? item.layer : `${item.layer}${item.component-1}`}
                    </td>
                    <td className="px-1 py-1 border text-center">
                      {item.density}
                    </td>
                    <td className="px-1 py-1 border text-center">
                      {item.materialProportion}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardDos;
