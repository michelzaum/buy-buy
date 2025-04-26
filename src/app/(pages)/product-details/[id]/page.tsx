import { db } from "@/lib/db";
import { ProductDetailsComponent } from "../product-details";

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
    <ProductDetailsComponent
      suggestedProducts={suggestedProducts}
      product={product}
    />
  );
}
