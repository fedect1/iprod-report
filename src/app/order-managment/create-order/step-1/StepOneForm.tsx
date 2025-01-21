'use client'
import { Line } from "@/app/helpers/linesRequest"
import Input from "@/components/form/Input"
import SubmitButton from "@/components/form/SubmitButton"
import { Form } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { z } from "zod"


interface LineListProp {
  data: Line[]
}


const StepOneForm = ({ data }: LineListProp) => {
  // console.log(data.map((line)=>{
  //   return line.lineName
  // }))

  return (
    <form className="flex flex-1 flex-col items-center">
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a Line" />
          </SelectTrigger>
          <SelectContent>
            {data.length > 0 ? (
              data.map((line) => {
                // Convertimos el color decimal a #HEX
                const colorHex = "#" + Number(line.lineColour).toString(16).padStart(6, "0");
                
                return (
                  <SelectItem key={line.lineId} value={line.lineName}>
                    {line.lineShort}
                    {/* Círculo de color */}
                    <span
                      className="inline-block ml-2 w-3 h-3 rounded-full border-2 border-black"
                      style={{ backgroundColor: colorHex }}
                    />
                  </SelectItem>
                );
              })
            ) : (
              <SelectItem value="no-lines" disabled>
                No Lines
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      <div className="grid w-full gap-4 lg:max-w-[700px] grid-cols-1 sm:grid-cols-2">
        <Input label="Order" id="Order" type="number" required/>
        <Input label="Material" id="material" type="text" required/>
        <Input label="Amount of Production" id="prodAmount" type="number" required/>
        <Input label="Throughput" id="throughputTotal" type="number" required/>
        <Input label="Weight" id="weightTotal" type="number" required/>
        <Input label="Thickness" id="thicknessTotal" type="number" required/>
        <Input label="Width" id="width" type="number" required/>
        <div className="sm:col-span-2">
          <SubmitButton text="Next step"/>
        </div>

      </div>
    </form>
  )
}

export default StepOneForm