import { ChevronLeft } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
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
    <SidebarProvider>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex gap-6">
          <AppSidebar />
          <div className="flex flex-col">
            <SidebarTrigger className="hover:cursor-pointer py-4">
              <ChevronLeft className="text-gray-400" />
            </SidebarTrigger>
            <div className="flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:gap-8">
              <ProductList products={products} />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
