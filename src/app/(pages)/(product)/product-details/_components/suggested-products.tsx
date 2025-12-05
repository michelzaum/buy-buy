import { ProductList } from "../../product-list/_components/product-list";
import { ProductProps, SuggestedProductProps } from "../../types";

export function SuggestedProducts({ product, suggestedProducts }: ProductProps & SuggestedProductProps) {
  return (
    <div className="w-full my-4">
      <span className="flex py-6 font-medium">
        Outros produtos da categoria {product.category.name}
      </span>
      <ProductList isSuggestedProduct products={suggestedProducts} />
    </div>
  )
}
