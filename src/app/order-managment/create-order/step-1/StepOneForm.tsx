"use client"
import { Line } from "@/app/helpers/linesRequest"
import { useRouter } from "next/navigation"     // O "next/router" si usas pages
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Importamos el store
import { useOrderStore } from "@/store/orderStore"


interface LineListProp {
  data: Line[]
}

// 1. Definimos el esquema de validación con zod
// 1. Definimos el esquema de validación con zod usando coerce
const formSchema = z.object({
  line: z
    .string({ required_error: "Please select a line" })
    .min(1, { message: "Please select a line" }),
  order: z
    .coerce
    .number({ required_error: "Please enter your order number" })
    .min(2, "Minimum order number is 2"),
  article: z.string({ required_error: "Please enter your article" }),
  amountPrd: z
    .coerce
    .number({ required_error: "Please enter your amount" })
    .min(1, { message: "Please enter a correct amount" }),
  throughput: z
    .coerce
    .number({ required_error: "Please enter your throughput" })
    .min(1, { message: "Please enter a correct amount" }),
  weight: z
    .coerce
    .number({ required_error: "Please enter the weight" })
    .min(1, { message: "Please enter a correct amount" }),
  thickness: z
    .coerce
    .number({ required_error: "Please enter the thickness" })
    .min(1, { message: "Please enter a correct amount" }),
  width: z
    .coerce
    .number({ required_error: "Please enter the width" })
    .min(1, { message: "Please enter a correct amount" }),
});


type FormSchema = z.infer<typeof formSchema>

export default function StepOneForm({ data }: LineListProp) {
  const router = useRouter()

  // 2. Consumimos el store:
  const {
    line,
    order,
    article,
    amountPrd,
    throughput,
    weight,
    thickness,
    width,
    // recipe, // si lo necesitas
    setLine,
    setOrder,
    setArticle,
    setAmountPrd,
    setThroughput,
    setWeight,
    setThickness,
    setWidth,
    setStepOneIsReady,
    // setRecipe, // si lo necesitas
  } = useOrderStore()

  // 3. Instanciamos el formulario con RHF + Zod,
  //    pasando como defaultValues lo que traemos del store.
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      line,
      order,
      article,
      amountPrd,
      throughput,
      weight,
      thickness,
      width,
    },
  })

  // 4. Handler para el submit: aquí actualizamos el store
  //    solo si pasa la validación.
  function onSubmit(values: FormSchema) {
    // Actualizamos el store con los datos del formulario
    setLine(values.line)
    setOrder(values.order)
    setArticle(values.article)
    setAmountPrd(values.amountPrd)
    setThroughput(values.throughput)
    setWeight(values.weight)
    setThickness(values.thickness)
    setWidth(values.width)

    form.trigger().then((isValid) => {
      if (isValid) {
        setStepOneIsReady(true)
        router.push("/order-managment/create-order/step-2")
      } else {
        setStepOneIsReady(false)
      }
    })
    // Navegamos a la siguiente página solo tras validación exitosa
    router.push("/order-managment/create-order/step-2")

    console.log("Nuevo estado:", useOrderStore.getState())
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-4 border rounded-md"
        >
          {/* Selección de línea */}
          <FormField
            control={form.control}
            name="line"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Line</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a line" />
                    </SelectTrigger>
                    <SelectContent>
                      {data && data.length > 0 ? (
                        data.map((lineItem) => {
                          const colorHex =
                            "#" + Number(lineItem.lineColour).toString(16).padStart(6, "0")

                          return (
                            <SelectItem key={lineItem.lineShort} value={lineItem.lineShort}>
                              <span
                                className="inline-block mx-2 w-3 h-3 rounded-full border-2 border-black"
                                style={{ backgroundColor: colorHex }}
                                />
                                {lineItem.lineShort}
                            </SelectItem>
                          )
                        })
                      ) : (
                        <SelectItem value="" disabled>
                          No lines available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* El resto de los campos en dos columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Order */}
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}  // Evita flechas negativas
                      placeholder="1234"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your order number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Article */}
            <FormField
              control={form.control}
              name="article"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article</FormLabel>
                  <FormControl>
                    <Input placeholder="Article name" {...field} />
                  </FormControl>
                  <FormDescription>Enter your article name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount Produced */}
            <FormField
              control={form.control}
              name="amountPrd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Produced</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}  // Evita flechas negativas
                      placeholder="100"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter the amount produced</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Throughput */}
            <FormField
              control={form.control}
              name="throughput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Throughput</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}  // Evita flechas negativas
                      placeholder="50"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter throughput</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}  // Evita flechas negativas
                      placeholder="200"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter weight</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thickness */}
            <FormField
              control={form.control}
              name="thickness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thickness</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}  // Evita flechas negativas
                      placeholder="5"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter thickness</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Width */}
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}  // Evita flechas negativas
                      placeholder="50"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter width</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Botón para submit: NO lo envolvemos en <Link> si queremos validar antes de navegar */}
          <Button type="submit" className="mt-4 w-full md:w-auto">
            Select Recipe
          </Button>
        </form>
      </Form>
    </div>
  )
}
