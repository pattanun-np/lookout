"use client";

import * as React from "react";
import {
  Bot,
  BugIcon,
  Frame,
  GalleryVerticalEnd,
  HelpCircleIcon,
  PieChart,
  SquareTerminal,
} from "lucide-react";

import { GithubIcon, TwitterIcon } from "@/components/ui/icons";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Chaitanya",
    email: "chaitanya@10xu.io",
    avatar: "/avatars/chaitanya.jpg",
  },
  teams: [
    {
      name: "10XU Inc.",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Brands",
          url: "#",
        },
        {
          title: "Prompts",
          url: "#",
        },
        {
          title: "Competitors",
          url: "#",
        },
        {
          title: "Mentions",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Sources",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Account",
          url: "#",
        },
      ],
    },
  ],
  projects: [
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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
