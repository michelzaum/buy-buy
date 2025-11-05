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
import { PriceFilter } from "./price-filter";
import { useStore } from "@/store/store";

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
          key: "electronics",
        },
        {
          title: "Livros",
          key: "books",
        },
        {
          title: "Roupas",
          key: "clothes",
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
          Component: <PriceFilter />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useStore();

  const userInfo = {
    name: user?.name || '',
    email: user?.email || '',
    avatar: '',
  };

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
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
