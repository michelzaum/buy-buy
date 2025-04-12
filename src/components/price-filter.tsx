import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function PriceFilter() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-900" htmlFor="minPrice">
          Preço mínimo
        </label>
        <Input id="minPrice" placeholder="Ex: 25,00" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-900" htmlFor="maxPrice">
          Preço máximo
        </label>
        <Input id="maxPrice" placeholder="Ex: 1000,00" />
      </div>
      <Button className="hover:cursor-pointer">Aplicar</Button>
    </div>
  );
}
