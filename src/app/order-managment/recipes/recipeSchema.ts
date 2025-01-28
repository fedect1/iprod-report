import { z } from "zod";

/**
 * Material interface & schema.
 * - dosingStation: 1..8, must be unique within its layer
 * - materialName: required
 * - density: >= 0
 * - proportion: 0..100
 */
export interface Material {
  dosingStation: number;
  materialName: string;
  density: number;
  proportion: number;
}

export const materialSchema = z.object({
  dosingStation: z.number().int().min(1).max(8),
  materialName: z.string().nonempty("Material name is required"),
  density: z.number().min(0, "Density cannot be negative"),
  proportion: z.number().min(0).max(100),
});

/**
 * Layer interface & schema.
 * - layerNumber: integer 1..9
 * - layerProportion: 0..100
 * - materials[]: at least 1
 *
 * We also refine it for:
 *  - sum of all materials' proportions <= 100
 *  - unique dosingStation in the layer
 */
export interface Layer {
  layerNumber: number;
  layerProportion: number;
  materials: Material[];
}

export const layerSchema = z
  .object({
    layerNumber: z.number().int().min(1).max(9),
    layerProportion: z.number().min(0).max(100),
    materials: z.array(materialSchema).min(1, "Each layer must have at least one material."),
  })
  .refine(
    (layer) => {
      // sum of all materials’ proportions in this layer <= 100
      const totalMaterials = layer.materials.reduce((acc, mat) => acc + mat.proportion, 0);
      return totalMaterials <= 100;
    },
    {
      message: "Sum of all material proportions in a layer cannot exceed 100.",
      path: ["materials"], // attach error to materials array
    }
  )
  .refine(
    (layer) => {
      // check unique dosingStations
      const stations = layer.materials.map((m) => m.dosingStation);
      const uniqueStations = new Set(stations);
      return stations.length === uniqueStations.size;
    },
    {
      message: "Dosing station cannot be repeated within the same layer.",
      path: ["materials"],
    }
  );


export interface Recipe {
  RECIPE_REZPNR_UNI: string;
  layers: Layer[];
}

export const recipeSchema = z
  .object({
    RECIPE_REZPNR_UNI: z.string().nonempty("RECIPE_REZPNR_UNI is required"),
    layers: z.array(layerSchema).min(1, "At least one layer is required."),
  })
  .refine(
    (data) => {
      const sumOfLayerProps = data.layers.reduce((acc, layer) => acc + layer.layerProportion, 0);
      return sumOfLayerProps <= 100;
    },
    {
      message: "Sum of all layers' proportions cannot exceed 100.",
      path: ["layers"],
    }
  );

// Optional derived TypeScript type if needed
export type RecipeSchema = z.infer<typeof recipeSchema>;
