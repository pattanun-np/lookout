import { BugIcon, HelpCircleIcon } from "lucide-react";

import { GithubIcon, TwitterIcon } from "@/components/ui/icons";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const generalNavItems = [
  {
    name: "Raise an Issue",
    url: "#",
    icon: BugIcon,
  },
  {
    name: "Help",
    url: "#",
    icon: HelpCircleIcon,
  },
  {
    name: "10xuio/lookout",
    url: "#",
    icon: GithubIcon,
  },
  {
    name: "lookout_so",
    url: "#",
    icon: TwitterIcon,
  },
];

export function NavGeneral() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>General</SidebarGroupLabel>
      <SidebarMenu>
        {generalNavItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
