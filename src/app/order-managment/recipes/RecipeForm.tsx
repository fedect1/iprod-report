"use client";

import React, { useState } from "react";
import { useRecipeStore } from "@/store/recipeStore";
import { recipeSchema } from "@/app/order-managment/recipes/recipeSchema";
import { Material } from "@/app/interfaces/material.interface";


interface RecipeFormProps {
  materialList: Material[];
}

// shadcn/ui components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { XCircle } from "lucide-react";
import MaterialSelect from "./MaterialSelect";

export default function RecipeForm({ materialList }: RecipeFormProps) {
  const {
    RECIPE_REZPNR_UNI,
    layers,
    setRezpnrUni,
    setNumberOfLayers,
    updateLayerProportion,
    addMaterialRow,
    updateMaterialField,
    removeMaterialRow,
  } = useRecipeStore();

  const [selectedLayerCount, setSelectedLayerCount] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSelectLayerCount = (value: string) => {
    setSelectedLayerCount(value);
    const num = parseInt(value, 10);
    setNumberOfLayers(num);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages([]);

    // We'll gather the entire recipe object to validate
    const recipeData = {
      RECIPE_REZPNR_UNI,
      layers,
    };

    const parseResult = recipeSchema.safeParse(recipeData);
    if (!parseResult.success) {
      // gather error messages
      const messages = parseResult.error.issues.map((issue) => issue.message);
      setErrorMessages(messages);
    } else {
      // Valid data
      console.log("Valid recipe:", parseResult.data);
      // ...send to API or do further processing
    }
  };
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Recipe Configuration</CardTitle>
        <CardDescription>Please fill out the form below</CardDescription>
      </CardHeader>

      <CardContent>
        {errorMessages.length > 0 && (
          <Alert variant="destructive" className="mb-4">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Validation Errors</AlertTitle>
            {errorMessages.map((msg, idx) => (
              <AlertDescription key={idx}>{msg}</AlertDescription>
            ))}
          </Alert>
        )}

        {/* The main form */}
        <form onSubmit={handleSubmit}>
          {/* RECIPE_REZPNR_UNI */}
          <div className="mb-4">
            <Label htmlFor="rezpnr">RECIPE_REZPNR_UNI (required):</Label>
            <Input
              id="rezpnr"
              value={RECIPE_REZPNR_UNI}
              onChange={(e) => setRezpnrUni(e.target.value)}
              placeholder="e.g. RCP-12345"
              className="mt-2"
            />
          </div>

          {/* Select number of layers */}
          <div className="mb-6">
            <Label>Number of Layers:</Label>
            <Select value={selectedLayerCount} onValueChange={handleSelectLayerCount}>
              <SelectTrigger className="w-[180px] mt-2">
                <SelectValue placeholder="Select Layers" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 9 }, (_, i) => i + 1).map((val) => (
                  <SelectItem key={val} value={String(val)}>
                    {val}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Render each layer */}
          {layers.map((layer, layerIndex) => (
            <Card key={layerIndex} className="mb-6 border">
              <CardHeader>
                <CardTitle>Layer {layer.layerNumber}</CardTitle>
                <CardDescription>
                  Configure layer #{layer.layerNumber}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Layer proportion */}
                <div className="mb-4">
                  <Label htmlFor={`layerProp-${layerIndex}`}>Layer Proportion %</Label>
                  <Input
                    id={`layerProp-${layerIndex}`}
                    type="number"
                    value={layer.layerProportion}
                    onChange={(e) =>
                      updateLayerProportion(layerIndex, Number(e.target.value))
                    }
                    className="mt-1"
                    min={0}
                  />
                </div>

                {/* Materials in this layer */}
                {layer.materials.map((mat, matIndex) => (
                  <div
                    key={matIndex}
                    className="grid grid-cols-3 gap-2 items-end mb-4 p-2 border rounded"
                  >
                    {/* Dosing station (1..8) */}
                    <div className="col-span-1">
                      <Label htmlFor={`dosing-${layerIndex}-${matIndex}`}>
                        Dosing
                      </Label>
                      <Input
                        id={`dosing-${layerIndex}-${matIndex}`}
                        type="number"
                        value={matIndex}
                        onChange={(e) =>
                          updateMaterialField(
                            layerIndex,
                            matIndex,
                            "dosingStation",
                            Number(e.target.value)
                          )
                        }
                        min={0}
                      />
                    </div>

                    {/* materialName */}
                    {/* <div className="col-span-2">
                      <Label htmlFor={`material-${layerIndex}-${matIndex}`}>
                        Material Name
                      </Label>
                      <Input
                        id={`material-${layerIndex}-${matIndex}`}
                        type="text"
                        value={mat.materialName}
                        onChange={(e) =>
                          updateMaterialField(
                            layerIndex,
                            matIndex,
                            "materialName",
                            e.target.value
                          )
                        }
                      />
                    </div> */}
                    <div className="col-span-2">
                      <Label htmlFor={`material-${layerIndex}-${matIndex}`}>Material Name</Label>
                      <MaterialSelect
                        materials={materialList} 
                        value={String(mat.materialName || "")} // Asigna el valor de rawmatKey
                        onChange={(value) =>
                          updateMaterialField(layerIndex, matIndex, "materialName", Number(value)) // Actualiza rawmatKey
                        }
                      />
                    </div>

                    {/* density */}
                    <div className="col-span-1">
                      <Label htmlFor={`density-${layerIndex}-${matIndex}`}>
                        Density
                      </Label>
                      <Input
                        id={`density-${layerIndex}-${matIndex}`}
                        type="number"
                        value={mat.density}
                        onChange={(e) =>
                          updateMaterialField(
                            layerIndex,
                            matIndex,
                            "density",
                            Number(e.target.value)
                          )
                        }
                        min={0}
                        step={0.001}
                      />
                    </div>

                    {/* proportion */}
                    <div className="col-span-1">
                      <Label htmlFor={`prop-${layerIndex}-${matIndex}`}>
                        Proportion %
                      </Label>
                      <Input
                        id={`prop-${layerIndex}-${matIndex}`}
                        type="number"
                        value={mat.proportion}
                        onChange={(e) =>
                          updateMaterialField(
                            layerIndex,
                            matIndex,
                            "proportion",
                            Number(e.target.value)
                          )
                        }
                        min={0}
                      />
                    </div>

                    {/* Remove material button */}
                    <div className="col-span-1 flex justify-end">
                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() => removeMaterialRow(layerIndex, matIndex)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Add new material row */}
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => addMaterialRow(layerIndex)}
                >
                  + Add Material
                </Button>
              </CardContent>
            </Card>
          ))}

          <CardFooter>
            <Button type="submit">Save Recipe</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
