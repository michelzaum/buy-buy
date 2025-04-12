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
          Component: <PriceFilter />,
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
