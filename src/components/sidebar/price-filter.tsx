'use client';

import { Input } from "../ui/input";
import { useStore } from '@/store/store';

export function PriceFilter() {
  const { setProductFilter, productFilter } = useStore();

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-900" htmlFor="minPrice">
          Preço mínimo
        </label>
        <Input
          id="minPrice"
          placeholder="Ex: 25,00"
          defaultValue={productFilter.price.min}
          onChange={(e) => setProductFilter(
          {
            ...productFilter,
            price: {
              min: Number(e.target.value),
              max: productFilter.price.max,
            }
          }
        )} />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-900" htmlFor="maxPrice">
          Preço máximo
        </label>
        <Input
          id="maxPrice"
          placeholder="Ex: 1000,00"
          onChange={(e) => setProductFilter(
          {
            ...productFilter,
            price: {
              min: productFilter.price.min,
              max: Number(e.target.value),
            },
          }
        )} />
      </div>
    </div>
  );
}
