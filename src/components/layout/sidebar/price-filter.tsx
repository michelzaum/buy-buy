'use client';

import { ChangeEvent } from "react";
import { useStore } from '@/store/store';
import { Input } from "@/components/ui/input";

export function PriceFilter() {
  const { setProductFilter, productFilter } = useStore();

    function handlePriceValue(event: ChangeEvent<HTMLInputElement>, key: 'min' | 'max'): void {
    const result = event.target.value.replace(/\D/g, '');

    setProductFilter(
      {
        ...productFilter,
        price: {
          ...productFilter.price,
          [key]: Number(result),
        },
      }
    )
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-900" htmlFor="minPrice">
          Preço mínimo
        </label>
        <Input
          id="minPrice"
          placeholder="Ex: 25,00"
          value={productFilter.price.min}
          onChange={(e) => handlePriceValue(e, 'min')}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-900" htmlFor="maxPrice">
          Preço máximo
        </label>
        <Input
          id="maxPrice"
          placeholder="Ex: 1000,00"
          value={productFilter.price.max}
          onChange={(e) => handlePriceValue(e, 'max')} />
      </div>
    </div>
  );
}
