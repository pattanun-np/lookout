import { AtSign, BicepsFlexed, Bot, SquareTerminal } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const staticNavMain = [
  {
    title: "Brands",
    icon: SquareTerminal,
    url: "#",
  },
  {
    title: "Prompts",
    icon: Bot,
    url: "#",
  },
  {
    title: "Competitors",
    icon: BicepsFlexed,
    url: "#",
  },
  {
    title: "Mentions",
    icon: AtSign,
    url: "#",
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
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
