"use client"

import { useOrderStore } from "@/store/orderStore"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ReviewForm() {
  const router = useRouter()
  const {
    line,
    order,
    article,
    amountPrd,
    throughput,
    weight,
    thickness,
    width,
    recipe,
    stepOneIsReady,
    stepTwoIsReady,
    setResetStore,
  } = useOrderStore()

  function handleClick() {
    setResetStore()
    router.push("/order-managment/create-order/step-1")
  }
  const isDisabled = !(stepOneIsReady && stepTwoIsReady)
  return (
    <div className="max-w-2xl mx-auto py-4">
      <Card>
        <CardHeader>
          <CardTitle>Order Review</CardTitle>
          <CardDescription>
            Here you can see the stored data for your order
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <strong>Line:</strong> {line}
            </div>
            <div>
              <strong>Order:</strong> {order}
            </div>
            <div>
              <strong>Article:</strong> {article}
            </div>
            <div>
              <strong>Quantity to Produce:</strong> {amountPrd}
            </div>
            <div>
              <strong>Throughput:</strong> {throughput}
            </div>
            <div>
              <strong>Weight:</strong> {weight}
            </div>
            <div>
              <strong>Thickness:</strong> {thickness}
            </div>
            <div>
              <strong>Width:</strong> {width}
            </div>
            <div>
              <strong>Recipe:</strong> {recipe}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón con onClick para limpiar y redireccionar */}
      <Button onClick={handleClick} className="mt-4 w-full md:w-auto" disabled={isDisabled}>
        Confirm Order
      </Button>
    </div>
  )
}
