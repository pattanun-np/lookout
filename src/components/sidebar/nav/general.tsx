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
    name: "Report Issue",
    url: "https://github.com/10xuio/lookout/issues",
    icon: BugIcon,
  },
  {
    name: "Call Founder",
    url: "https://cal.com/chaitanyya/lookout",
    icon: HelpCircleIcon,
  },
  {
    name: "10xuio/lookout",
    url: "https://github.com/10xuio/lookout",
    icon: GithubIcon,
  },
  {
    name: "lookout_so",
    url: "https://x.com/lookout_so",
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
