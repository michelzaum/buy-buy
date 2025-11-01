"use client";

import React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useStore } from "@/store/store";
import { getFilteredProducts } from "@/app/_actions/get-filtered-products";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title?: string;
      key?: string;
      Component?: React.ReactNode;
    }[];
  }[];
}) {
  const { setProductFilter, productFilter, setFilteredProducts } = useStore();

  async function handleApplyFilter() {
    const filteredProducts = await getFilteredProducts({ ...productFilter });
    setFilteredProducts(filteredProducts);
  }

  function handleSelectedCategory(category: string): void {
    if (category === productFilter.category) {
      setProductFilter({ ...productFilter, category: '' });
      return;
    }

    setProductFilter({ ...productFilter, category });
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filtros</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="hover:cursor-pointer"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => {
                    if (subItem.Component) {
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          {subItem.Component}
                        </SidebarMenuSubItem>
                      );
                    } else {
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <div className="flex items-center">
                              <button
                                className={`
                                  w-1/2 flex-2 flex items-center justify-between hover:cursor-pointer p-3 border border-transparent rounded-md ${subItem.title ===productFilter.category && 'bg-gray-200'}
                                `}
                                onClick={() => handleSelectedCategory(subItem.title || '')}
                              >
                                <span>{subItem.title}</span>
                              </button>
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    }
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        <Button className="hover:cursor-pointer mt-6" onClick={handleApplyFilter}>Aplicar</Button>
      </SidebarMenu>
    </SidebarGroup>
  );
}
