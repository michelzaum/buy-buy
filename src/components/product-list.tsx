import { ProductItem, ProductItemProps } from "./product-item";

interface ProductListProps {
  products: ProductItemProps[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8">
        <span>Nenhum produto disponível.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8">
      {products.map((product) => (
        <ProductItem
          id={product.id}
          key={product.id}
          imageUrl={product.imageUrl}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
}
