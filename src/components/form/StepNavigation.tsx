"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"

// Ajusta estas rutas a tu gusto.
enum AddDealRoutes {
  ORDER_INFO = "/order-managment/create-order/step-1",
  RECIPE_DETAILS = "/order-managment/create-order/step-2",
  REVIEW_DEAL = "/order-managment/create-order/review",
}

const steps = [
  {
    title: "Params",
    route: "step-1",
    link: AddDealRoutes.ORDER_INFO,
  },
  {
    title: "Recipe",
    route: "step-2",
    link: AddDealRoutes.RECIPE_DETAILS,
  },
  {
    title: "Review",
    route: "review",
    link: AddDealRoutes.REVIEW_DEAL,
  },
]

export default function StepNavigation() {
  const pathname = usePathname()
  const currentPath = pathname.split("/").pop() // "step-1" | "step-2" | "review" etc.
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const stepIndex = steps.findIndex((step) => step.route === currentPath)
    setCurrentStep(stepIndex)
  }, [currentPath])

  return (
    <Card className="lg:w-64 border rounded-md shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">New Order</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <div className="flex flex-col gap-3">
          {steps.map((step, i) => {
            const isActive = step.route === currentPath
            return (
              <Link
                key={step.route}
                href={step.link}
                className={clsx(
                  "flex items-center gap-3 p-2 rounded-md transition-colors",
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {/* Círculo numerado */}
                <div
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold",
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-black text-black"
                  )}
                >
                  {i + 1}
                </div>

                {/* Título del paso */}
                <div
                  className={clsx(
                    "leading-none text-sm",
                    isActive ? "font-semibold" : "font-light"
                  )}
                >
                  {step.title}
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
        <CardFooter className="text-sm justify-end">
          <Button
            variant="outline"
            size="sm"
            disabled={currentStep <= 0}
            className="mt-2"
            asChild
          >
            {currentStep === 0 ? (
              '' // nada, o null
            ) : (
              <Link href={steps[currentStep - 1]?.link || steps[0].link}> &larr; Back </Link>
            )}
          </Button>
        </CardFooter>
    </Card>
  )
}
