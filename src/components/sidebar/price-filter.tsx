'use client';

import { useRef } from 'react';

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStore } from '@/store/store';

export function PriceFilter() {
  const { setFilterByPrice } = useStore();

  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);

  function handleApplyFilter(): void {
    const minPrice = minPriceRef.current?.value;
    const maxPrice = maxPriceRef.current?.value;

    if (!minPrice && !maxPrice) {
      return;
    }

    setFilterByPrice(Number(minPrice), Number(maxPrice));
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-900" htmlFor="minPrice">
          Preço mínimo
        </label>
        <Input ref={minPriceRef} id="minPrice" placeholder="Ex: 25,00" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-900" htmlFor="maxPrice">
          Preço máximo
        </label>
        <Input ref={maxPriceRef} id="maxPrice" placeholder="Ex: 1000,00" />
      </div>
      <Button className="hover:cursor-pointer" onClick={handleApplyFilter}>Aplicar</Button>
    </div>
  );
}
