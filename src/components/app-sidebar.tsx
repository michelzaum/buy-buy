"use client";

import * as React from "react";
import { DollarSign, Tag } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Categoria",
      url: "#",
      icon: Tag,
      isActive: true,
      items: [
        {
          title: "Eletrônicos",
          url: "#",
        },
        {
          title: "Livros",
          url: "#",
        },
        {
          title: "Roupas",
          url: "#",
        },
      ],
    },
    {
      title: "Preço",
      url: "#",
      icon: DollarSign,
      isActive: true,
      items: [
        {
          title: "Preço",
          Component: (
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-900" htmlFor="minPrice">
                  Preço mínimo
                </label>
                <Input id="minPrice" placeholder="Ex: 25,00" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-900" htmlFor="maxPrice">
                  Preço máximo
                </label>
                <Input id="maxPrice" placeholder="Ex: 1000,00" />
              </div>
              <Button className="hover:cursor-pointer">Aplicar</Button>
            </div>
          ),
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex justify-center py-4">
          <span className="italic uppercase">Buy-Buy</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
