"use client"

import { useState } from "react"
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command"

const items = [
  "Manzanas",
  "Bananas",
  "Naranjas",
  "Pera",
  "Durazno",
]

const CommandComp = () => {
  const [query, setQuery] = useState("")

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="w-full max-w-sm mx-auto">
      <Command>
        <CommandInput
          placeholder="Busca una fruta..."
          onValueChange={(val) => setQuery(val)}
        />
        <CommandList>
          <CommandGroup>
            {filteredItems.map((item, i) => (
              <CommandItem key={i} onSelect={() => alert(`Seleccionaste ${item}`)}>
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}


export default CommandComp;