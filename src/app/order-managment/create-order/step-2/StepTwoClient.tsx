"use client"

import React, { useState, useEffect } from "react"
import StepTwoForm from "./StepTwoForm"
import CardDos from "./CardDos"
import { Recipe } from "@/app/helpers/recipeRequest"
import { RecipeByLayer } from "@/app/helpers/recipeSortedByLayer"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"   // si usas App Router

// Importamos el store
import { useOrderStore } from "@/store/orderStore"

// Props del componente
export interface StepTwoClientProps {
  recipes: Recipe[]
}

export default function StepTwoClient({ recipes }: StepTwoClientProps) {
  const router = useRouter()

  // Estado global de la receta (Zustand)
  const { recipe, setRecipe } = useOrderStore()

  // Estado local que sincroniza con el store
  // Arrancamos con el valor existente en el store, si lo hay
  const [selectedId, setSelectedId] = useState<string>(recipe || "")

  const [recipeDetails, setRecipeDetails] = useState<RecipeByLayer | null>(null)

  // Cada vez que cambia 'selectedId', hacemos el fetch a nuestra API
  useEffect(() => {
    if (!selectedId) {
      setRecipeDetails(null)
      return
    }

    const fetchRecipeByLayer = async () => {
      try {
        const res = await fetch(`/api/recipes?recipe=${selectedId}`)
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
  }, [selectedId])

  // Callback para el <select> en StepTwoForm
  function handleSelectRecipe(id: string) {
    setSelectedId(id)   // actualiza estado local
    setRecipe(id)       // persiste en el store
  }

  // Para confirmar y navegar
  function handleConfirm() {
    router.push("/order-managment/create-order/review")
  }

  // ¿Deshabilitamos el botón?
  const disableConfirm = !selectedId || recipes.length === 0

  return (
    <div className="space-y-4">
      <div className="m-4 flex justify-between items-center">
        <StepTwoForm data={recipes} onSelectRecipe={handleSelectRecipe} selectedValue={selectedId} />
        <Button
          type="button"
          className="mt-4 w-full md:w-auto"
          disabled={disableConfirm}
          onClick={handleConfirm}
        >
          Confirm recipt and review order
        </Button>
      </div>

      {recipeDetails?.layers?.map((layerObj) => (
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
  )
}
