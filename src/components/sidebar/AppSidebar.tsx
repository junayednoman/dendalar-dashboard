"use client";
import * as React from "react";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import SidebarTop from "./SidebarTop";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarTop />
      <SidebarContent className="mt-3">
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
}
