import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductList } from "@/components/product/product-list";
import { db } from "@/lib/db";

export default async function Home() {
  const products = await db.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8">
        <ProductList products={products} />
      </div>
    </div>
  );
}
