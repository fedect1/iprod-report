// CardDos.tsx
import React from "react";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

// Ajusta esta interfaz a la forma real que tienen tus “details”
interface RecipeDetail {
  layer: string;             // "A", "B", "C", etc.
  layerProportion: number;   // porcentaje de capa
  material: string;
  density: number;
  materialProportion: number;
  component: number;
  rawmat: { color: number | null } | null; 
}

interface CardDosProps {
  layer: string;           // nombre de la capa (A, B, C, ...)
  details: RecipeDetail[]; // array con info de materiales, densidades, etc.
}

const CardDos: React.FC<CardDosProps> = ({ layer, details }) => {
  const layerProportion = details.length > 0 ? details[0].layerProportion : 0;
  const hasAnyColor = details.some(
    (item) => item.rawmat?.color !== null
  );

  return (
    <Card className="max-w-4xl shadow-lg rounded-lg bg-white mx-auto">
      <CardHeader className="bg-black text-white rounded-t-lg py-2">
        <CardTitle className="text-lg font-semibold text-center">
          Layer {layer} | {layerProportion}%
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-gray-200 text-xs uppercase text-gray-700">
                <th className="px-2 py-2 border">Material</th>
                
                {hasAnyColor && (
                  <th className="px-2 py-2 border">Color</th>
                  )
                }
                
                <th className="px-2 py-2 border">Component</th>
                <th className="px-2 py-2 border">Density</th>
                <th className="px-2 py-2 border">Proportion</th>
              </tr>
            </thead>

            <tbody>
              {details.map((item, idx) => {
                let colorHex: string | undefined;
                if (item.rawmat?.color != null) {
                  colorHex = "#" + item.rawmat.color.toString(16).padStart(6, '0');
                }

                return (
                  <tr key={idx} className="hover:bg-gray-100 text-sm">
                    <td className="px-2 py-1 border text-center">
                      {item.material}
                    </td>
                    {
                      hasAnyColor && (
                      <td className="px-2 py-1 border text-center">
                        {/* Círculo que muestra el color */}
                        <div
                          style={{
                            backgroundColor: colorHex,
                            width: "1rem",
                            height: "1rem",
                            margin: "0 auto",
                            borderRadius: "9999px",
                            border: "1px solid #ccc"
                          }}
                        />
                      </td>
                      )
                    }
                    <td className="px-2 py-1 border text-center">
                      {/* Lógica para mostrar componente */}
                      {item.component === 1
                        ? item.layer
                        : `${item.layer}${item.component - 1}`}
                    </td>
                    <td className="px-2 py-1 border text-center">
                      {item.density}
                    </td>
                    <td className="px-2 py-1 border text-center">
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
