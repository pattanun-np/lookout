import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { config } from "@/lib/config";
import { Suspense } from "react";
import { TeamSwitcherLoading } from "./loading";
import { getTeamsData } from "@/components/sidebar/actions";

async function TeamSwitcherAsync() {
  const team = await getTeamsData();
  return <TeamSwitcherComp team={team} />;
}

export function TeamSwitcher() {
  return (
    <Suspense fallback={<TeamSwitcherLoading />}>
      <TeamSwitcherAsync />
    </Suspense>
  );
}

export function TeamSwitcherComp({
  team,
}: {
  team: {
    name: string;
    logo: string;
    plan: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="text-sidebar-primary-foreground flex  size-8 items-center justify-center">
            <img
              src={`https://img.logo.dev/${team.logo}?token=${config.logoDevApi}`}
              alt={team.name}
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{team.name}</span>
            <span className="truncate text-xs">{team.plan}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
