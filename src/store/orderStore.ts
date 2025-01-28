import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface OrderState {
  line: string
  order: number
  article: string
  amountPrd: number
  throughput: number
  weight: number
  thickness: number
  width: number
  recipe: string

  setLine: (line: string) => void
  setOrder: (order: number) => void
  setArticle: (article: string) => void
  setAmountPrd: (amountPrd: number) => void
  setThroughput: (throughput: number) => void
  setWeight: (weight: number) => void
  setThickness: (thickness: number) => void
  setWidth: (width: number) => void
  setRecipe: (recipe: string) => void
  setResetStore: () => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      line: "",
      order: 0,
      article: "",
      amountPrd: 0,
      throughput: 0,
      weight: 0,
      thickness: 0,
      width: 0,
      recipe: "",

      setLine: (line) => set({ line }),
      setOrder: (order) => set({ order }),
      setArticle: (article) => set({ article }),
      setAmountPrd: (amountPrd) => set({ amountPrd }),
      setThroughput: (throughput) => set({ throughput }),
      setWeight: (weight) => set({ weight }),
      setThickness: (thickness) => set({ thickness }),
      setWidth: (width) => set({ width }),
      setRecipe: (recipe) => set({ recipe }),

      setResetStore: () => set({
        line: "",
        order: 0,
        article: "",
        amountPrd: 0,
        throughput: 0,
        weight: 0,
        thickness: 0,
        width: 0,
        recipe: "",
      }),
    }),
    {
      name: "OrderRequest", // Nombre de la key en el storage (por defecto, localStorage)
      // otras opciones de configuración de persist, si las necesitas
    }
  )
)
