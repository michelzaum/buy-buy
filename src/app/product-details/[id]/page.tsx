import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/formatCurrency";

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
    <>
      <Link href="/" className="w-full">
        <div className="flex items-center gap-2 py-4 px-12">
          <ArrowLeft />
          <span>Voltar para a lista de produtos</span>
        </div>
      </Link>
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className="flex gap-8">
          <Image
            alt={product.name}
            src={product.imageUrl}
            width={900}
            height={900}
            className="rounded-lg max-h-[900px] bg-contain object-cover"
          />
          <div className="flex flex-col gap-4 py-10">
            <strong className="text-4xl">{product.name}</strong>
            <span className="font-medium">{product.description}</span>
            <div className="flex flex-col gap-10 mt-16">
              <strong className="text-3xl">
                {formatCurrency(product.price)}
              </strong>
              <div className="flex flex-col gap-4">
                <div className="flex gap-8">
                  <div className="flex items-center gap-4 border border-gray-500 rounded-lg p-4">
                    <button className="px-2 hover:cursor-pointer">
                      <Minus />
                    </button>
                    <span className="text-lg font-medium">1</span>
                    <button className="px-2 hover:cursor-pointer">
                      <Plus />
                    </button>
                  </div>
                  <button className="bg-gray-900 rounded-lg px-8 py-4 flex items-center gap-2 hover:bg-gray-800 hover:cursor-pointer transition-colors">
                    <span className="text-white text-lg font-medium">
                      Adicionar ao carrinho
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
