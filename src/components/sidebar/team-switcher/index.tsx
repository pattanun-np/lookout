import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { config } from "@/lib/config";
import { Suspense } from "react";
import { TeamSwitcherLoading } from "./loading";
import { getTeamsData } from "@/components/sidebar/nav/actions";
import Image from "next/image";

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
          <div className="flex aspect-square size-7 items-center justify-center rounded-lg">
            <Image
              src={`https://img.logo.dev/${team.logo}?token=${config.logoDevApi}`}
              alt={team.name}
              className="size-7 object-contain rounded-md"
              width={28}
              height={28}
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{team.name}</span>
            <span className="truncate text-xs">{team.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
