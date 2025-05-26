import { AtSign, BicepsFlexed, Bot, SquareTerminal } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const staticNavMain = [
  {
    title: "Topics",
    icon: SquareTerminal,
    url: "/dashboard/topics",
  },
  {
    title: "Prompts",
    icon: Bot,
    url: "/dashboard/prompts",
  },
  {
    title: "Competitors",
    icon: BicepsFlexed,
    url: "/dashboard/competitors",
  },
  {
    title: "Mentions",
    icon: AtSign,
    url: "/dashboard/mentions",
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {staticNavMain.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
