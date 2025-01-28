import { create } from "zustand";
import { Material, Layer } from "@/app/order-managment/recipes/recipeSchema";

interface RecipeStoreState {
  RECIPE_REZPNR_UNI: string;
  layers: Layer[];

  setRezpnrUni: (value: string) => void;
  setNumberOfLayers: (numLayers: number) => void;
  updateLayerProportion: (layerIndex: number, value: number) => void;

  addMaterialRow: (layerIndex: number) => void;
  updateMaterialField: (
    layerIndex: number,
    materialIndex: number,
    field: keyof Material,
    value: string | number
  ) => void;
  removeMaterialRow: (layerIndex: number, materialIndex: number) => void;
}

function createEmptyLayer(layerNumber: number): Layer {
  return {
    layerNumber,
    layerProportion: 0,
    materials: [
      {
        dosingStation: 1,
        materialName: "",
        density: 0,
        proportion: 0,
      },
    ],
  };
}

export const useRecipeStore = create<RecipeStoreState>((set) => ({
  // Initial state
  RECIPE_REZPNR_UNI: "",
  layers: [],

  // Update RECIPE_REZPNR_UNI
  setRezpnrUni: (value) => set(() => ({ RECIPE_REZPNR_UNI: value })),

  // Set the total number of layers (1..9), resetting the array
  setNumberOfLayers: (numLayers) =>
    set((state) => {
      // If the new numLayers is less than the current, we can slice.
      // If greater, we push new layers.
      const currentCount = state.layers.length;

      if (numLayers < currentCount) {
        // reduce
        return {
          layers: state.layers.slice(0, numLayers),
        };
      } else if (numLayers > currentCount) {
        // add
        const newLayers: Layer[] = [];
        for (let i = currentCount; i < numLayers; i++) {
          newLayers.push(createEmptyLayer(i + 1));
        }
        return {
          layers: [...state.layers, ...newLayers],
        };
      }

      return {};
    }),

  // Update proportion of a specific layer
  updateLayerProportion: (layerIndex, value) => {
    set((state) => {
      const newLayers = [...state.layers];
      newLayers[layerIndex] = {
        ...newLayers[layerIndex],
        layerProportion: value,
      };
      return { layers: newLayers };
    });
  },

  // Add a material row in the specified layer
  addMaterialRow: (layerIndex) => {
    set((state) => {
      const newLayers = [...state.layers];
      newLayers[layerIndex] = {
        ...newLayers[layerIndex],
        materials: [
          ...newLayers[layerIndex].materials,
          {
            dosingStation: 1,
            materialName: "",
            density: 0,
            proportion: 0,
          },
        ],
      };
      return { layers: newLayers };
    });
  },

  // Update a field in a material row
  updateMaterialField: (layerIndex, materialIndex, field, value) => {
    set((state) => {
      const newLayers = [...state.layers];
      const targetLayer = newLayers[layerIndex];
      const newMaterials = [...targetLayer.materials];

      newMaterials[materialIndex] = {
        ...newMaterials[materialIndex],
        [field]: value,
      };

      newLayers[layerIndex] = {
        ...targetLayer,
        materials: newMaterials,
      };
      return { layers: newLayers };
    });
  },

  // Remove a material row from a layer
  removeMaterialRow: (layerIndex, materialIndex) => {
    set((state) => {
      const newLayers = [...state.layers];
      const targetLayer = newLayers[layerIndex];
      const filtered = targetLayer.materials.filter((_, i) => i !== materialIndex);

      newLayers[layerIndex] = {
        ...targetLayer,
        materials: filtered,
      };
      return { layers: newLayers };
    });
  },
}));
