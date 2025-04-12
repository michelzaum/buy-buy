import Image from "next/image";
import { Plus, Minus } from "lucide-react";

export default function ProductDetails() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex gap-8">
        <Image
          alt="Product Image"
          src="https://images.unsplash.com/photo-1632794716789-42d9995fb5b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={900}
          height={900}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-4">
          <strong className="text-4xl">Smartwatch</strong>
          <span className="font-medium">
            Acompanhe seus passos e batimentos cardíacos
          </span>
          <div className="flex flex-col gap-10 mt-16">
            <strong className="text-3xl">R$ 349,00</strong>
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
  );
}
