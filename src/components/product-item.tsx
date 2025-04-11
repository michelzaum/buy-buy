import Image from "next/image";
import { Product } from "@prisma/client";
import { Card, CardContent, CardFooter } from "./ui/card";
import { formatCurrency } from "@/lib/formatCurrency";

export function ProductItem({ imageUrl, name, description, price }: Product) {
  return (
    <Card className="w-full md:max-w-2xs hover:cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <CardContent className="flex justify-center">
        <Image
          alt="Product Image"
          src={imageUrl}
          width={300}
          height={250}
          className="rounded-md h-[200px] bg-contain object-cover"
        />
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xl">{name}</span>
            <span>{description}</span>
          </div>
          <strong>{formatCurrency(price)}</strong>
        </div>
      </CardFooter>
    </Card>
  );
}
