// StepTwoClient.tsx
"use client"

import React, { useState, useEffect } from "react"
import StepTwoForm from "./StepTwoForm"
import CardDos from "./CardDos"
import { Recipe } from "@/app/helpers/recipeRequest"
import { RecipeByLayer } from "@/app/helpers/recipeSortedByLayer"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { useOrderStore } from "@/store/orderStore"

// 1. Definimos el esquema de validación con zod
const stepTwoSchema = z.object({
  recipe: z.string().min(1, "Por favor, selecciona una receta"),
})

type StepTwoFormValues = z.infer<typeof stepTwoSchema>

export interface StepTwoClientProps {
  recipes: Recipe[]
}

export default function StepTwoClient({ recipes }: StepTwoClientProps) {
  const router = useRouter()

  const {
    recipe,
    setRecipe,
    setStepTwoIsReady,
  } = useOrderStore()

  // 2. Configuramos react-hook-form con zod
  const form = useForm<StepTwoFormValues>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      recipe: recipe || "",
    },
  })

  const { watch } = form
  const selectedRecipe = watch("recipe")

  const [recipeDetails, setRecipeDetails] = useState<RecipeByLayer | null>(null)

  // 3. Fetch de detalles de la receta seleccionada
  useEffect(() => {
    if (!selectedRecipe) {
      setRecipeDetails(null)
      return
    }

    const fetchRecipeByLayer = async () => {
      try {
        const res = await fetch(`/api/recipes?recipe=${selectedRecipe}`)
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }
        const data: RecipeByLayer = await res.json()
        setRecipeDetails(data)
      } catch (err) {
        console.error("Error fetching recipe by layer:", err)
      }
    }

    fetchRecipeByLayer()
  }, [selectedRecipe])

  // 4. Handler para el submit del formulario
  const onSubmit = (values: StepTwoFormValues) => {
    // Actualizamos el store con la receta seleccionada
    setRecipe(values.recipe)
    // Marcamos el paso dos como listo
    setStepTwoIsReady(true)
    // Navegamos a la página de revisión
    router.push("/order-managment/create-order/review")

    console.log("Nuevo estado:", useOrderStore.getState())
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-4 border rounded-md"
        >
          {/* Campo de selección de receta */}
          <FormField
            control={form.control}
            name="recipe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe</FormLabel>
                <FormControl>
                  <StepTwoForm
                    data={recipes}
                    selectedValue={field.value}
                    onSelectRecipe={(value) => {
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Detalles de la receta seleccionada */}
          {recipeDetails && (
            <div>
              {recipeDetails.layers.map((layerObj) => (
                <CardDos
                  key={layerObj.layer}
                  layer={layerObj.layer}
                  details={layerObj.recipes.map((recipe) => ({
                    ...recipe,
                    layer: layerObj.layer,
                    layerProportion: layerObj.layerProportion,
                  }))}
                />
              ))}
            </div>
          )}

          {/* Botón de confirmación */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-4 w-full md:w-auto"
            >
              Confirm recipe and Review Order
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
