export interface Line {
    lineOrd: number;       // Se mapea desde 'lineLine'
    lineId: number;
    lineName: string;
    lineShort: string;
    lineColour: number;
    lineType?: number;
    lineNdos?: number;
  }
  
  export async function getLinesRequest(): Promise<Line[]> {
    try {
      const query = `
        query {
          LINE {
            lineLine
            lineId
            lineName
            lineShort
            lineColour
            lineType
            lineNdos
          }
        }
      `;
  
      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
  
      const { data, errors } = await response.json();
  
      // Manejo de errores de GraphQL
      if (errors) {
        console.error('GraphQL Errors:', errors);
        throw new Error('Error en la consulta GraphQL');
      }
  
      // Verificación de que `data` sea válido y contenga la propiedad LINE
      if (!data || !data.LINE) {
        throw new Error('Respuesta inválida de la API GraphQL');
      }
  
      // Mapeamos data.LINE al tipo Line
      const lines: Line[] = data.LINE.map((line: any) => {
        return {
          lineOrd: line.lineLine,
          lineId: Number(line.lineId),
          lineName: line.lineName,
          lineShort: line.lineShort,
          lineColour: Number(line.lineColour),
          lineType: line.lineType,
          lineNdos: line.lineNdos
        };
      });
  
      return lines;
    } catch (e) {
      console.error(e);
      // Devuelve un array vacío (o maneja el error a tu manera)
      return [];
    }
  }
  