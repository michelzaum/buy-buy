import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/ui/button";
import { ProductList } from "@/components/product/product-list";

interface ProductDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = await params;

  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center">
        <span>Produto não encontrado.</span>
      </div>
    );
  }

  const suggestedProducts = await db.product.findMany({
    where: {
      categoryId: product.categoryId,
      AND: {
        NOT: [
          {
            id: {
              equals: product.id,
            },
          },
        ],
      },
    },
    include: {
      category: true,
    },
  });

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col items-center gap-6 px-6 md:max-w-9/12">
        <Link
          href="/"
          className="w-full flex items-center justify-self-start gap-2"
        >
          <ArrowLeft />
          <span>Voltar</span>
        </Link>
        <div className="h-full w-full lg:flex md:gap-6 md:max-w-5xl rounded-2xl">
          <div className="relative min-h-96 w-full rounded-2xl">
            <Image
              alt="Product image"
              src={product.imageUrl}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex flex-col gap-1">
              <strong className="text-2xl">{product.name}</strong>
              <span className="text-base">{product.description}</span>
            </div>
            <span className="text-xl font-semibold">
              {formatCurrency(product.price)}
            </span>
            <div className="w-full flex items-center gap-2 mt-4">
              <div className="w-full flex justify-center items-center border rounded-lg">
                <button className="flex justify-center flex-1 py-2 hover:cursor-pointer md:px-6">
                  <Minus />
                </button>
                <span className="font-semibold">{1}</span>
                <button className="flex justify-center flex-1 py-2 hover:cursor-pointer md:px-6">
                  <Plus />
                </button>
              </div>
              <Button size={"lg"}>Adicionar ao carrinho</Button>
            </div>
          </div>
        </div>
        <div className="w-full my-4">
          <span className="flex py-6 font-medium">
            Outros produtos da categoria {product.category.name}
          </span>
          <ProductList products={suggestedProducts} />
        </div>
      </div>
    </div>
  );
}
