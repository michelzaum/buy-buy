import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col items-center gap-6 px-6 md:max-w-7xl">
        <Link
          href="/"
          className="w-full flex items-center justify-self-start gap-2"
        >
          <ArrowLeft />
          <span>Voltar</span>
        </Link>
        <div className="h-96 w-full md:flex md:gap-6 md:max-w-5xl">
          <div className="relative w-full h-full">
            <Image
              alt="Product image"
              src={product.imageUrl}
              fill
              className="rounded-lg object-cover md:object-center"
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
              <div className="flex justify-center items-center flex-1 border rounded-lg">
                <button className="px-6 py-2">
                  <Minus />
                </button>
                <span className="font-semibold">{1}</span>
                <button className="px-6 py-2">
                  <Plus />
                </button>
              </div>
              <Button size={"lg"} className="flex-2">
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
