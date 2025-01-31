"use client"

import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Material } from "@/app/interfaces/material.interface";

interface MaterialSelectProps {
    materials: Material[];
    value: string;
    onChange: (value: string) => void;
  }

const MaterialSelect: React.FC<MaterialSelectProps> = ({ materials, value, onChange }) => {
  return (
    <div>
      <Select
        // Pasamos el valor seleccionado 
        value={value}
        // Cuando cambie, llamamos el callback
        onValueChange={(value) => onChange(value)}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a Material" />
        </SelectTrigger>

        <SelectContent>
          {materials.length > 0 ? (
            materials.map((mat) => (
              <SelectItem key={mat.rawmatKey} value={String(mat.rawmatKey)}>
                {mat.rawmatName}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-recipes" disabled>
              No materials
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}

export default MaterialSelect
