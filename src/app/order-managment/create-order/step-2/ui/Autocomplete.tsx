// En Autocomplete.tsx
import { Recipe } from "@/app/helpers/recipeRequest";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

// Asegúrate de tipar correctamente las props
interface AutocompleteProps {
  options: Recipe[]; // Tipo correcto para 'options'
}

const Autocomplete = ({ options }: AutocompleteProps) => {
  const [query, setQuery] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<Recipe[]>([]); // Array de recetas

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value) {
      const filtered = options.filter((option) =>
        option.idRecipe.toLowerCase().includes(value.toLowerCase()) // Suponiendo que 'name' es una propiedad de Recipe
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleSelect = (selectedOption: Recipe) => {
    setQuery(selectedOption.idRecipe); // Asumiendo que 'name' es el nombre de la receta
    setFilteredOptions([]);
  };

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="w-full p-2 border rounded"
      />
      {filteredOptions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="absolute left-0 right-0 mt-1 bg-white shadow-lg max-h-60 overflow-auto">
              <DropdownMenuContent className="w-full">
                {filteredOptions.map((option, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelect(option)}
                  >
                    {option.idRecipe} {/* Muestra el nombre de la receta */}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Autocomplete;
