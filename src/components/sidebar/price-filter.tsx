'use client';

import { useRef } from 'react';

import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function PriceFilter() {
  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);

  function handleApplyFilter(): void {
    console.log('Min Price:', minPriceRef.current?.value);
    console.log('Max Price:', maxPriceRef.current?.value);
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
