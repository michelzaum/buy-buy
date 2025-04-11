import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Product } from "@prisma/client";

export function ProductItem({ imageUrl, name, price }: Product) {
  return (
    <Card className="max-w-sm hover:cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <CardContent className="flex justify-center">
        <Image
          alt="Product Image"
          src={imageUrl}
          width={300}
          height={250}
          className="rounded-md max-h-[400px]"
        />
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-1">
          <span>{name}</span>
          <strong>{price}</strong>
        </div>
      </CardFooter>
    </Card>
  );
}
