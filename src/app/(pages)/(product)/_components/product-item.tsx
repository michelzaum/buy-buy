import Image from "next/image";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatCurrency";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          name: true;
        };
      };
    };
  }>;
  isSuggestedProduct?: boolean;
}

export function ProductItem({ product, isSuggestedProduct }: ProductItemProps) {
  const {
    imageUrl,
    name,
    price,
    description,
    category: { name: categoryName },
  } = product;
  return (
    <Link href={isSuggestedProduct ? `${product.id}` : `product-details/${product.id}`}>
      <Card className="w-full md:max-w-2xs hover:cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <CardContent className="flex flex-col justify-center gap-4">
          <span className="text-xs uppercase text-gray-500">
            {categoryName}
          </span>
          <Image
            alt="Product Image"
            src={imageUrl}
            width={500}
            height={500}
            className="w-full md:w-lvw rounded-md h-[200px] bg-contain object-cover"
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
    </Link>
  );
}
